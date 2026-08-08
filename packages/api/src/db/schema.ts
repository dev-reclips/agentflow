import { pgTable, uuid, text, timestamp, pgEnum, integer, boolean } from "drizzle-orm/pg-core";

export const issueStatusEnum = pgEnum("issue_status", [
  "backlog",
  "todo",
  "in_progress",
  "in_review",
  "done",
  "blocked",
  "cancelled",
]);

export const issuePriorityEnum = pgEnum("issue_priority", [
  "critical",
  "high",
  "medium",
  "low",
]);

export const agentStatusEnum = pgEnum("agent_status", [
  "idle",
  "running",
  "error",
]);

export const userRoleEnum = pgEnum("user_role", ["owner", "member"]);

export const subscriptionPlanEnum = pgEnum("subscription_plan", [
  "free",
  "trial",
  "starter",
  "growth",
  "scale",
]);

export const subscriptionStatusEnum = pgEnum("subscription_status", [
  "trialing",
  "active",
  "past_due",
  "canceled",
  "incomplete",
]);

export const companies = pgTable("companies", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  companyId: uuid("company_id")
    .notNull()
    .references(() => companies.id, { onDelete: "cascade" }),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: userRoleEnum("role").notNull().default("member"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const apiKeys = pgTable("api_keys", {
  id: uuid("id").primaryKey().defaultRandom(),
  companyId: uuid("company_id")
    .notNull()
    .references(() => companies.id, { onDelete: "cascade" }),
  keyHash: text("key_hash").notNull().unique(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const issues = pgTable("issues", {
  id: uuid("id").primaryKey().defaultRandom(),
  companyId: uuid("company_id")
    .notNull()
    .references(() => companies.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  status: issueStatusEnum("status").notNull().default("backlog"),
  priority: issuePriorityEnum("priority").notNull().default("medium"),
  assigneeAgentId: uuid("assignee_agent_id").references(() => agents.id),
  parentId: uuid("parent_id"),
  githubRepo: text("github_repo"),
  githubIssueNumber: integer("github_issue_number"),
  githubPrUrl: text("github_pr_url"),
  githubPrNumber: integer("github_pr_number"),
  githubPrState: text("github_pr_state"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  completedAt: timestamp("completed_at"),
});

export const agents = pgTable("agents", {
  id: uuid("id").primaryKey().defaultRandom(),
  companyId: uuid("company_id")
    .notNull()
    .references(() => companies.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  capabilities: text("capabilities"),
  status: agentStatusEnum("status").notNull().default("idle"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const githubIntegrations = pgTable("github_integrations", {
  id: uuid("id").primaryKey().defaultRandom(),
  companyId: uuid("company_id")
    .notNull()
    .references(() => companies.id, { onDelete: "cascade" })
    .unique(),
  installationId: integer("installation_id").notNull(),
  webhookSecret: text("webhook_secret").notNull(),
  repos: text("repos").array().notNull().default([]),
  defaultAgentId: uuid("default_agent_id").references(() => agents.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const subscriptions = pgTable("subscriptions", {
  id: uuid("id").primaryKey().defaultRandom(),
  companyId: uuid("company_id")
    .notNull()
    .references(() => companies.id, { onDelete: "cascade" })
    .unique(),
  stripeCustomerId: text("stripe_customer_id").unique(),
  stripeSubscriptionId: text("stripe_subscription_id").unique(),
  plan: subscriptionPlanEnum("plan").notNull().default("trial"),
  status: subscriptionStatusEnum("status").notNull().default("trialing"),
  currentPeriodEnd: timestamp("current_period_end"),
  cancelAtPeriodEnd: boolean("cancel_at_period_end").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const stripeEvents = pgTable("stripe_events", {
  id: text("id").primaryKey(),
  type: text("type").notNull(),
  processedAt: timestamp("processed_at").notNull().defaultNow(),
});

export const issueComments = pgTable("issue_comments", {
  id: uuid("id").primaryKey().defaultRandom(),
  issueId: uuid("issue_id")
    .notNull()
    .references(() => issues.id, { onDelete: "cascade" }),
  authorAgentId: uuid("author_agent_id").references(() => agents.id),
  body: text("body").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const emailTypeEnum = pgEnum("email_type", [
  "welcome",
  "mid_trial",
  "trial_ending",
]);

export const emailLogs = pgTable("email_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  companyId: uuid("company_id")
    .notNull()
    .references(() => companies.id, { onDelete: "cascade" }),
  emailType: emailTypeEnum("email_type").notNull(),
  sentAt: timestamp("sent_at").notNull().defaultNow(),
});

export const demoRequests = pgTable("demo_requests", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  workEmail: text("work_email").notNull(),
  company: text("company").notNull(),
  role: text("role").notNull(),
  teamSize: text("team_size").notNull(),
  painPoint: text("pain_point"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const analyzeResults = pgTable("analyze_results", {
  id: text("id").primaryKey(),
  repo: text("repo").notNull(),
  resultJson: text("result_json").notNull(),
  email: text("email"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  expiresAt: timestamp("expires_at").notNull(),
});
