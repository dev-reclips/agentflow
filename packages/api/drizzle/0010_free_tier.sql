-- Add 'free' to subscription_plan enum
ALTER TYPE "subscription_plan" ADD VALUE IF NOT EXISTS 'free' BEFORE 'trial';

-- Make stripe_customer_id nullable so free-tier users don't need a Stripe customer
ALTER TABLE "subscriptions" ALTER COLUMN "stripe_customer_id" DROP NOT NULL;
