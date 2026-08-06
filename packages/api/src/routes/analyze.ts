import { type Router as IRouter, Router } from "express";
import { z } from "zod";
import { randomBytes } from "crypto";
import { db } from "../db/client.js";
import { analyzeResults } from "../db/schema.js";
import { captureServer } from "../services/posthog.js";
import { eq, gt } from "drizzle-orm";

export const analyzeRouter: IRouter = Router();

const storeResultSchema = z.object({
  repo: z.string().min(1).max(500),
  result: z.object({
    repo: z.string(),
    totalOpen: z.number(),
    byCategory: z.array(z.object({ key: z.string(), count: z.number(), hours: z.number() })),
    totalMatchingIssues: z.number(),
    totalHours: z.number(),
    totalCost: z.number(),
  }),
});

const captureLeadSchema = z.object({
  email: z.string().email(),
  resultId: z.string().min(1),
  repo: z.string().min(1),
  totalCost: z.number().optional(),
  skipped: z.boolean().optional(),
});

analyzeRouter.post("/results", async (req, res, next) => {
  try {
    const data = storeResultSchema.parse(req.body);
    const id = randomBytes(6).toString("hex");
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await db.insert(analyzeResults).values({
      id,
      repo: data.repo,
      resultJson: JSON.stringify(data.result),
      expiresAt,
    });

    res.status(201).json({ id });
  } catch (err) {
    next(err);
  }
});

analyzeRouter.get("/results/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const [row] = await db
      .select()
      .from(analyzeResults)
      .where(eq(analyzeResults.id, id));

    if (!row) {
      res.status(404).json({ error: "Result not found or expired." });
      return;
    }

    if (row.expiresAt < new Date()) {
      res.status(410).json({ error: "This result has expired." });
      return;
    }

    res.json({ id: row.id, repo: row.repo, result: JSON.parse(row.resultJson), createdAt: row.createdAt });
  } catch (err) {
    next(err);
  }
});

analyzeRouter.post("/leads", async (req, res, next) => {
  try {
    const data = captureLeadSchema.parse(req.body);

    if (!data.skipped) {
      await db
        .update(analyzeResults)
        .set({ email: data.email })
        .where(eq(analyzeResults.id, data.resultId));
    }

    captureServer(data.email, "analyze_lead_captured", {
      repo: data.repo,
      resultId: data.resultId,
      totalCost: data.totalCost,
      skipped: data.skipped ?? false,
      source: "analyze_tool",
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    next(err);
  }
});
