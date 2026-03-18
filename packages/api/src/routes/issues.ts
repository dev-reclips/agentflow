import { Router } from "express";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "../db/client.js";
import { issues } from "../db/schema.js";
import { AppError } from "../middleware/error.js";

export const issuesRouter = Router();

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

issuesRouter.get("/", async (_req, res, next) => {
  try {
    const rows = await db.query.issues.findMany({
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
      .values({ ...body })
      .returning();
    res.status(201).json(issue);
  } catch (err) {
    next(err);
  }
});

issuesRouter.get("/:id", async (req, res, next) => {
  try {
    const issue = await db.query.issues.findFirst({
      where: eq(issues.id, req.params.id!),
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
    const updates: Partial<typeof body & { updatedAt: Date; completedAt: Date | null }> = {
      ...body,
      updatedAt: new Date(),
    };
    if (body.status === "done") updates.completedAt = new Date();
    const [issue] = await db
      .update(issues)
      .set(updates)
      .where(eq(issues.id, req.params.id!))
      .returning();
    if (!issue) throw new AppError(404, "Issue not found");
    res.json(issue);
  } catch (err) {
    next(err);
  }
});
