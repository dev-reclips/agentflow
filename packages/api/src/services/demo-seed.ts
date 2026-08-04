import { randomBytes, scryptSync } from "crypto";
import { eq } from "drizzle-orm";
import { db } from "../db/client.js";
import {
  companies,
  users,
  agents,
  issues,
  issueComments,
  githubIntegrations,
} from "../db/schema.js";

const DEMO_SLUG = "demo";
const DEMO_EMAIL = "demo@agentflow.ai";
const DEMO_REPO = "https://github.com/octocat/Hello-World";

function hashPassword(raw: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(raw, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export async function seedDemo(password: string): Promise<void> {
  // 1. Company
  const [company] = await db
    .insert(companies)
    .values({ name: "Acme Engineering", slug: DEMO_SLUG })
    .returning();
  if (!company) throw new Error("Failed to insert demo company");

  // 2. Admin user
  const [user] = await db
    .insert(users)
    .values({
      companyId: company.id,
      email: DEMO_EMAIL,
      passwordHash: hashPassword(password),
      role: "owner",
    })
    .returning();
  if (!user) throw new Error("Failed to create demo user");

  // 3. Agent
  const [agent] = await db
    .insert(agents)
    .values({
      companyId: company.id,
      name: "DevBot",
      capabilities:
        "Full-stack engineer: TypeScript, React, Node.js, PostgreSQL. Writes code, opens PRs, and resolves issues end-to-end.",
      status: "running",
    })
    .returning();
  if (!agent) throw new Error("Failed to create demo agent");

  // 4. GitHub integration (mock)
  await db.insert(githubIntegrations).values({
    companyId: company.id,
    installationId: 999999,
    webhookSecret: randomBytes(20).toString("hex"),
    repos: [DEMO_REPO],
    defaultAgentId: agent.id,
  });

  // 5. Issues
  const now = new Date();

  const issueRows = await db
    .insert(issues)
    .values([
      {
        companyId: company.id,
        title: "Fix pagination bug in user list",
        description:
          "The user list endpoint returns all records when `page=0` is passed instead of defaulting to page 1. This causes performance issues on large datasets.\n\n**Steps to reproduce:**\n1. `GET /api/v1/users?page=0`\n2. Response includes all users\n\n**Expected:** should return page 1 (first 20 records).",
        status: "todo",
        priority: "high",
        assigneeAgentId: null,
        githubRepo: DEMO_REPO,
        githubIssueNumber: 42,
      },
      {
        companyId: company.id,
        title: "Add rate limiting to API endpoints",
        description:
          "We have no rate limiting in place. A single client can hammer the API and cause outages.\n\n**Requirements:**\n- 100 req/min per IP for public endpoints\n- 1000 req/min per authenticated user\n- Return `429 Too Many Requests` with `Retry-After` header.",
        status: "todo",
        priority: "high",
        assigneeAgentId: null,
        githubRepo: DEMO_REPO,
        githubIssueNumber: 43,
      },
      {
        companyId: company.id,
        title: "Migrate authentication to JWT refresh tokens",
        description:
          "Current JWTs are long-lived (7 days). We need short-lived access tokens (15 min) + refresh tokens (30 days) to improve security.\n\n**Scope:**\n- New `POST /auth/refresh` endpoint\n- Update middleware to verify short-lived tokens\n- Client-side token refresh logic",
        status: "in_progress",
        priority: "critical",
        assigneeAgentId: agent.id,
        githubRepo: DEMO_REPO,
        githubIssueNumber: 44,
      },
      {
        companyId: company.id,
        title: "Add CSV export for analytics dashboard",
        description:
          "Product wants users to be able to export their data as CSV from the analytics page.",
        status: "done",
        priority: "medium",
        assigneeAgentId: agent.id,
        githubRepo: DEMO_REPO,
        githubIssueNumber: 38,
        githubPrUrl: "https://github.com/octocat/Hello-World/pull/101",
        githubPrNumber: 101,
        githubPrState: "merged",
        completedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        companyId: company.id,
        title: "Optimize slow database queries on the issues list",
        description:
          "The issues list endpoint takes >2s on companies with >500 issues. Added missing index on `(company_id, status, created_at)` and rewrote the join.",
        status: "done",
        priority: "high",
        assigneeAgentId: agent.id,
        githubRepo: DEMO_REPO,
        githubIssueNumber: 39,
        githubPrUrl: "https://github.com/octocat/Hello-World/pull/102",
        githubPrNumber: 102,
        githubPrState: "merged",
        completedAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
      },
    ])
    .returning();

  // 6. Agent comments on in_progress and done issues
  const commentValues: Array<{
    issueId: string;
    authorAgentId: string;
    body: string;
  }> = [];

  for (const issue of issueRows) {
    if (issue.status === "in_progress") {
      commentValues.push({
        issueId: issue.id,
        authorAgentId: agent.id,
        body: "🔍 **DevBot:** Checked out the issue. Starting by auditing the current `signToken` / `verifyToken` flow in `src/middleware/session.ts`. I'll stub out the refresh-token table migration next, then wire up the new `/auth/refresh` endpoint. ETA: PR up within the hour.",
      });
    } else if (issue.status === "done" && issue.githubPrUrl) {
      commentValues.push({
        issueId: issue.id,
        authorAgentId: agent.id,
        body: `✅ **DevBot:** Done! PR merged → ${issue.githubPrUrl}\n\nAll tests passing. Deployed to staging.`,
      });
    }
  }

  if (commentValues.length > 0) {
    await db.insert(issueComments).values(commentValues);
  }
}

export async function resetDemo(password: string): Promise<void> {
  const existing = await db.query.companies.findFirst({
    where: eq(companies.slug, DEMO_SLUG),
  });
  if (existing) {
    // Cascade: deleting company removes all related rows
    await db.delete(companies).where(eq(companies.id, existing.id));
  }
  await seedDemo(password);
}
