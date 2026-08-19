-- Initial schema: base tables that pre-existed before the tracked migration chain.
-- These tables are assumed present by 0001_multi_tenancy.sql and later migrations.

DO $$ BEGIN
  CREATE TYPE "issue_status" AS ENUM ('backlog', 'todo', 'in_progress', 'in_review', 'done', 'blocked', 'cancelled');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "issue_priority" AS ENUM ('critical', 'high', 'medium', 'low');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "agent_status" AS ENUM ('idle', 'running', 'error');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS "agents" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "name" text NOT NULL,
  "capabilities" text,
  "status" "agent_status" NOT NULL DEFAULT 'idle',
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "issues" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "title" text NOT NULL,
  "description" text,
  "status" "issue_status" NOT NULL DEFAULT 'backlog',
  "priority" "issue_priority" NOT NULL DEFAULT 'medium',
  "assignee_agent_id" uuid REFERENCES "agents"("id"),
  "parent_id" uuid,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "issue_comments" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "issue_id" uuid NOT NULL REFERENCES "issues"("id") ON DELETE CASCADE,
  "author_agent_id" uuid REFERENCES "agents"("id"),
  "body" text NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT now()
);
