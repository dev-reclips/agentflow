import { type Router as IRouter, Router } from "express";
import { z } from "zod";
import { and, eq } from "drizzle-orm";
import { db } from "../db/client.js";
import { issues, issueComments } from "../db/schema.js";
import { AppError } from "../middleware/error.js";

export const commentsRouter: IRouter = Router({ mergeParams: true });

type CommentParams = { issueId: string };

async function assertIssueOwnership(issueId: string, companyId: string): Promise<void> {
  const issue = await db.query.issues.findFirst({
    where: and(eq(issues.id, issueId), eq(issues.companyId, companyId)),
  });
  if (!issue) throw new AppError(404, "Issue not found");
}

commentsRouter.get<CommentParams>("/", async (req, res, next) => {
  try {
    const issueId = req.params.issueId;
    await assertIssueOwnership(issueId, req.companyId);
    const rows = await db.query.issueComments.findMany({
      where: eq(issueComments.issueId, issueId),
      orderBy: (t, { asc }) => [asc(t.createdAt)],
    });
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

commentsRouter.post<CommentParams>("/", async (req, res, next) => {
  try {
    const issueId = req.params.issueId;
    await assertIssueOwnership(issueId, req.companyId);
    const body = z
      .object({
        body: z.string().min(1),
        authorAgentId: z.string().uuid().optional(),
      })
      .parse(req.body);

    const [comment] = await db
      .insert(issueComments)
      .values({ issueId, body: body.body, authorAgentId: body.authorAgentId ?? null })
      .returning();
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
});
