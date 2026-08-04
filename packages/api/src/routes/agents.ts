import { type Router as IRouter, Router } from "express";
import { z } from "zod";
import { and, eq, count } from "drizzle-orm";
import { db } from "../db/client.js";
import { agents, subscriptions } from "../db/schema.js";
import { AppError } from "../middleware/error.js";
import { PLAN_AGENT_LIMITS } from "../services/stripe.js";
import { captureServer } from "../services/posthog.js";

export const agentsRouter: IRouter = Router();

const createAgentSchema = z.object({
  name: z.string().min(1).max(200),
  capabilities: z.string().optional(),
});

agentsRouter.get("/", async (req, res, next) => {
  try {
    const rows = await db.query.agents.findMany({
      where: eq(agents.companyId, req.companyId),
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

    // Enforce plan agent limit
    const sub = await db.query.subscriptions.findFirst({
      where: eq(subscriptions.companyId, req.companyId),
    });
    const plan = sub?.status === "active" || sub?.status === "trialing" ? (sub.plan ?? "trial") : "trial";
    const limit = PLAN_AGENT_LIMITS[plan] ?? 1;

    const [countRow] = await db
      .select({ value: count() })
      .from(agents)
      .where(eq(agents.companyId, req.companyId));
    const agentCount = countRow?.value ?? 0;

    if (agentCount >= limit) {
      throw new AppError(403, `Plan limit reached: your ${plan} plan allows ${limit} agent(s). Upgrade to add more.`);
    }

    const [agent] = await db
      .insert(agents)
      .values({ companyId: req.companyId, name: body.name, capabilities: body.capabilities ?? null })
      .returning();
    captureServer(req.companyId, "agent_created", {
      agent_id: agent!.id,
      company_id: req.companyId,
      is_first_agent: agentCount === 0,
    });
    res.status(201).json(agent);
  } catch (err) {
    next(err);
  }
});

agentsRouter.get("/:id", async (req, res, next) => {
  try {
    const agent = await db.query.agents.findFirst({
      where: and(eq(agents.id, req.params.id!), eq(agents.companyId, req.companyId)),
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
      .where(and(eq(agents.id, req.params.id!), eq(agents.companyId, req.companyId)))
      .returning();
    if (!agent) throw new AppError(404, "Agent not found");
    res.json(agent);
  } catch (err) {
    next(err);
  }
});
