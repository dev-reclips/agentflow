"use client";
import { useEffect, useState } from "react";
import { api, type Agent } from "@/lib/api";

const STATUS_COLOR: Record<string, string> = {
  idle: "var(--muted)",
  running: "var(--green)",
  error: "var(--red)",
};

const STATUS_DOT: Record<string, string> = {
  idle: "#888",
  running: "var(--green)",
  error: "var(--red)",
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

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastRefresh, setLastRefresh] = useState(0);

  function loadAgents() {
    api.agents.list()
      .then(data => { setAgents(data); setLastRefresh(Date.now()); })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadAgents();
    const timer = setInterval(loadAgents, 10000);
    return () => clearInterval(timer);
  }, []);

  if (loading) return <div className="dash-loading">Loading agents…</div>;

  return (
    <div className="dash-page">
      <div className="dash-page-header">
        <h1 className="dash-page-title">Agents</h1>
        <span style={{ fontSize: 12, color: "var(--muted)" }}>
          Auto-refreshes every 10s · last {lastRefresh ? timeAgo(new Date(lastRefresh).toISOString()) : "—"}
        </span>
      </div>

      {error && <p className="form-error" style={{ marginBottom: 16 }}>{error}</p>}

      {agents.length === 0 && !error && (
        <div className="dash-empty">
          <p>No agents registered yet.</p>
          <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 8 }}>Use the API or SDK to register your first agent.</p>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {agents.map(agent => (
          <div key={agent.id} className="card" style={{ padding: "20px 24px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: STATUS_DOT[agent.status],
                      flexShrink: 0,
                      boxShadow: agent.status === "running" ? `0 0 6px ${STATUS_DOT[agent.status]}` : "none",
                    }}
                  />
                  <span style={{ fontWeight: 600, fontSize: 15 }}>{agent.name}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: STATUS_COLOR[agent.status], textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {agent.status}
                  </span>
                </div>
                {agent.capabilities && (
                  <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>{agent.capabilities}</p>
                )}
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <p style={{ fontSize: 11, color: "var(--muted)" }}>Last active</p>
                <p style={{ fontSize: 13, fontWeight: 500 }}>{timeAgo(agent.updatedAt)}</p>
              </div>
            </div>
            <p style={{ fontSize: 11, color: "var(--muted)", marginTop: 10, fontFamily: "var(--mono)" }}>
              {agent.id}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
