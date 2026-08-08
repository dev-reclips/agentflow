import { type Router as IRouter, Router, type Request, type Response, type NextFunction } from "express";
import { eq } from "drizzle-orm";
import { db } from "../db/client.js";
import { subscriptions, stripeEvents, companies, users } from "../db/schema.js";
import { getStripe, PRICE_IDS, stripePlanFromPriceId } from "../services/stripe.js";
import { AppError } from "../middleware/error.js";
import { captureServer } from "../services/posthog.js";
import { sendTrialEndingSoonEmail } from "../services/email.js";

export const billingRouter: IRouter = Router();

// GET /api/v1/billing — get current subscription
billingRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sub = await db.query.subscriptions.findFirst({
      where: eq(subscriptions.companyId, req.companyId),
    });
    res.json(sub ?? null);
  } catch (err) {
    next(err);
  }
});

// POST /api/v1/billing/checkout — create Stripe Checkout session
billingRouter.post("/checkout", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { plan } = req.body as { plan: "starter" | "growth" };
    const priceId = PRICE_IDS[plan];
    if (!priceId) throw new AppError(400, "Invalid plan");

    const [company] = await db
      .select({ name: companies.name, slug: companies.slug })
      .from(companies)
      .where(eq(companies.id, req.companyId));
    if (!company) throw new AppError(404, "Company not found");

    // Get or create Stripe customer
    let sub = await db.query.subscriptions.findFirst({
      where: eq(subscriptions.companyId, req.companyId),
    });

    let customerId: string;
    if (sub?.stripeCustomerId) {
      customerId = sub.stripeCustomerId;
    } else {
      const customer = await getStripe().customers.create({
        name: company.name,
        metadata: { companyId: req.companyId, companySlug: company.slug },
      });
      customerId = customer.id;
      if (sub) {
        // Free-tier user upgrading — attach Stripe customer to existing subscription
        await db
          .update(subscriptions)
          .set({ stripeCustomerId: customerId, updatedAt: new Date() })
          .where(eq(subscriptions.companyId, req.companyId));
      } else {
        await db.insert(subscriptions).values({
          companyId: req.companyId,
          stripeCustomerId: customerId,
          plan: "trial",
          status: "trialing",
        });
      }
    }

    const webUrl = process.env.WEB_URL ?? "http://localhost:3001";
    const session = await getStripe().checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      subscription_data: {
        trial_period_days: 14,
        metadata: { companyId: req.companyId },
      },
      success_url: `${webUrl}/dashboard/settings/billing?success=1`,
      cancel_url: `${webUrl}/dashboard/settings/billing?canceled=1`,
    });

    res.json({ url: session.url });
  } catch (err) {
    next(err);
  }
});

// POST /api/v1/billing/portal — create Stripe Customer Portal session
billingRouter.post("/portal", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sub = await db.query.subscriptions.findFirst({
      where: eq(subscriptions.companyId, req.companyId),
    });
    if (!sub?.stripeCustomerId) throw new AppError(400, "No paid subscription to manage. Upgrade first.");

    const webUrl = process.env.WEB_URL ?? "http://localhost:3001";
    const session = await getStripe().billingPortal.sessions.create({
      customer: sub.stripeCustomerId,
      return_url: `${webUrl}/dashboard/settings/billing`,
    });

    res.json({ url: session.url });
  } catch (err) {
    next(err);
  }
});

// POST /api/v1/billing/webhook — Stripe webhook handler (no auth middleware)
export const webhookRouter: IRouter = Router();

webhookRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const sig = req.headers["stripe-signature"];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      res.sendStatus(500);
      return;
    }

    let event: import("stripe").Stripe.Event;
    try {
      event = getStripe().webhooks.constructEvent(req.body as Buffer, sig as string, webhookSecret);
    } catch {
      res.status(400).send("Webhook signature verification failed");
      return;
    }

    // Idempotency check
    const existing = await db.query.stripeEvents.findFirst({
      where: eq(stripeEvents.id, event.id),
    });
    if (existing) {
      res.json({ received: true, duplicate: true });
      return;
    }

    try {
      await handleStripeEvent(event);
      await db.insert(stripeEvents).values({ id: event.id, type: event.type });
      res.json({ received: true });
    } catch (err) {
      next(err);
    }
  }
);

async function handleStripeEvent(event: import("stripe").Stripe.Event) {
  switch (event.type) {
    case "customer.subscription.created":
    case "customer.subscription.updated": {
      const stripeSub = event.data.object as import("stripe").Stripe.Subscription;
      const companyId = stripeSub.metadata?.companyId;
      if (!companyId) return;

      const priceId = stripeSub.items.data[0]?.price.id ?? "";
      const plan = stripePlanFromPriceId(priceId);
      const status = stripeStatusToLocal(stripeSub.status);
      const currentPeriodEnd = new Date((stripeSub as any).current_period_end * 1000);

      // Check previous status before updating to detect trial → active upgrade
      const existing = await db.query.subscriptions.findFirst({
        where: eq(subscriptions.companyId, companyId),
      });

      await db
        .insert(subscriptions)
        .values({
          companyId,
          stripeCustomerId: stripeSub.customer as string,
          stripeSubscriptionId: stripeSub.id,
          plan,
          status,
          currentPeriodEnd,
          cancelAtPeriodEnd: stripeSub.cancel_at_period_end,
        })
        .onConflictDoUpdate({
          target: subscriptions.companyId,
          set: {
            stripeSubscriptionId: stripeSub.id,
            plan,
            status,
            currentPeriodEnd,
            cancelAtPeriodEnd: stripeSub.cancel_at_period_end,
            updatedAt: new Date(),
          },
        });

      if (status === "active" && existing?.status !== "active") {
        captureServer(companyId, "plan_upgraded", {
          company_id: companyId,
          plan,
          previous_status: existing?.status ?? null,
        });
      }
      break;
    }
    case "customer.subscription.deleted": {
      const stripeSub = event.data.object as import("stripe").Stripe.Subscription;
      const companyId = stripeSub.metadata?.companyId;
      if (!companyId) return;

      const existing = await db.query.subscriptions.findFirst({
        where: eq(subscriptions.companyId, companyId),
      });

      await db
        .update(subscriptions)
        .set({ status: "canceled", updatedAt: new Date() })
        .where(eq(subscriptions.companyId, companyId));

      if (existing?.status === "trialing") {
        captureServer(companyId, "trial_expired", {
          company_id: companyId,
          plan: existing.plan,
        });
      }
      break;
    }
    case "invoice.payment_failed": {
      const invoice = event.data.object as import("stripe").Stripe.Invoice;
      const subId = (invoice as any).subscription as string | null;
      if (!subId) return;

      await db
        .update(subscriptions)
        .set({ status: "past_due", updatedAt: new Date() })
        .where(eq(subscriptions.stripeSubscriptionId, subId));
      break;
    }
    case "customer.subscription.trial_will_end": {
      const stripeSub = event.data.object as import("stripe").Stripe.Subscription;
      const companyId = stripeSub.metadata?.companyId;
      if (!companyId) return;

      const trialEndTs = (stripeSub as any).trial_end as number | null;
      const trialEndDate = trialEndTs ? new Date(trialEndTs * 1000) : new Date();

      const owner = await db.query.users.findFirst({
        where: eq(users.companyId, companyId),
      });
      if (!owner) return;

      const company = await db.query.companies.findFirst({
        where: eq(companies.id, companyId),
      });

      await sendTrialEndingSoonEmail(
        companyId,
        owner.email,
        company?.name ?? companyId,
        trialEndDate,
      );
      break;
    }
  }
}

function stripeStatusToLocal(
  status: import("stripe").Stripe.Subscription.Status
): "trialing" | "active" | "past_due" | "canceled" | "incomplete" {
  switch (status) {
    case "trialing": return "trialing";
    case "active": return "active";
    case "past_due": return "past_due";
    case "canceled": return "canceled";
    default: return "incomplete";
  }
}
