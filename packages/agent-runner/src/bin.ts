import "dotenv/config";
import { AgentRunner } from "./runner.js";

const required = ["AGENTFLOW_API_URL", "AGENTFLOW_API_KEY", "AGENTFLOW_AGENT_ID", "ANTHROPIC_API_KEY"];
for (const key of required) {
  if (!process.env[key]) {
    console.error(`Missing required env var: ${key}`);
    process.exit(1);
  }
}

const runner = new AgentRunner({
  apiBaseUrl: process.env.AGENTFLOW_API_URL!,
  apiKey: process.env.AGENTFLOW_API_KEY!,
  agentId: process.env.AGENTFLOW_AGENT_ID!,
  anthropicApiKey: process.env.ANTHROPIC_API_KEY!,
  pollIntervalMs: Number(process.env.POLL_INTERVAL_MS ?? "10000"),
});

process.on("SIGINT", () => {
  console.log("[runner] shutting down");
  runner.stop();
  process.exit(0);
});

runner.start().catch((err) => {
  console.error("[runner] fatal error", err);
  process.exit(1);
});
