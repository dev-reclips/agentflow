import Anthropic from "@anthropic-ai/sdk";
import { AgentFlowClient } from "@agentflow/sdk";
import type { Issue } from "@agentflow/sdk";

interface RunnerConfig {
  apiBaseUrl: string;
  apiKey: string;
  agentId: string;
  anthropicApiKey: string;
  pollIntervalMs?: number;
}

export class AgentRunner {
  private client: AgentFlowClient;
  private anthropic: Anthropic;
  private config: RunnerConfig;
  private running = false;

  constructor(config: RunnerConfig) {
    this.config = config;
    this.client = new AgentFlowClient({ baseUrl: config.apiBaseUrl, apiKey: config.apiKey });
    this.anthropic = new Anthropic({ apiKey: config.anthropicApiKey });
  }

  async start(): Promise<void> {
    this.running = true;
    const interval = this.config.pollIntervalMs ?? 10_000;
    console.log(`[runner] agent=${this.config.agentId} polling every ${interval}ms`);

    while (this.running) {
      await this.heartbeat();
      await sleep(interval);
    }
  }

  stop(): void {
    this.running = false;
  }

  private async heartbeat(): Promise<void> {
    try {
      const issues = await this.client.listIssues();
      const assigned = issues.filter(
        (i) =>
          i.assigneeAgentId === this.config.agentId &&
          (i.status === "todo" || i.status === "in_progress"),
      );

      if (assigned.length === 0) return;

      const issue = assigned[0]!;
      console.log(`[runner] working on issue=${issue.id} "${issue.title}"`);
      await this.execute(issue);
    } catch (err) {
      console.error("[runner] heartbeat error", err);
    }
  }

  private async execute(issue: Issue): Promise<void> {
    // Mark in progress
    await this.client.updateIssue(issue.id, { status: "in_progress" });

    try {
      const result = await this.runWithClaude(issue);
      await this.client.addComment(issue.id, `## Completed\n\n${result}`, this.config.agentId);
      await this.client.updateIssue(issue.id, { status: "done" });
      console.log(`[runner] done issue=${issue.id}`, result.slice(0, 100));
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      await this.client.addComment(
        issue.id,
        `## Blocked\n\nExecution failed: ${msg}`,
        this.config.agentId,
      );
      await this.client.updateIssue(issue.id, { status: "blocked" });
      console.error(`[runner] failed issue=${issue.id}`, err);
    }
  }

  private async runWithClaude(issue: Issue): Promise<string> {
    const prompt = buildPrompt(issue);
    const message = await this.anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2048,
      messages: [{ role: "user", content: prompt }],
    });

    const content = message.content[0];
    if (content?.type !== "text") throw new Error("unexpected response type");
    return content.text;
  }
}

function buildPrompt(issue: Issue): string {
  return `You are an autonomous software agent. Complete the following task:

**Title:** ${issue.title}

**Description:**
${issue.description ?? "(no description)"}

**Priority:** ${issue.priority}

Provide a clear, concise completion report of what you did or what needs to be done. Be specific.`;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
