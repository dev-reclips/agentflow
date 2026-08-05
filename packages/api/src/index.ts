import "dotenv/config";
import "./types.js";
import express, { type Express, type Request, type Response, type NextFunction } from "express";
import { logger } from "./middleware/logger.js";
import { errorHandler } from "./middleware/error.js";
import { requireApiKey } from "./middleware/auth.js";
import { requireSession } from "./middleware/session.js";
import { healthRouter } from "./routes/health.js";
import { issuesRouter } from "./routes/issues.js";
import { agentsRouter } from "./routes/agents.js";
import { commentsRouter } from "./routes/comments.js";
import { companiesRouter, apiKeysRouter } from "./routes/companies.js";
import { authRouter } from "./routes/auth.js";
import { integrationsRouter } from "./routes/integrations.js";
import { webhooksRouter } from "./routes/webhooks.js";
import { billingRouter, webhookRouter as stripeWebhookRouter } from "./routes/billing.js";
import { emailJobsRouter } from "./routes/email-jobs.js";
import { onboardingRouter } from "./routes/onboarding.js";
import { adminRouter } from "./routes/admin.js";
import { demoRouter } from "./routes/demo.js";

const app: Express = express();
const port = process.env.PORT ?? 3000;

app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = process.env.CORS_ORIGIN ?? "*";
  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Headers", "Authorization, Content-Type");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  if (req.method === "OPTIONS") { res.sendStatus(200); return; }
  next();
});

// Stripe webhook needs raw body before express.json() parses everything else
app.use("/webhooks/stripe", express.raw({ type: "application/json" }), stripeWebhookRouter);

app.use(express.json({
  verify: (req: Request, _res: Response, buf: Buffer) => {
    req.rawBody = buf;
  },
}));
app.use(logger);

app.use("/health", healthRouter);
app.use("/auth", authRouter);
app.use("/api/v1/companies", requireApiKey, companiesRouter);
app.use("/api/v1/api-keys", requireApiKey, apiKeysRouter);
app.use("/api/v1/issues", requireApiKey, issuesRouter);
app.use("/api/v1/issues/:issueId/comments", requireApiKey, commentsRouter);
app.use("/api/v1/agents", requireApiKey, agentsRouter);
app.use("/api/v1/integrations", requireApiKey, integrationsRouter);
app.use("/api/v1/billing", requireSession, billingRouter);
app.use("/webhooks", webhooksRouter);
app.use("/internal/email-jobs", emailJobsRouter);
app.use("/api/v1/onboarding", requireSession, onboardingRouter);
app.use("/api/admin", adminRouter);
app.use("/demo", demoRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`AgentFlow API running on port ${port}`);
});

export default app;
