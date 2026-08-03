-- Auth migration: add password_hash to users, add unique constraint on email

ALTER TABLE "users"
  ADD COLUMN IF NOT EXISTS "password_hash" text;

-- Backfill existing rows with a placeholder (they can't log in anyway)
UPDATE "users" SET "password_hash" = '' WHERE "password_hash" IS NULL;

ALTER TABLE "users" ALTER COLUMN "password_hash" SET NOT NULL;

-- Unique email across all users
ALTER TABLE "users" DROP CONSTRAINT IF EXISTS "users_email_unique";
DO $$ BEGIN
  ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE ("email");
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
