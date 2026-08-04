import { type Router as IRouter, Router, type Request, type Response, type NextFunction } from "express";
import { eq, and, lte, gte } from "drizzle-orm";
import { db } from "../db/client.js";
import { subscriptions, users, companies } from "../db/schema.js";
import { sendMidTrialEmail } from "../services/email.js";

export const emailJobsRouter: IRouter = Router();

// POST /internal/email-jobs/mid-trial
// Sends day-7 mid-trial emails. Protected by INTERNAL_SECRET env var.
// Intended to be called by an external cron (e.g. GitHub Actions, Render cron).
emailJobsRouter.post(
  "/mid-trial",
  (req: Request, res: Response, next: NextFunction) => {
    const secret = process.env.INTERNAL_SECRET;
    if (secret && req.headers["x-internal-secret"] !== secret) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    next();
  },
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const now = new Date();
      // Target subscriptions created between 7d and 8d ago (1-hour window to avoid re-runs)
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const eightDaysAgo = new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000);

      const trialSubs = await db.query.subscriptions.findMany({
        where: and(
          eq(subscriptions.status, "trialing"),
          lte(subscriptions.createdAt, sevenDaysAgo),
          gte(subscriptions.createdAt, eightDaysAgo),
        ),
      });

      let sent = 0;
      let skipped = 0;

      for (const sub of trialSubs) {
        const owner = await db.query.users.findFirst({
          where: eq(users.companyId, sub.companyId),
        });
        if (!owner) { skipped++; continue; }

        const company = await db.query.companies.findFirst({
          where: eq(companies.id, sub.companyId),
        });

        const trialEndDate = sub.currentPeriodEnd ?? new Date(sub.createdAt.getTime() + 14 * 24 * 60 * 60 * 1000);

        await sendMidTrialEmail(sub.companyId, owner.email, company?.name ?? sub.companyId, trialEndDate);
        sent++;
      }

      res.json({ ok: true, evaluated: trialSubs.length, sent, skipped });
    } catch (err) {
      next(err);
    }
  }
);
