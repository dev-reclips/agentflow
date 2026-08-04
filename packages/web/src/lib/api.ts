import { getToken } from "./auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...init?.headers },
    ...init,
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((body as { error?: string }).error ?? `Request failed: ${res.status}`);
  return body as T;
}

function authHeaders(): Record<string, string> {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export interface RegisterResult {
  token: string;
  apiKey: string;
  user: { id: string; email: string; role: string };
  company: { id: string; name: string; slug: string };
}

export interface LoginResult {
  token: string;
  user: { id: string; email: string; role: string };
}

export interface MeResult {
  user: { id: string; email: string; role: string };
  company: { id: string; name: string; slug: string };
}

export type IssueStatus = "backlog" | "todo" | "in_progress" | "in_review" | "done" | "blocked" | "cancelled";
export type IssuePriority = "critical" | "high" | "medium" | "low";
export type AgentStatus = "idle" | "running" | "error";
export type SubscriptionPlan = "trial" | "starter" | "growth" | "scale";
export type SubscriptionStatus = "trialing" | "active" | "past_due" | "canceled" | "incomplete";

export interface Issue {
  id: string;
  companyId: string;
  title: string;
  description: string | null;
  status: IssueStatus;
  priority: IssuePriority;
  assigneeAgentId: string | null;
  parentId: string | null;
  githubRepo: string | null;
  githubIssueNumber: number | null;
  githubPrUrl: string | null;
  githubPrNumber: number | null;
  githubPrState: string | null;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
}

export interface Agent {
  id: string;
  companyId: string;
  name: string;
  capabilities: string | null;
  status: AgentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface IssueComment {
  id: string;
  issueId: string;
  authorAgentId: string | null;
  body: string;
  createdAt: string;
}

export interface GithubIntegration {
  id: string;
  companyId: string;
  installationId: number;
  webhookSecret: string;
  repos: string[];
  defaultAgentId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Subscription {
  id: string;
  companyId: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string | null;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
  createdAt: string;
  updatedAt: string;
}

export const api = {
  register(email: string, password: string, companyName: string): Promise<RegisterResult> {
    return request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, companyName }),
    });
  },

  login(email: string, password: string): Promise<LoginResult> {
    return request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  me(token: string): Promise<MeResult> {
    return request("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  issues: {
    list(): Promise<Issue[]> {
      return request("/api/v1/issues", { headers: authHeaders() });
    },
    get(id: string): Promise<Issue> {
      return request(`/api/v1/issues/${id}`, { headers: authHeaders() });
    },
    create(data: { title: string; description?: string; priority?: IssuePriority; assigneeAgentId?: string }): Promise<Issue> {
      return request("/api/v1/issues", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(data),
      });
    },
    update(id: string, data: { title?: string; description?: string; status?: IssueStatus; priority?: IssuePriority; assigneeAgentId?: string | null }): Promise<Issue> {
      return request(`/api/v1/issues/${id}`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify(data),
      });
    },
  },

  agents: {
    list(): Promise<Agent[]> {
      return request("/api/v1/agents", { headers: authHeaders() });
    },
    get(id: string): Promise<Agent> {
      return request(`/api/v1/agents/${id}`, { headers: authHeaders() });
    },
    create(data: { name: string; capabilities?: string }): Promise<Agent> {
      return request("/api/v1/agents", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(data),
      });
    },
  },

  comments: {
    list(issueId: string): Promise<IssueComment[]> {
      return request(`/api/v1/issues/${issueId}/comments`, { headers: authHeaders() });
    },
    create(issueId: string, body: string): Promise<IssueComment> {
      return request(`/api/v1/issues/${issueId}/comments`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ body }),
      });
    },
  },

  integrations: {
    getGithub(): Promise<GithubIntegration | null> {
      return request("/api/v1/integrations/github", { headers: authHeaders() });
    },
    upsertGithub(data: { installationId: number; webhookSecret: string; repos: string[]; defaultAgentId?: string | null }): Promise<GithubIntegration> {
      return request("/api/v1/integrations/github", {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(data),
      });
    },
    deleteGithub(): Promise<void> {
      return request("/api/v1/integrations/github", {
        method: "DELETE",
        headers: authHeaders(),
      });
    },
  },

  billing: {
    get(): Promise<Subscription | null> {
      return request("/api/v1/billing", { headers: authHeaders() });
    },
    createCheckout(plan: "starter" | "growth"): Promise<{ url: string }> {
      return request("/api/v1/billing/checkout", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ plan }),
      });
    },
    createPortal(): Promise<{ url: string }> {
      return request("/api/v1/billing/portal", {
        method: "POST",
        headers: authHeaders(),
      });
    },
  },
};
