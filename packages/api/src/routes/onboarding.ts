import { type Router as IRouter, Router } from "express";
import { and, eq, isNotNull } from "drizzle-orm";
import { db } from "../db/client.js";
import { githubIntegrations, agents, issues } from "../db/schema.js";

export const onboardingRouter: IRouter = Router();

onboardingRouter.get("/status", async (req, res, next) => {
  try {
    const companyId = req.companyId;

    const [github, agent, assignedIssue, prIssue] = await Promise.all([
      db.query.githubIntegrations.findFirst({ where: eq(githubIntegrations.companyId, companyId) }),
      db.query.agents.findFirst({ where: eq(agents.companyId, companyId) }),
      db.query.issues.findFirst({
        where: and(eq(issues.companyId, companyId), isNotNull(issues.assigneeAgentId)),
      }),
      db.query.issues.findFirst({
        where: and(eq(issues.companyId, companyId), isNotNull(issues.githubPrUrl)),
      }),
    ]);

    res.json({
      steps: [
        { step: 1, completed: true },
        { step: 2, completed: !!github },
        { step: 3, completed: !!agent },
        { step: 4, completed: !!assignedIssue },
        { step: 5, completed: !!prIssue },
      ],
    });
  } catch (err) {
    next(err);
  }
});
