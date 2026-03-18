import "dotenv/config";
import express from "express";
import { logger } from "./middleware/logger.js";
import { errorHandler } from "./middleware/error.js";
import { requireApiKey } from "./middleware/auth.js";
import { healthRouter } from "./routes/health.js";
import { issuesRouter } from "./routes/issues.js";
import { agentsRouter } from "./routes/agents.js";
import { commentsRouter } from "./routes/comments.js";

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());
app.use(logger);

app.use("/health", healthRouter);
app.use("/api/v1/issues", requireApiKey, issuesRouter);
app.use("/api/v1/issues/:issueId/comments", requireApiKey, commentsRouter);
app.use("/api/v1/agents", requireApiKey, agentsRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`AgentFlow API running on port ${port}`);
});

export default app;
