-- ANI-16: Replace stored PAT with GitHub App installation_id
-- Private key lives in GITHUB_APP_PRIVATE_KEY env var; tokens are fetched at runtime.

ALTER TABLE "github_integrations"
  ADD COLUMN IF NOT EXISTS "installation_id" integer;

-- Assign a sentinel 0 so NOT NULL can be applied to any stale rows.
UPDATE "github_integrations" SET "installation_id" = 0 WHERE "installation_id" IS NULL;

ALTER TABLE "github_integrations"
  ALTER COLUMN "installation_id" SET NOT NULL,
  DROP COLUMN IF EXISTS "github_token";
