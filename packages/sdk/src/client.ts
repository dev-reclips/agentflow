import type { Issue, Agent, IssueComment, CreateIssueInput, UpdateIssueInput } from "./types.js";

export class AgentFlowClient {
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor(options: { baseUrl: string; apiKey?: string }) {
    this.baseUrl = options.baseUrl.replace(/\/$/, "");
    this.headers = {
      "Content-Type": "application/json",
      ...(options.apiKey ? { Authorization: `Bearer ${options.apiKey}` } : {}),
    };
  }

  private async request<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      ...init,
      headers: { ...this.headers, ...init?.headers },
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP ${res.status}: ${text}`);
    }
    return res.json() as Promise<T>;
  }

  // Issues
  listIssues(): Promise<Issue[]> {
    return this.request<Issue[]>("/api/v1/issues");
  }

  createIssue(input: CreateIssueInput): Promise<Issue> {
    return this.request<Issue>("/api/v1/issues", {
      method: "POST",
      body: JSON.stringify(input),
    });
  }

  getIssue(id: string): Promise<Issue> {
    return this.request<Issue>(`/api/v1/issues/${id}`);
  }

  updateIssue(id: string, input: UpdateIssueInput): Promise<Issue> {
    return this.request<Issue>(`/api/v1/issues/${id}`, {
      method: "PATCH",
      body: JSON.stringify(input),
    });
  }

  // Comments
  listComments(issueId: string): Promise<IssueComment[]> {
    return this.request<IssueComment[]>(`/api/v1/issues/${issueId}/comments`);
  }

  addComment(issueId: string, body: string, authorAgentId?: string): Promise<IssueComment> {
    return this.request<IssueComment>(`/api/v1/issues/${issueId}/comments`, {
      method: "POST",
      body: JSON.stringify({ body, authorAgentId }),
    });
  }

  // Agents
  listAgents(): Promise<Agent[]> {
    return this.request<Agent[]>("/api/v1/agents");
  }

  getAgent(id: string): Promise<Agent> {
    return this.request<Agent>(`/api/v1/agents/${id}`);
  }

  updateAgentStatus(id: string, status: Agent["status"]): Promise<Agent> {
    return this.request<Agent>(`/api/v1/agents/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  }
}
