"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { api, type Issue, type IssueStatus } from "@/lib/api";

const STATUS_COLUMNS: { key: IssueStatus; label: string }[] = [
  { key: "todo", label: "Todo" },
  { key: "in_progress", label: "In Progress" },
  { key: "in_review", label: "In Review" },
  { key: "blocked", label: "Blocked" },
  { key: "done", label: "Done" },
];

const PRIORITY_COLOR: Record<string, string> = {
  critical: "var(--red)",
  high: "#f97316",
  medium: "var(--accent)",
  low: "var(--muted)",
};

function StatusBadge({ status }: { status: IssueStatus }) {
  const colors: Record<IssueStatus, string> = {
    todo: "var(--muted)",
    in_progress: "var(--accent)",
    in_review: "#a78bfa",
    done: "var(--green)",
    blocked: "var(--red)",
    backlog: "#888",
    cancelled: "#666",
  };
  return (
    <span style={{ fontSize: 11, fontWeight: 600, color: colors[status], textTransform: "uppercase", letterSpacing: "0.05em" }}>
      {status.replace("_", " ")}
    </span>
  );
}

export default function IssuesPage() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.issues.list()
      .then(setIssues)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const grouped = STATUS_COLUMNS.reduce<Partial<Record<IssueStatus, Issue[]>>>((acc, col) => {
    acc[col.key] = issues.filter(i => i.status === col.key);
    return acc;
  }, {});

  if (loading) {
    return <div className="dash-loading">Loading issues…</div>;
  }

  return (
    <div className="dash-page">
      <div className="dash-page-header">
        <h1 className="dash-page-title">Issues</h1>
        <Link href="/dashboard/issues/new" className="btn btn-primary" style={{ padding: "7px 16px", fontSize: 14 }}>
          + New Issue
        </Link>
      </div>

      {error && <p className="form-error" style={{ marginBottom: 16 }}>{error}</p>}

      {issues.length === 0 && !error && (
        <div className="dash-empty">
          <p>No issues yet.</p>
          <Link href="/dashboard/issues/new" className="btn btn-primary" style={{ marginTop: 12 }}>Create your first issue</Link>
        </div>
      )}

      <div className="issues-columns">
        {STATUS_COLUMNS.map(col => {
          const colIssues = grouped[col.key] ?? [];
          return (
            <div key={col.key} className="issues-column">
              <div className="issues-column-header">
                <span className="issues-column-title">{col.label}</span>
                <span className="issues-column-count">{colIssues.length}</span>
              </div>
              <div className="issues-column-body">
                {colIssues.map(issue => (
                  <Link key={issue.id} href={`/dashboard/issues/${issue.id}`} className="issue-card">
                    <div className="issue-card-title">{issue.title}</div>
                    <div className="issue-card-meta">
                      <span style={{ color: PRIORITY_COLOR[issue.priority], fontSize: 11, fontWeight: 600, textTransform: "uppercase" }}>
                        {issue.priority}
                      </span>
                      <StatusBadge status={issue.status} />
                    </div>
                  </Link>
                ))}
                {colIssues.length === 0 && (
                  <div className="issues-column-empty">No issues</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
