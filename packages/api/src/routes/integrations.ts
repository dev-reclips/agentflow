import { type Router as IRouter, Router } from "express";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "../db/client.js";
import { githubIntegrations } from "../db/schema.js";

export const integrationsRouter: IRouter = Router();

const upsertGithubSchema = z.object({
  installationId: z.number().int().positive(),
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
    res.json(row);
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
          installationId: body.installationId,
          webhookSecret: body.webhookSecret,
          repos: body.repos,
          defaultAgentId: body.defaultAgentId ?? null,
          updatedAt: new Date(),
        })
        .where(eq(githubIntegrations.companyId, req.companyId))
        .returning();
      res.json(row);
    } else {
      const [row] = await db
        .insert(githubIntegrations)
        .values({
          companyId: req.companyId,
          installationId: body.installationId,
          webhookSecret: body.webhookSecret,
          repos: body.repos,
          defaultAgentId: body.defaultAgentId ?? null,
        })
        .returning();
      res.status(201).json(row);
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
