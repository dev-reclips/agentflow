"use client";
import { useState, useRef } from "react";
import Link from "next/link";

const LABEL_CATEGORIES: Record<string, { label: string; hoursEach: number; color: string }> = {
  bug: { label: "Bugs", hoursEach: 3, color: "#ef4444" },
  documentation: { label: "Documentation", hoursEach: 1, color: "#3b82f6" },
  "good first issue": { label: "Good First Issues", hoursEach: 2, color: "#22c55e" },
  "help wanted": { label: "Help Wanted", hoursEach: 4, color: "#f59e0b" },
  dependencies: { label: "Dependency Updates", hoursEach: 0.5, color: "#8b5cf6" },
  enhancement: { label: "Enhancements", hoursEach: 4, color: "#6366f1" },
  chore: { label: "Chores", hoursEach: 1, color: "#64748b" },
  test: { label: "Tests", hoursEach: 2, color: "#06b6d4" },
  refactor: { label: "Refactors", hoursEach: 3, color: "#a855f7" },
};

const DEV_HOURLY_RATE = 100;

interface GitHubIssue {
  number: number;
  title: string;
  labels: { name: string }[];
}

interface AnalysisResult {
  repo: string;
  totalOpen: number;
  byCategory: { key: string; count: number; hours: number }[];
  totalMatchingIssues: number;
  totalHours: number;
  totalCost: number;
}

function parseRepoUrl(input: string): { owner: string; repo: string } | null {
  const trimmed = input.trim().replace(/\/$/, "");
  // Handle https://github.com/owner/repo
  const match = trimmed.match(/github\.com\/([^/]+)\/([^/\s]+)/);
  if (match && match[1] && match[2]) return { owner: match[1], repo: match[2].replace(/\.git$/, "") };
  // Handle owner/repo
  const shortMatch = trimmed.match(/^([^/\s]+)\/([^/\s]+)$/);
  if (shortMatch && shortMatch[1] && shortMatch[2]) return { owner: shortMatch[1], repo: shortMatch[2] };
  return null;
}

async function fetchIssues(owner: string, repo: string): Promise<GitHubIssue[]> {
  const allIssues: GitHubIssue[] = [];
  for (let page = 1; page <= 3; page++) {
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/issues?state=open&per_page=100&page=${page}`,
      { headers: { Accept: "application/vnd.github.v3+json" } }
    );
    if (res.status === 404) throw new Error("not_found");
    if (res.status === 403 || res.status === 401) throw new Error("private");
    if (!res.ok) throw new Error("api_error");
    const data: GitHubIssue[] = await res.json();
    // Filter out pull requests (GitHub API includes PRs in /issues)
    const issues = data.filter((i) => !("pull_request" in i));
    allIssues.push(...issues);
    if (data.length < 100) break;
  }
  return allIssues;
}

function analyzeIssues(issues: GitHubIssue[], owner: string, repo: string): AnalysisResult {
  const counts: Record<string, number> = {};
  for (const issue of issues) {
    for (const label of issue.labels) {
      const key = label.name.toLowerCase();
      if (LABEL_CATEGORIES[key]) {
        counts[key] = (counts[key] ?? 0) + 1;
      }
    }
  }

  const byCategory = Object.entries(counts)
    .map(([key, count]) => ({
      key,
      count,
      hours: count * (LABEL_CATEGORIES[key]?.hoursEach ?? 0),
    }))
    .sort((a, b) => b.count - a.count);

  const totalMatchingIssues = byCategory.reduce((s, c) => s + c.count, 0);
  const totalHours = byCategory.reduce((s, c) => s + c.hours, 0);
  const totalCost = totalHours * DEV_HOURLY_RATE;

  return {
    repo: `${owner}/${repo}`,
    totalOpen: issues.length,
    byCategory,
    totalMatchingIssues,
    totalHours,
    totalCost,
  };
}

function fmt(n: number) {
  return "$" + Math.round(n).toLocaleString("en-US");
}

function StatCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: string;
}) {
  return (
    <div
      style={{
        background: "var(--bg)",
        border: `1px solid ${accent ? accent : "var(--border)"}`,
        borderRadius: 10,
        padding: "20px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      <p
        style={{
          fontSize: 12,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.07em",
          color: "var(--muted)",
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontSize: 36,
          fontWeight: 800,
          lineHeight: 1.1,
          color: accent ?? "var(--text)",
        }}
      >
        {value}
      </p>
      {sub && <p style={{ fontSize: 13, color: "var(--muted)" }}>{sub}</p>}
    </div>
  );
}

export default function AnalyzeClient() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);

    const parsed = parseRepoUrl(url);
    if (!parsed) {
      setError("Enter a valid GitHub repo URL (e.g. github.com/owner/repo).");
      return;
    }

    setLoading(true);
    try {
      const issues = await fetchIssues(parsed.owner, parsed.repo);
      const analysis = analyzeIssues(issues, parsed.owner, parsed.repo);
      setResult(analysis);
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "api_error";
      if (msg === "not_found") {
        setError("Repo not found — is it public? Double-check the URL.");
      } else if (msg === "private") {
        setError("This looks like a private repo. Connect your GitHub account during your free trial to analyze private repos.");
      } else {
        setError("GitHub API error. Try again in a moment.");
      }
    } finally {
      setLoading(false);
    }
  }

  const ctaUrl = result
    ? `/register?repo=${encodeURIComponent(result.repo)}`
    : "/register";

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      {/* Input form */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <input
            className="form-input"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="github.com/owner/repo"
            disabled={loading}
            style={{ flex: 1, minWidth: 240, fontSize: 16, padding: "12px 16px" }}
            autoFocus
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading || !url.trim()}
            style={{ padding: "12px 28px", fontSize: 16, whiteSpace: "nowrap" }}
          >
            {loading ? "Analyzing…" : "Analyze backlog"}
          </button>
        </div>
        {error && <p className="form-error">{error}</p>}
      </form>

      {/* Loading skeleton */}
      {loading && (
        <div style={{ marginTop: 48, textAlign: "center", color: "var(--muted)" }}>
          <div
            style={{
              width: 40,
              height: 40,
              border: "3px solid var(--border)",
              borderTopColor: "var(--accent)",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
              margin: "0 auto 16px",
            }}
          />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <p>Fetching open issues from GitHub…</p>
        </div>
      )}

      {/* Results */}
      {result && !loading && (
        <div ref={resultsRef} style={{ marginTop: 48, display: "flex", flexDirection: "column", gap: 24 }}>
          <div>
            <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 4 }}>Results for</p>
            <p style={{ fontWeight: 700, fontSize: 20, fontFamily: "var(--mono)" }}>{result.repo}</p>
          </div>

          {/* Top stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
            <StatCard
              label="Open issues"
              value={result.totalOpen.toString()}
              sub="fetched from GitHub API"
            />
            <StatCard
              label="AgentFlow can handle"
              value={result.totalMatchingIssues.toString()}
              sub="matching issues"
              accent="var(--accent)"
            />
            <StatCard
              label="Estimated hours saved"
              value={`${Math.round(result.totalHours)}h`}
              sub="per month"
              accent="var(--green)"
            />
            <StatCard
              label="Estimated cost saved"
              value={fmt(result.totalCost)}
              sub={`at $${DEV_HOURLY_RATE}/hr`}
              accent="var(--green)"
            />
          </div>

          {/* By category */}
          {result.byCategory.length > 0 ? (
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                padding: "24px 28px",
              }}
            >
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.07em",
                  color: "var(--muted)",
                  marginBottom: 20,
                }}
              >
                Issue breakdown
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {result.byCategory.map(({ key, count, hours }) => {
                  const cat = LABEL_CATEGORIES[key];
                  if (!cat) return null;
                  const pct = result.totalMatchingIssues > 0 ? (count / result.totalMatchingIssues) * 100 : 0;
                  return (
                    <div key={key} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              background: cat.color,
                              display: "inline-block",
                              flexShrink: 0,
                            }}
                          />
                          <span style={{ fontSize: 14, fontWeight: 500 }}>{cat.label}</span>
                        </div>
                        <span style={{ fontSize: 14, color: "var(--muted)" }}>
                          {count} issue{count !== 1 ? "s" : ""} · {hours}h
                        </span>
                      </div>
                      <div style={{ background: "var(--border)", borderRadius: 4, height: 6, overflow: "hidden" }}>
                        <div
                          style={{
                            background: cat.color,
                            height: "100%",
                            width: `${pct}%`,
                            borderRadius: 4,
                            transition: "width 0.6s ease",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                padding: "24px 28px",
                color: "var(--muted)",
                fontSize: 15,
              }}
            >
              No issues with AgentFlow-compatible labels found (bug, documentation, enhancement, etc.). AgentFlow can still work on unlabeled issues — connect your repo to try.
            </div>
          )}

          {/* CTA */}
          <div
            style={{
              background: "rgba(99,102,241,0.08)",
              border: "1px solid rgba(99,102,241,0.3)",
              borderRadius: 12,
              padding: "28px 32px",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
              AgentFlow can close {result.totalMatchingIssues} of these issues
            </p>
            <p style={{ color: "var(--muted)", marginBottom: 24, fontSize: 15 }}>
              Agents read the issue, write the code, open a PR, and close the ticket — automatically.
              Start your free trial and connect{" "}
              <span style={{ fontFamily: "var(--mono)", color: "var(--accent)" }}>{result.repo}</span> in minutes.
            </p>
            <Link href={ctaUrl} className="btn btn-primary btn-lg" style={{ display: "inline-flex" }}>
              Start free trial — connect this repo
            </Link>
            <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 12 }}>
              14-day free trial · No credit card required
            </p>
          </div>

          {/* Share */}
          <div style={{ textAlign: "center" }}>
            <button
              className="btn btn-secondary"
              style={{ fontSize: 14, padding: "8px 18px" }}
              onClick={() => {
                const text = `My GitHub repo ${result.repo} has ${result.totalOpen} open issues. AgentFlow says it can handle ${result.totalMatchingIssues} of them and save ~${Math.round(result.totalHours)}h/mo. Free analyzer:`;
                const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent("https://agentflow.ai/analyze")}`;
                window.open(twitterUrl, "_blank", "noopener,noreferrer");
              }}
            >
              Share on X (Twitter)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
