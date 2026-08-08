import Stripe from "stripe";

let _stripe: Stripe | null = null;

// Lazy init — don't throw at module load so the API starts without Stripe creds.
// Each caller that needs Stripe gets it via getStripe() which throws only if missing.
export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("STRIPE_SECRET_KEY is not configured");
    _stripe = new Stripe(key, { apiVersion: "2026-07-29.dahlia" });
  }
  return _stripe;
}

// Stripe Price IDs (set in env)
export const PRICE_IDS = {
  starter: process.env.STRIPE_PRICE_STARTER ?? "",
  growth: process.env.STRIPE_PRICE_GROWTH ?? "",
};

export const PLAN_AGENT_LIMITS: Record<string, number> = {
  free: 1,
  trial: 1,
  starter: 3,
  growth: 10,
  scale: Infinity,
};

// Monthly issue creation limits (Infinity = unlimited)
export const PLAN_ISSUE_LIMITS: Record<string, number> = {
  free: 5,
  trial: Infinity,
  starter: Infinity,
  growth: Infinity,
  scale: Infinity,
};

export function stripePlanFromPriceId(priceId: string): "starter" | "growth" | "scale" {
  if (priceId === PRICE_IDS.starter) return "starter";
  if (priceId === PRICE_IDS.growth) return "growth";
  return "scale";
}
