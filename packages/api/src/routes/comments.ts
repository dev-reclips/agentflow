import { Router } from "express";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "../db/client.js";
import { issueComments } from "../db/schema.js";

export const commentsRouter = Router({ mergeParams: true });

commentsRouter.get("/", async (req, res, next) => {
  try {
    const rows = await db.query.issueComments.findMany({
      where: eq(issueComments.issueId, req.params["issueId"]!),
      orderBy: (t, { asc }) => [asc(t.createdAt)],
    });
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

commentsRouter.post("/", async (req, res, next) => {
  try {
    const body = z
      .object({
        body: z.string().min(1),
        authorAgentId: z.string().uuid().optional(),
      })
      .parse(req.body);

    const [comment] = await db
      .insert(issueComments)
      .values({ issueId: req.params["issueId"]!, ...body })
      .returning();
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
});
