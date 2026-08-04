import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error("STRIPE_SECRET_KEY is required");
}

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2025-06-30.basil",
});

// Stripe Price IDs (set in env)
export const PRICE_IDS = {
  starter: process.env.STRIPE_PRICE_STARTER ?? "",
  growth: process.env.STRIPE_PRICE_GROWTH ?? "",
};

export const PLAN_AGENT_LIMITS: Record<string, number> = {
  trial: 1,
  starter: 3,
  growth: 10,
  scale: Infinity,
};

export function stripePlanFromPriceId(priceId: string): "starter" | "growth" | "scale" {
  if (priceId === PRICE_IDS.starter) return "starter";
  if (priceId === PRICE_IDS.growth) return "growth";
  return "scale";
}
