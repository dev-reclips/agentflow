import { type Router as IRouter, Router, type Request, type Response, type NextFunction } from "express";
import { createHmac, timingSafeEqual } from "crypto";
import { eq, and } from "drizzle-orm";
import { db } from "../db/client.js";
import { githubIntegrations, issues } from "../db/schema.js";

export const webhooksRouter: IRouter = Router();

function verifyGithubSignature(secret: string, rawBody: Buffer, sigHeader: string | undefined): boolean {
  if (!sigHeader?.startsWith("sha256=")) return false;
  const expected = Buffer.from(`sha256=${createHmac("sha256", secret).update(rawBody).digest("hex")}`);
  const received = Buffer.from(sigHeader);
  if (expected.length !== received.length) return false;
  return timingSafeEqual(expected, received);
}

// Raw body needed for signature verification — use express.raw() for this route
webhooksRouter.post(
  "/github",
  (req: Request, res: Response, next: NextFunction) => {
    // express.json() already parsed — we need the raw body for HMAC.
    // We re-serialise from parsed body (acceptable for MVP; use rawBody middleware for prod).
    next();
  },
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const event = req.headers["x-github-event"] as string | undefined;
      const sig = req.headers["x-hub-signature-256"] as string | undefined;

      if (event !== "issues" && event !== "pull_request") {
        res.status(200).json({ ok: true, skipped: true });
        return;
      }

      const payload = req.body as {
        action?: string;
        label?: { name: string };
        issue?: { number: number; title: string; body?: string; html_url: string };
        pull_request?: { number: number; title: string; body?: string; html_url: string; state: string; merged?: boolean };
        repository?: { full_name: string };
        installation?: { id: number };
      };

      const repoFullName = payload.repository?.full_name;
      if (!repoFullName) {
        res.status(400).json({ error: "Missing repository data" });
        return;
      }

      // Find the integration that covers this repo
      const allIntegrations = await db.query.githubIntegrations.findMany();
      const integration = allIntegrations.find(
        (i) => i.repos.length === 0 || i.repos.includes(repoFullName),
      );

      if (!integration) {
        res.status(200).json({ ok: true, skipped: true, reason: "no integration for repo" });
        return;
      }

      // Verify signature using the matching integration's secret
      const rawBody = req.rawBody ?? Buffer.from(JSON.stringify(payload));
      if (!verifyGithubSignature(integration.webhookSecret, rawBody, sig)) {
        res.status(401).json({ error: "Invalid signature" });
        return;
      }

      // Handle pull_request events: update PR state on linked AgentFlow issues
      if (event === "pull_request" && payload.pull_request) {
        const pr = payload.pull_request;
        const prState = pr.merged ? "merged" : pr.state;
        await db
          .update(issues)
          .set({ githubPrState: prState, updatedAt: new Date() })
          .where(
            and(
              eq(issues.companyId, integration.companyId),
              eq(issues.githubPrNumber, pr.number),
            ),
          );
        res.status(200).json({ ok: true, event: "pull_request", prNumber: pr.number, state: prState });
        return;
      }

      // Handle issues events: create AgentFlow issue when labeled "agentflow"
      if (!payload.issue) {
        res.status(400).json({ error: "Missing issue data" });
        return;
      }

      if (payload.action !== "labeled" || payload.label?.name !== "agentflow") {
        res.status(200).json({ ok: true, skipped: true });
        return;
      }

      // Check for duplicate (idempotency)
      const existing = await db.query.issues.findFirst({
        where: and(
          eq(issues.companyId, integration.companyId),
          eq(issues.githubRepo, repoFullName),
          eq(issues.githubIssueNumber, payload.issue.number),
        ),
      });

      if (existing) {
        res.status(200).json({ ok: true, skipped: true, reason: "already synced", issueId: existing.id });
        return;
      }

      const [created] = await db
        .insert(issues)
        .values({
          companyId: integration.companyId,
          title: `[GitHub] ${payload.issue.title}`,
          description: payload.issue.body ?? null,
          priority: "medium",
          assigneeAgentId: integration.defaultAgentId ?? null,
          githubRepo: repoFullName,
          githubIssueNumber: payload.issue.number,
        })
        .returning();

      res.status(201).json({ ok: true, issueId: created!.id });
    } catch (err) {
      next(err);
    }
  },
);
