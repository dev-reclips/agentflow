"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api, type GithubIntegration, type Agent } from "@/lib/api";

export default function IntegrationsPage() {
  const [integration, setIntegration] = useState<GithubIntegration | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    installationId: "",
    webhookSecret: "",
    repos: "",
    defaultAgentId: "",
  });

  useEffect(() => {
    Promise.all([api.integrations.getGithub(), api.agents.list()])
      .then(([gh, agentList]) => {
        setIntegration(gh);
        setAgents(agentList);
        if (gh) {
          setForm({
            installationId: String(gh.installationId),
            webhookSecret: gh.webhookSecret,
            repos: gh.repos.join(", "),
            defaultAgentId: gh.defaultAgentId ?? "",
          });
        }
      })
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      const installationId = parseInt(form.installationId, 10);
      if (!Number.isInteger(installationId) || installationId <= 0) {
        setError("Installation ID must be a positive integer.");
        return;
      }
      const repos = form.repos
        .split(",")
        .map((r) => r.trim())
        .filter(Boolean);
      const updated = await api.integrations.upsertGithub({
        installationId,
        webhookSecret: form.webhookSecret,
        repos,
        defaultAgentId: form.defaultAgentId || null,
      });
      setIntegration(updated);
      setForm((f) => ({ ...f, webhookSecret: updated.webhookSecret }));
      setSuccess(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setSaving(false);
    }
  }

  async function handleDisconnect() {
    if (!confirm("Disconnect GitHub? This will stop webhook processing.")) return;
    setSaving(true);
    try {
      await api.integrations.deleteGithub();
      setIntegration(null);
      setForm({ installationId: "", webhookSecret: "", repos: "", defaultAgentId: "" });
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="dash-loading">Loading…</div>;

  return (
    <div className="dash-page" style={{ maxWidth: 680 }}>
      <div style={{ marginBottom: 20 }}>
        <Link href="/dashboard" style={{ color: "var(--muted)", fontSize: 13 }}>← Dashboard</Link>
      </div>

      <div className="dash-page-header">
        <h1 className="dash-page-title">Integrations</h1>
      </div>

      <div className="card">
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <svg viewBox="0 0 24 24" width="22" height="22" style={{ fill: "var(--text)", flexShrink: 0 }} aria-hidden="true">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          <h2 style={{ fontSize: 17, fontWeight: 600 }}>GitHub</h2>
          {integration && (
            <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 600, color: "var(--green)", background: "rgba(34,197,94,0.1)", padding: "3px 8px", borderRadius: 12, border: "1px solid rgba(34,197,94,0.3)" }}>
              CONNECTED
            </span>
          )}
        </div>

        {error && <p className="form-error" style={{ marginBottom: 16 }}>{error}</p>}
        {success && (
          <p style={{ fontSize: 14, color: "var(--green)", marginBottom: 16 }}>
            GitHub integration saved.
          </p>
        )}

        <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="form-group">
            <label className="form-label">
              GitHub App Installation ID
              <span style={{ marginLeft: 6, fontWeight: 400 }}>(from your GitHub App installation URL)</span>
            </label>
            <input
              type="number"
              className="form-input"
              placeholder="12345678"
              value={form.installationId}
              onChange={(e) => setForm((f) => ({ ...f, installationId: e.target.value }))}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Webhook Secret</label>
            <input
              type="text"
              className="form-input"
              placeholder="A random secret to verify GitHub webhooks"
              value={form.webhookSecret}
              onChange={(e) => setForm((f) => ({ ...f, webhookSecret: e.target.value }))}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Connected Repos
              <span style={{ marginLeft: 6, fontWeight: 400 }}>(comma-separated, e.g. org/repo — leave blank to accept all)</span>
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="acme/backend, acme/frontend"
              value={form.repos}
              onChange={(e) => setForm((f) => ({ ...f, repos: e.target.value }))}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Default Agent (for webhook-created issues)</label>
            <select
              className="form-input"
              value={form.defaultAgentId}
              onChange={(e) => setForm((f) => ({ ...f, defaultAgentId: e.target.value }))}
            >
              <option value="">— none —</option>
              {agents.map((a) => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex", gap: 12, paddingTop: 4 }}>
            <button type="submit" className="btn btn-primary" disabled={saving} style={{ padding: "9px 20px", fontSize: 14 }}>
              {saving ? "Saving…" : integration ? "Update" : "Connect GitHub"}
            </button>
            {integration && (
              <button
                type="button"
                onClick={handleDisconnect}
                disabled={saving}
                className="btn btn-secondary"
                style={{ padding: "9px 20px", fontSize: 14, color: "var(--red)", borderColor: "var(--red)" }}
              >
                Disconnect
              </button>
            )}
          </div>
        </form>

        {integration && (
          <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--border)" }}>
            <p className="form-label" style={{ marginBottom: 8 }}>Webhook URL</p>
            <code style={{ display: "block", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "10px 14px", fontSize: 12, fontFamily: "var(--mono)", color: "var(--text)", userSelect: "all" }}>
              {process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001"}/webhooks/github
            </code>
            <p style={{ marginTop: 10, fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>
              Set this URL in your GitHub App webhook settings. Subscribe to <strong>Issues</strong> and <strong>Pull requests</strong> events.
              When a GitHub issue is labeled <code style={{ fontFamily: "var(--mono)", fontSize: 12 }}>agentflow</code>, it will appear in your dashboard assigned to the configured agent.
            </p>
            <p style={{ marginTop: 8, fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>
              The GitHub App private key and App ID must be set as <code style={{ fontFamily: "var(--mono)", fontSize: 12 }}>GITHUB_APP_PRIVATE_KEY</code> and <code style={{ fontFamily: "var(--mono)", fontSize: 12 }}>GITHUB_APP_ID</code> in the API environment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
