CREATE TABLE IF NOT EXISTS "demo_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"work_email" text NOT NULL,
	"company" text NOT NULL,
	"role" text NOT NULL,
	"team_size" text NOT NULL,
	"pain_point" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
