"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api, type Agent, type IssuePriority } from "@/lib/api";

export default function NewIssuePage() {
  const router = useRouter();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<IssuePriority>("medium");
  const [assigneeAgentId, setAssigneeAgentId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api.agents.list().then(setAgents).catch(() => {});
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setSubmitting(true);
    setError("");
    try {
      const createData: { title: string; description?: string; priority?: IssuePriority; assigneeAgentId?: string } = {
        title: title.trim(),
        priority,
      };
      if (description.trim()) createData.description = description.trim();
      if (assigneeAgentId) createData.assigneeAgentId = assigneeAgentId;
      const issue = await api.issues.create(createData);
      router.push(`/dashboard/issues/${issue.id}`);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to create issue");
      setSubmitting(false);
    }
  }

  return (
    <div className="dash-page" style={{ maxWidth: 640 }}>
      <div className="dash-page-header">
        <h1 className="dash-page-title">New Issue</h1>
        <Link href="/dashboard/issues" className="btn btn-secondary" style={{ padding: "7px 16px", fontSize: 14 }}>Cancel</Link>
      </div>

      <form onSubmit={handleSubmit} className="card" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div className="form-group">
          <label className="form-label">Title *</label>
          <input
            className="form-input"
            placeholder="Short description of the task"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            autoFocus
          />
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            className="form-input"
            placeholder="Acceptance criteria, context, links…"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={5}
            style={{ resize: "vertical" }}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div className="form-group">
            <label className="form-label">Priority</label>
            <select className="form-input" value={priority} onChange={e => setPriority(e.target.value as IssuePriority)}>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Assign to agent</label>
            <select className="form-input" value={assigneeAgentId} onChange={e => setAssigneeAgentId(e.target.value)}>
              <option value="">Unassigned</option>
              {agents.map(a => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
          </div>
        </div>

        {error && <p className="form-error">{error}</p>}

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button className="btn btn-primary" type="submit" disabled={submitting || !title.trim()}>
            {submitting ? "Creating…" : "Create issue"}
          </button>
        </div>
      </form>
    </div>
  );
}
