import { Router } from "express";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "../db/client.js";
import { agents } from "../db/schema.js";
import { AppError } from "../middleware/error.js";

export const agentsRouter = Router();

const createAgentSchema = z.object({
  name: z.string().min(1).max(200),
  capabilities: z.string().optional(),
});

agentsRouter.get("/", async (_req, res, next) => {
  try {
    const rows = await db.query.agents.findMany({
      orderBy: (t, { desc }) => [desc(t.createdAt)],
    });
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

agentsRouter.post("/", async (req, res, next) => {
  try {
    const body = createAgentSchema.parse(req.body);
    const [agent] = await db.insert(agents).values(body).returning();
    res.status(201).json(agent);
  } catch (err) {
    next(err);
  }
});

agentsRouter.get("/:id", async (req, res, next) => {
  try {
    const agent = await db.query.agents.findFirst({
      where: eq(agents.id, req.params.id!),
    });
    if (!agent) throw new AppError(404, "Agent not found");
    res.json(agent);
  } catch (err) {
    next(err);
  }
});

agentsRouter.patch("/:id/status", async (req, res, next) => {
  try {
    const { status } = z
      .object({ status: z.enum(["idle", "running", "error"]) })
      .parse(req.body);
    const [agent] = await db
      .update(agents)
      .set({ status, updatedAt: new Date() })
      .where(eq(agents.id, req.params.id!))
      .returning();
    if (!agent) throw new AppError(404, "Agent not found");
    res.json(agent);
  } catch (err) {
    next(err);
  }
});
