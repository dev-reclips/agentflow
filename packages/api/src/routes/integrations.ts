import { type Router as IRouter, Router } from "express";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "../db/client.js";
import { githubIntegrations } from "../db/schema.js";
import { AppError } from "../middleware/error.js";

export const integrationsRouter: IRouter = Router();

const upsertGithubSchema = z.object({
  githubToken: z.string().min(1),
  webhookSecret: z.string().min(1),
  repos: z.array(z.string()).default([]),
  defaultAgentId: z.string().uuid().nullable().optional(),
});

integrationsRouter.get("/github", async (req, res, next) => {
  try {
    const row = await db.query.githubIntegrations.findFirst({
      where: eq(githubIntegrations.companyId, req.companyId),
    });
    if (!row) { res.json(null); return; }
    // Never return the token — only confirm it's set
    const { githubToken: _t, ...safe } = row;
    res.json({ ...safe, hasToken: true });
  } catch (err) {
    next(err);
  }
});

integrationsRouter.put("/github", async (req, res, next) => {
  try {
    const body = upsertGithubSchema.parse(req.body);
    const existing = await db.query.githubIntegrations.findFirst({
      where: eq(githubIntegrations.companyId, req.companyId),
    });

    if (existing) {
      const [row] = await db
        .update(githubIntegrations)
        .set({
          githubToken: body.githubToken,
          webhookSecret: body.webhookSecret,
          repos: body.repos,
          defaultAgentId: body.defaultAgentId ?? null,
          updatedAt: new Date(),
        })
        .where(eq(githubIntegrations.companyId, req.companyId))
        .returning();
      const { githubToken: _t, ...safe } = row!;
      res.json({ ...safe, hasToken: true });
    } else {
      const [row] = await db
        .insert(githubIntegrations)
        .values({
          companyId: req.companyId,
          githubToken: body.githubToken,
          webhookSecret: body.webhookSecret,
          repos: body.repos,
          defaultAgentId: body.defaultAgentId ?? null,
        })
        .returning();
      const { githubToken: _t, ...safe } = row!;
      res.status(201).json({ ...safe, hasToken: true });
    }
  } catch (err) {
    next(err);
  }
});

integrationsRouter.delete("/github", async (req, res, next) => {
  try {
    await db
      .delete(githubIntegrations)
      .where(eq(githubIntegrations.companyId, req.companyId));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});
