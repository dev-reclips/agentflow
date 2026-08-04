"use client";

import { useEffect, useState } from "react";
import { api, type GithubIntegration, type Agent } from "@/lib/api";

export default function IntegrationsPage() {
  const [integration, setIntegration] = useState<GithubIntegration | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    githubToken: "",
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
            githubToken: "",
            webhookSecret: "",
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
      const repos = form.repos
        .split(",")
        .map((r) => r.trim())
        .filter(Boolean);
      const updated = await api.integrations.saveGithub({
        githubToken: form.githubToken || "KEEP",
        webhookSecret: form.webhookSecret || (integration?.webhookSecret ?? ""),
        repos,
        defaultAgentId: form.defaultAgentId || null,
      });
      setIntegration(updated);
      setForm((f) => ({ ...f, githubToken: "" }));
      setSuccess(true);
    } catch (e) {
      setError(String(e));
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
      setForm({ githubToken: "", webhookSecret: "", repos: "", defaultAgentId: "" });
    } catch (e) {
      setError(String(e));
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="p-8 text-gray-500">Loading…</div>;

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-2">Integrations</h1>
      <p className="text-gray-500 mb-8">Connect external services to AgentFlow.</p>

      <section className="border rounded-lg p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          <h2 className="text-lg font-semibold">GitHub</h2>
          {integration && (
            <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
              Connected
            </span>
          )}
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded p-3">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded p-3">
            GitHub integration saved.
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Installation Token / PAT
              {integration?.hasToken && (
                <span className="ml-2 text-xs text-gray-400 font-normal">(leave blank to keep existing)</span>
              )}
            </label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={integration?.hasToken ? "••••••••" : "ghp_… or GitHub App installation token"}
              value={form.githubToken}
              onChange={(e) => setForm((f) => ({ ...f, githubToken: e.target.value }))}
              required={!integration?.hasToken}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Webhook Secret</label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={integration ? "••••••••" : "A random secret to verify GitHub webhooks"}
              value={form.webhookSecret}
              onChange={(e) => setForm((f) => ({ ...f, webhookSecret: e.target.value }))}
              required={!integration}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Connected Repos
              <span className="ml-1 text-xs text-gray-400 font-normal">(comma-separated, e.g. org/repo — leave blank to accept all)</span>
            </label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="acme/backend, acme/frontend"
              value={form.repos}
              onChange={(e) => setForm((f) => ({ ...f, repos: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Default Agent (for webhook-created issues)</label>
            <select
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.defaultAgentId}
              onChange={(e) => setForm((f) => ({ ...f, defaultAgentId: e.target.value }))}
            >
              <option value="">— none —</option>
              {agents.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "Saving…" : integration ? "Update" : "Connect GitHub"}
            </button>
            {integration && (
              <button
                type="button"
                onClick={handleDisconnect}
                disabled={saving}
                className="px-4 py-2 border border-red-300 text-red-600 text-sm font-medium rounded hover:bg-red-50 disabled:opacity-50"
              >
                Disconnect
              </button>
            )}
          </div>
        </form>

        {integration && (
          <div className="mt-6 pt-4 border-t text-xs text-gray-500">
            <p className="font-medium text-gray-700 mb-1">Webhook URL</p>
            <code className="block bg-gray-50 border rounded px-3 py-2 text-gray-800 select-all">
              {process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001"}/webhooks/github
            </code>
            <p className="mt-2">
              In your GitHub App settings, set the webhook URL above and use the secret you configured. Subscribe to{" "}
              <strong>Issues</strong> events (label agentflow to trigger issue creation).
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
