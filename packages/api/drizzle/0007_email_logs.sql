-- ANI-20: Transactional email tracking — prevents duplicate sends
DO $$ BEGIN
  CREATE TYPE "email_type" AS ENUM ('welcome', 'mid_trial', 'trial_ending');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS "email_logs" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "company_id" uuid NOT NULL REFERENCES "companies"("id") ON DELETE CASCADE,
  "email_type" "email_type" NOT NULL,
  "sent_at" timestamp DEFAULT now() NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS "email_logs_company_type_unique"
  ON "email_logs"("company_id", "email_type");
