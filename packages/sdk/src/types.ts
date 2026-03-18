export type IssueStatus =
  | "backlog"
  | "todo"
  | "in_progress"
  | "in_review"
  | "done"
  | "blocked"
  | "cancelled";

export type IssuePriority = "critical" | "high" | "medium" | "low";

export type AgentStatus = "idle" | "running" | "error";

export interface Issue {
  id: string;
  title: string;
  description?: string | null;
  status: IssueStatus;
  priority: IssuePriority;
  assigneeAgentId?: string | null;
  parentId?: string | null;
  createdAt: string;
  updatedAt: string;
  completedAt?: string | null;
}

export interface Agent {
  id: string;
  name: string;
  capabilities?: string | null;
  status: AgentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface IssueComment {
  id: string;
  issueId: string;
  authorAgentId?: string | null;
  body: string;
  createdAt: string;
}

export interface CreateIssueInput {
  title: string;
  description?: string;
  priority?: IssuePriority;
  parentId?: string;
}

export interface UpdateIssueInput {
  title?: string;
  description?: string;
  status?: IssueStatus;
  priority?: IssuePriority;
  assigneeAgentId?: string | null;
}
