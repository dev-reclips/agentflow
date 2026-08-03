import "dotenv/config";
import "./types.js";
import express, { type Express, type Request, type Response, type NextFunction } from "express";
import { logger } from "./middleware/logger.js";
import { errorHandler } from "./middleware/error.js";
import { requireApiKey } from "./middleware/auth.js";
import { healthRouter } from "./routes/health.js";
import { issuesRouter } from "./routes/issues.js";
import { agentsRouter } from "./routes/agents.js";
import { commentsRouter } from "./routes/comments.js";
import { companiesRouter, apiKeysRouter } from "./routes/companies.js";
import { authRouter } from "./routes/auth.js";

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

app.use(express.json());
app.use(logger);

app.use("/health", healthRouter);
app.use("/auth", authRouter);
app.use("/api/v1/companies", requireApiKey, companiesRouter);
app.use("/api/v1/api-keys", requireApiKey, apiKeysRouter);
app.use("/api/v1/issues", requireApiKey, issuesRouter);
app.use("/api/v1/issues/:issueId/comments", requireApiKey, commentsRouter);
app.use("/api/v1/agents", requireApiKey, agentsRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`AgentFlow API running on port ${port}`);
});

export default app;
