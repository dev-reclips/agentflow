CREATE TYPE "subscription_plan" AS ENUM ('trial', 'starter', 'growth', 'scale');
CREATE TYPE "subscription_status" AS ENUM ('trialing', 'active', 'past_due', 'canceled', 'incomplete');

CREATE TABLE IF NOT EXISTS "subscriptions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "company_id" uuid NOT NULL UNIQUE REFERENCES "companies"("id") ON DELETE CASCADE,
  "stripe_customer_id" text NOT NULL UNIQUE,
  "stripe_subscription_id" text UNIQUE,
  "plan" "subscription_plan" NOT NULL DEFAULT 'trial',
  "status" "subscription_status" NOT NULL DEFAULT 'trialing',
  "current_period_end" timestamp,
  "cancel_at_period_end" boolean NOT NULL DEFAULT false,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "stripe_events" (
  "id" text PRIMARY KEY NOT NULL,
  "type" text NOT NULL,
  "processed_at" timestamp NOT NULL DEFAULT now()
);
