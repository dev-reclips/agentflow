import { type Router as IRouter, Router } from "express";
import { z } from "zod";
import { and, eq, gte, count } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { db } from "../db/client.js";
import { githubIntegrations, issues, subscriptions } from "../db/schema.js";
import { AppError } from "../middleware/error.js";
import { PLAN_ISSUE_LIMITS } from "../services/stripe.js";
import { postIssueComment, createPullRequest, getPullRequest } from "../services/github.js";

export const issuesRouter: IRouter = Router();

const createIssueSchema = z.object({
  title: z.string().min(1).max(500),
  description: z.string().optional(),
  priority: z.enum(["critical", "high", "medium", "low"]).default("medium"),
  parentId: z.string().uuid().optional(),
});

const updateIssueSchema = z.object({
  title: z.string().min(1).max(500).optional(),
  description: z.string().optional(),
  status: z
    .enum(["backlog", "todo", "in_progress", "in_review", "done", "blocked", "cancelled"])
    .optional(),
  priority: z.enum(["critical", "high", "medium", "low"]).optional(),
  assigneeAgentId: z.string().uuid().nullable().optional(),
});

issuesRouter.get("/", async (req, res, next) => {
  try {
    const rows = await db.query.issues.findMany({
      where: eq(issues.companyId, req.companyId),
      orderBy: (t, { desc }) => [desc(t.createdAt)],
      limit: 100,
    });
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

issuesRouter.post("/", async (req, res, next) => {
  try {
    const body = createIssueSchema.parse(req.body);

    // Enforce monthly issue limit for free plan
    const sub = await db.query.subscriptions.findFirst({
      where: eq(subscriptions.companyId, req.companyId),
    });
    const plan = sub?.plan ?? "free";
    const issueLimit = PLAN_ISSUE_LIMITS[plan] ?? Infinity;
    if (isFinite(issueLimit)) {
      const monthStart = sql`date_trunc('month', now())`;
      const [countRow] = await db
        .select({ value: count() })
        .from(issues)
        .where(and(eq(issues.companyId, req.companyId), gte(issues.createdAt, monthStart)));
      const monthCount = countRow?.value ?? 0;
      if (monthCount >= issueLimit) {
        throw new AppError(
          403,
          `Free plan limit reached: ${issueLimit} issues/month. Upgrade to Starter ($299/mo) for unlimited issues.`
        );
      }
    }

    const [issue] = await db
      .insert(issues)
      .values({
        companyId: req.companyId,
        title: body.title,
        description: body.description ?? null,
        priority: body.priority,
        parentId: body.parentId ?? null,
      })
      .returning();
    res.status(201).json(issue);
  } catch (err) {
    next(err);
  }
});

issuesRouter.get("/:id", async (req, res, next) => {
  try {
    const issue = await db.query.issues.findFirst({
      where: and(eq(issues.id, req.params.id!), eq(issues.companyId, req.companyId)),
    });
    if (!issue) throw new AppError(404, "Issue not found");
    res.json(issue);
  } catch (err) {
    next(err);
  }
});

issuesRouter.patch("/:id", async (req, res, next) => {
  try {
    const body = updateIssueSchema.parse(req.body);
    const updates: {
      title?: string;
      description?: string | null;
      status?: "backlog" | "todo" | "in_progress" | "in_review" | "done" | "blocked" | "cancelled";
      priority?: "critical" | "high" | "medium" | "low";
      assigneeAgentId?: string | null;
      updatedAt: Date;
      completedAt?: Date | null;
    } = { updatedAt: new Date() };

    if (body.title !== undefined) updates.title = body.title;
    if (body.description !== undefined) updates.description = body.description;
    if (body.status !== undefined) updates.status = body.status;
    if (body.priority !== undefined) updates.priority = body.priority;
    if (body.assigneeAgentId !== undefined) updates.assigneeAgentId = body.assigneeAgentId;
    if (body.status === "done") updates.completedAt = new Date();

    const [issue] = await db
      .update(issues)
      .set(updates)
      .where(and(eq(issues.id, req.params.id!), eq(issues.companyId, req.companyId)))
      .returning();
    if (!issue) throw new AppError(404, "Issue not found");

    // Post completion comment back to GitHub if this issue originated from a GitHub webhook
    if (body.status === "done" && issue.githubRepo && issue.githubIssueNumber) {
      const integration = await db.query.githubIntegrations.findFirst({
        where: eq(githubIntegrations.companyId, issue.companyId),
      });
      if (integration) {
        const summary = issue.description ? `\n\n> ${issue.description.slice(0, 500)}` : "";
        postIssueComment(
          integration.installationId,
          issue.githubRepo,
          issue.githubIssueNumber,
          `✅ **AgentFlow completed this issue.**${summary}`,
        ).catch((e) => console.error("[github] failed to post completion comment:", e));
      }
    }

    res.json(issue);
  } catch (err) {
    next(err);
  }
});

const openPrSchema = z.object({
  owner: z.string().min(1),
  repo: z.string().min(1),
  title: z.string().min(1),
  head: z.string().min(1),
  base: z.string().min(1),
  body: z.string().optional(),
});

// POST /issues/:id/pr — agent calls this to open a GitHub PR and link it to the issue
issuesRouter.post("/:id/pr", async (req, res, next) => {
  try {
    const issue = await db.query.issues.findFirst({
      where: and(eq(issues.id, req.params.id!), eq(issues.companyId, req.companyId)),
    });
    if (!issue) throw new AppError(404, "Issue not found");

    const integration = await db.query.githubIntegrations.findFirst({
      where: eq(githubIntegrations.companyId, req.companyId),
    });
    if (!integration) throw new AppError(400, "GitHub integration not configured");

    const prInput = openPrSchema.parse(req.body);
    const pr = await createPullRequest(integration.installationId, {
      owner: prInput.owner,
      repo: prInput.repo,
      title: prInput.title,
      head: prInput.head,
      base: prInput.base,
      ...(prInput.body != null ? { body: prInput.body } : {}),
    });

    const [updated] = await db
      .update(issues)
      .set({
        githubPrUrl: pr.html_url,
        githubPrNumber: pr.number,
        githubPrState: pr.state,
        updatedAt: new Date(),
      })
      .where(eq(issues.id, issue.id))
      .returning();

    res.status(201).json({ pr, issue: updated });
  } catch (err) {
    next(err);
  }
});

// GET /issues/:id/pr — fetch latest PR state from GitHub and refresh on the issue
issuesRouter.get("/:id/pr", async (req, res, next) => {
  try {
    const issue = await db.query.issues.findFirst({
      where: and(eq(issues.id, req.params.id!), eq(issues.companyId, req.companyId)),
    });
    if (!issue) throw new AppError(404, "Issue not found");
    if (!issue.githubPrNumber || !issue.githubPrUrl) {
      res.json(null);
      return;
    }

    const integration = await db.query.githubIntegrations.findFirst({
      where: eq(githubIntegrations.companyId, req.companyId),
    });
    if (!integration) { res.json({ prUrl: issue.githubPrUrl, prState: issue.githubPrState }); return; }

    const match = issue.githubPrUrl.match(/github\.com\/([^/]+)\/([^/]+)\/pull\/(\d+)/);
    if (!match) { res.json({ prUrl: issue.githubPrUrl, prState: issue.githubPrState }); return; }
    const [, owner, repo] = match;

    const pr = await getPullRequest(integration.installationId, owner!, repo!, issue.githubPrNumber);

    if (pr.state !== issue.githubPrState) {
      await db.update(issues).set({ githubPrState: pr.state, updatedAt: new Date() }).where(eq(issues.id, issue.id));
    }

    res.json({ prUrl: issue.githubPrUrl, prNumber: issue.githubPrNumber, prState: pr.state, prTitle: pr.title });
  } catch (err) {
    next(err);
  }
});
