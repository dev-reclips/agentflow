"use client";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { api, type Issue, type Agent, type IssueComment, type IssueStatus, type IssuePriority } from "@/lib/api";

const STATUSES: IssueStatus[] = ["backlog", "todo", "in_progress", "in_review", "done", "blocked", "cancelled"];
const PRIORITIES: IssuePriority[] = ["critical", "high", "medium", "low"];

const STATUS_COLOR: Record<IssueStatus, string> = {
  todo: "var(--muted)",
  in_progress: "var(--accent)",
  in_review: "#a78bfa",
  done: "var(--green)",
  blocked: "var(--red)",
  backlog: "#888",
  cancelled: "#666",
};

const PRIORITY_COLOR: Record<IssuePriority, string> = {
  critical: "var(--red)",
  high: "#f97316",
  medium: "var(--accent)",
  low: "var(--muted)",
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function IssueDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [issue, setIssue] = useState<Issue | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [comments, setComments] = useState<IssueComment[]>([]);
  const [agentMap, setAgentMap] = useState<Record<string, Agent>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [commentBody, setCommentBody] = useState("");
  const [postingComment, setPostingComment] = useState(false);

  const load = useCallback(async () => {
    if (!id) return;
    try {
      const [issueData, agentsData, commentsData] = await Promise.all([
        api.issues.get(id),
        api.agents.list(),
        api.comments.list(id),
      ]);
      setIssue(issueData);
      setAgents(agentsData);
      setComments(commentsData);
      setAgentMap(Object.fromEntries(agentsData.map(a => [a.id, a])));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load issue");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { load(); }, [load]);

  async function patch(updates: Parameters<typeof api.issues.update>[1]) {
    if (!issue) return;
    setSaving(true);
    try {
      const updated = await api.issues.update(issue.id, updates);
      setIssue(updated);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function submitComment(e: React.FormEvent) {
    e.preventDefault();
    if (!commentBody.trim() || !issue) return;
    setPostingComment(true);
    try {
      const comment = await api.comments.create(issue.id, commentBody.trim());
      setComments(prev => [...prev, comment]);
      setCommentBody("");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to post comment");
    } finally {
      setPostingComment(false);
    }
  }

  if (loading) return <div className="dash-loading">Loading…</div>;
  if (!issue) return <div className="dash-page"><p className="form-error">{error || "Issue not found"}</p></div>;

  return (
    <div className="dash-page" style={{ maxWidth: 800 }}>
      <div style={{ marginBottom: 20 }}>
        <Link href="/dashboard/issues" style={{ color: "var(--muted)", fontSize: 13 }}>← Issues</Link>
      </div>

      {error && <p className="form-error" style={{ marginBottom: 12 }}>{error}</p>}

      <div className="card" style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, lineHeight: 1.3 }}>{issue.title}</h1>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 20 }}>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              className="form-input"
              value={issue.status}
              onChange={e => patch({ status: e.target.value as IssueStatus })}
              disabled={saving}
              style={{ color: STATUS_COLOR[issue.status] }}
            >
              {STATUSES.map(s => (
                <option key={s} value={s} style={{ color: "var(--text)" }}>{s.replace("_", " ")}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Priority</label>
            <select
              className="form-input"
              value={issue.priority}
              onChange={e => patch({ priority: e.target.value as IssuePriority })}
              disabled={saving}
              style={{ color: PRIORITY_COLOR[issue.priority] }}
            >
              {PRIORITIES.map(p => (
                <option key={p} value={p} style={{ color: "var(--text)" }}>{p}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Assigned agent</label>
            <select
              className="form-input"
              value={issue.assigneeAgentId ?? ""}
              onChange={e => patch({ assigneeAgentId: e.target.value || null })}
              disabled={saving}
            >
              <option value="">Unassigned</option>
              {agents.map(a => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
          </div>
        </div>

        {issue.description && (
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16 }}>
            <p className="form-label" style={{ marginBottom: 8 }}>Description</p>
            <p style={{ fontSize: 14, color: "var(--text)", whiteSpace: "pre-wrap", lineHeight: 1.7 }}>{issue.description}</p>
          </div>
        )}

        <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 16 }}>
          Created {timeAgo(issue.createdAt)} · Updated {timeAgo(issue.updatedAt)}
        </p>
      </div>

      <div className="card">
        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Comments ({comments.length})</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
          {comments.map(c => (
            <div key={c.id} style={{ borderBottom: "1px solid var(--border)", paddingBottom: 12 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)" }}>
                  {c.authorAgentId ? (agentMap[c.authorAgentId]?.name ?? "Agent") : "User"}
                </span>
                <span style={{ fontSize: 11, color: "var(--muted)" }}>{timeAgo(c.createdAt)}</span>
              </div>
              <p style={{ fontSize: 14, whiteSpace: "pre-wrap", lineHeight: 1.65 }}>{c.body}</p>
            </div>
          ))}
          {comments.length === 0 && (
            <p style={{ fontSize: 14, color: "var(--muted)" }}>No comments yet.</p>
          )}
        </div>

        <form onSubmit={submitComment} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <textarea
            className="form-input"
            placeholder="Leave a comment…"
            value={commentBody}
            onChange={e => setCommentBody(e.target.value)}
            rows={3}
            style={{ resize: "vertical" }}
          />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button className="btn btn-primary" type="submit" disabled={postingComment || !commentBody.trim()} style={{ padding: "7px 16px", fontSize: 14 }}>
              {postingComment ? "Posting…" : "Comment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
