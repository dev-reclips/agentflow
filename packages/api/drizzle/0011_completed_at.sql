-- Add completed_at to issues for tracking when issues are marked done
ALTER TABLE "issues"
  ADD COLUMN IF NOT EXISTS "completed_at" timestamp;
