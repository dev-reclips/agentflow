import { type Router as IRouter, Router } from "express";
import { z } from "zod";
import { and, eq } from "drizzle-orm";
import { db } from "../db/client.js";
import { githubIntegrations, issues } from "../db/schema.js";
import { AppError } from "../middleware/error.js";
import { postIssueComment } from "../services/github.js";

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
          integration.githubToken,
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
