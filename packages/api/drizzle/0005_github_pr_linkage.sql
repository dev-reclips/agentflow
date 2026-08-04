-- Link GitHub PRs to AgentFlow issues

ALTER TABLE "issues"
  ADD COLUMN IF NOT EXISTS "github_pr_url" text,
  ADD COLUMN IF NOT EXISTS "github_pr_number" integer,
  ADD COLUMN IF NOT EXISTS "github_pr_state" text;
