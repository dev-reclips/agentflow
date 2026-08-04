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

export interface Issue {
  id: string;
  companyId: string;
  title: string;
  description: string | null;
  status: IssueStatus;
  priority: IssuePriority;
  assigneeAgentId: string | null;
  parentId: string | null;
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
  webhookSecret: string;
  repos: string[];
  defaultAgentId: string | null;
  hasToken: boolean;
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
      return request("/issues", { headers: authHeaders() });
    },
    get(id: string): Promise<Issue> {
      return request(`/issues/${id}`, { headers: authHeaders() });
    },
    create(data: { title: string; description?: string; priority?: IssuePriority; assigneeAgentId?: string }): Promise<Issue> {
      return request("/issues", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(data),
      });
    },
    update(id: string, data: { title?: string; description?: string; status?: IssueStatus; priority?: IssuePriority; assigneeAgentId?: string | null }): Promise<Issue> {
      return request(`/issues/${id}`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify(data),
      });
    },
  },

  agents: {
    list(): Promise<Agent[]> {
      return request("/agents", { headers: authHeaders() });
    },
    get(id: string): Promise<Agent> {
      return request(`/agents/${id}`, { headers: authHeaders() });
    },
  },

  comments: {
    list(issueId: string): Promise<IssueComment[]> {
      return request(`/issues/${issueId}/comments`, { headers: authHeaders() });
    },
    create(issueId: string, body: string): Promise<IssueComment> {
      return request(`/issues/${issueId}/comments`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ body }),
      });
    },
  },

  integrations: {
    getGithub(): Promise<GithubIntegration | null> {
      return request("/integrations/github", { headers: authHeaders() });
    },
    upsertGithub(data: { githubToken: string; webhookSecret: string; repos: string[]; defaultAgentId?: string | null }): Promise<GithubIntegration> {
      return request("/integrations/github", {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(data),
      });
    },
    deleteGithub(): Promise<void> {
      return request("/integrations/github", {
        method: "DELETE",
        headers: authHeaders(),
      });
    },
  },
};

export interface GithubIntegration {
  id: string;
  companyId: string;
  hasToken: boolean;
  webhookSecret: string;
  repos: string[];
  defaultAgentId: string | null;
  createdAt: string;
  updatedAt: string;
}
