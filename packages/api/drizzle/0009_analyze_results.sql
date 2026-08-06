CREATE TABLE IF NOT EXISTS "analyze_results" (
	"id" text PRIMARY KEY NOT NULL,
	"repo" text NOT NULL,
	"result_json" text NOT NULL,
	"email" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"expires_at" timestamp NOT NULL
);
