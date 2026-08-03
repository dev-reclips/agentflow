-- Multi-tenancy migration: add companies, users, api_keys tables
-- and scope existing tables to company_id.

DO $$ BEGIN
  CREATE TYPE "user_role" AS ENUM ('owner', 'member');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Companies table
CREATE TABLE IF NOT EXISTS "companies" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "name" text NOT NULL,
  "slug" text NOT NULL UNIQUE,
  "created_at" timestamp NOT NULL DEFAULT now()
);

-- Seed a default company for existing data
INSERT INTO "companies" ("id", "name", "slug")
VALUES ('00000000-0000-0000-0000-000000000001', 'Default', 'default')
ON CONFLICT ("id") DO NOTHING;

-- Users table
CREATE TABLE IF NOT EXISTS "users" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "company_id" uuid NOT NULL REFERENCES "companies"("id") ON DELETE CASCADE,
  "email" text NOT NULL,
  "role" "user_role" NOT NULL DEFAULT 'member',
  "created_at" timestamp NOT NULL DEFAULT now()
);

-- API keys table
CREATE TABLE IF NOT EXISTS "api_keys" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "company_id" uuid NOT NULL REFERENCES "companies"("id") ON DELETE CASCADE,
  "key_hash" text NOT NULL UNIQUE,
  "name" text NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT now()
);

-- Add company_id to agents (backfill with default company)
ALTER TABLE "agents"
  ADD COLUMN IF NOT EXISTS "company_id" uuid
    REFERENCES "companies"("id") ON DELETE CASCADE;

UPDATE "agents" SET "company_id" = '00000000-0000-0000-0000-000000000001'
  WHERE "company_id" IS NULL;

ALTER TABLE "agents" ALTER COLUMN "company_id" SET NOT NULL;

-- Add company_id to issues (backfill with default company)
ALTER TABLE "issues"
  ADD COLUMN IF NOT EXISTS "company_id" uuid
    REFERENCES "companies"("id") ON DELETE CASCADE;

UPDATE "issues" SET "company_id" = '00000000-0000-0000-0000-000000000001'
  WHERE "company_id" IS NULL;

ALTER TABLE "issues" ALTER COLUMN "company_id" SET NOT NULL;
