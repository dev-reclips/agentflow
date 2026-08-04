-- GitHub integration: add github_integrations table and github columns on issues

CREATE TABLE IF NOT EXISTS "github_integrations" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "company_id" uuid NOT NULL UNIQUE REFERENCES "companies"("id") ON DELETE CASCADE,
  "github_token" text NOT NULL,
  "webhook_secret" text NOT NULL,
  "repos" text[] NOT NULL DEFAULT '{}',
  "default_agent_id" uuid REFERENCES "agents"("id"),
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT now()
);

ALTER TABLE "issues"
  ADD COLUMN IF NOT EXISTS "github_repo" text,
  ADD COLUMN IF NOT EXISTS "github_issue_number" integer,
  ADD COLUMN IF NOT EXISTS "github_pr_url" text,
  ADD COLUMN IF NOT EXISTS "github_pr_number" integer,
  ADD COLUMN IF NOT EXISTS "github_pr_state" text;
