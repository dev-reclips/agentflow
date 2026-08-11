"use client";
import { useState, useRef, useEffect, useCallback } from "react";
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
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
const IS_STATIC_EXPORT = !process.env.NEXT_PUBLIC_API_URL;
const FORMSPREE_FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID ?? "";
const FALLBACK_EMAIL = "dev@reclips.ai";

const DEMO_RESULT: AnalysisResult = {
  repo: "vercel/next.js",
  totalOpen: 2847,
  byCategory: [
    { key: "bug", count: 412, hours: 1236 },
    { key: "enhancement", count: 287, hours: 1148 },
    { key: "good first issue", count: 89, hours: 178 },
    { key: "documentation", count: 156, hours: 156 },
    { key: "help wanted", count: 64, hours: 256 },
  ],
  totalMatchingIssues: 1008,
  totalHours: 2974,
  totalCost: 297400,
};

interface GitHubIssue {
  number: number;
  title: string;
  labels: { name: string }[];
}

export interface AnalysisResult {
  repo: string;
  totalOpen: number;
  byCategory: { key: string; count: number; hours: number }[];
  totalMatchingIssues: number;
  totalHours: number;
  totalCost: number;
}

function parseRepoUrl(input: string): { owner: string; repo: string } | null {
  const trimmed = input.trim().replace(/\/$/, "");
  const match = trimmed.match(/github\.com\/([^/]+)\/([^/\s]+)/);
  if (match && match[1] && match[2]) return { owner: match[1], repo: match[2].replace(/\.git$/, "") };
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
    if (res.status === 429 || (res.status === 403 && res.headers.get("X-RateLimit-Remaining") === "0")) throw new Error("rate_limit");
    if (res.status === 403 || res.status === 401) throw new Error("private");
    if (!res.ok) throw new Error("api_error");
    const data: GitHubIssue[] = await res.json();
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

async function persistResult(result: AnalysisResult): Promise<string | null> {
  try {
    const res = await fetch(`${API_URL}/analyze/results`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ repo: result.repo, result }),
    });
    if (!res.ok) return null;
    const data = await res.json() as { id: string };
    return data.id;
  } catch {
    return null;
  }
}

async function captureLead(email: string, resultId: string, result: AnalysisResult, skipped: boolean) {
  try {
    await fetch(`${API_URL}/analyze/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        resultId,
        repo: result.repo,
        totalCost: result.totalCost,
        skipped,
      }),
    });
  } catch {
    // fire-and-forget
  }
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

function ResultsDisplay({ result, resultId, fromQueryParam, isDemo }: { result: AnalysisResult; resultId: string | null; fromQueryParam?: boolean; isDemo?: boolean }) {
  const [copied, setCopied] = useState(false);
  const [copiedQueryLink, setCopiedQueryLink] = useState(false);
  const ctaUrl = IS_STATIC_EXPORT ? `/book-demo` : `/register?repo=${encodeURIComponent(result.repo)}`;
  const shareUrl = resultId ? `${typeof window !== "undefined" ? window.location.origin : "https://agentflow.ai"}/analyze/results/${resultId}` : null;
  const queryParamUrl = `${typeof window !== "undefined" ? window.location.origin : "https://agentflow.ai"}/analyze?repo=${encodeURIComponent(result.repo)}`;

  function handleCopyLink() {
    if (!shareUrl) return;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleCopyQueryLink() {
    navigator.clipboard.writeText(queryParamUrl).then(() => {
      setCopiedQueryLink(true);
      setTimeout(() => setCopiedQueryLink(false), 2000);
    });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {isDemo && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            background: "rgba(245,158,11,0.08)",
            border: "1px solid rgba(245,158,11,0.35)",
            borderRadius: 10,
            padding: "12px 20px",
          }}
        >
          <p style={{ fontSize: 14, color: "#d97706", fontWeight: 500 }}>
            This is a demo result for{" "}
            <span style={{ fontFamily: "var(--mono)", fontWeight: 700 }}>vercel/next.js</span>.
            {" "}Paste your own repo above to see your real numbers.
          </p>
          <Link href={IS_STATIC_EXPORT ? "/book-demo" : "/register"} className="btn btn-primary" style={{ fontSize: 13, padding: "6px 14px", whiteSpace: "nowrap" }}>
            {IS_STATIC_EXPORT ? "Book a demo →" : "Connect your repo after sign-up →"}
          </Link>
        </div>
      )}
      {fromQueryParam && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            background: "rgba(99,102,241,0.08)",
            border: "1px solid rgba(99,102,241,0.3)",
            borderRadius: 10,
            padding: "12px 20px",
          }}
        >
          <p style={{ fontSize: 14, color: "var(--accent)", fontWeight: 500 }}>
            Analysis pre-loaded for{" "}
            <span style={{ fontFamily: "var(--mono)", fontWeight: 700 }}>{result.repo}</span>
          </p>
          <button
            className="btn btn-secondary"
            style={{ fontSize: 13, padding: "6px 14px", whiteSpace: "nowrap" }}
            onClick={handleCopyQueryLink}
          >
            {copiedQueryLink ? "Copied!" : "Copy shareable link"}
          </button>
        </div>
      )}

      <div>
        <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 4 }}>Results for</p>
        <p style={{ fontWeight: 700, fontSize: 20, fontFamily: "var(--mono)" }}>{result.repo}</p>
      </div>

      {(() => {
        const zeroMatch = result.totalMatchingIssues === 0 && result.totalOpen > 0;
        const estHandled = zeroMatch ? Math.round(result.totalOpen * 0.3) : result.totalMatchingIssues;
        const estHours = zeroMatch ? estHandled * 2 : result.totalHours;
        const estCost = zeroMatch ? estHours * DEV_HOURLY_RATE : result.totalCost;
        return (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
            <StatCard label="Open issues" value={result.totalOpen.toString()} sub="fetched from GitHub API" />
            <StatCard label="AgentFlow can handle" value={zeroMatch ? `~${estHandled}` : result.totalMatchingIssues.toString()} sub={zeroMatch ? "estimated (unlabeled repo)" : "matching issues"} accent="var(--accent)" />
            <StatCard label="Estimated hours saved" value={`${Math.round(estHours)}h`} sub="per month" accent="var(--green)" />
            <StatCard label="Estimated cost saved" value={fmt(estCost)} sub={`at $${DEV_HOURLY_RATE}/hr`} accent="var(--green)" />
          </div>
        );
      })()}

      {result.byCategory.length > 0 ? (
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "24px 28px" }}>
          <p style={{ fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--muted)", marginBottom: 20 }}>
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
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: cat.color, display: "inline-block", flexShrink: 0 }} />
                      <span style={{ fontSize: 14, fontWeight: 500 }}>{cat.label}</span>
                    </div>
                    <span style={{ fontSize: 14, color: "var(--muted)" }}>
                      {count} issue{count !== 1 ? "s" : ""} · {hours}h
                    </span>
                  </div>
                  <div style={{ background: "var(--border)", borderRadius: 4, height: 6, overflow: "hidden" }}>
                    <div style={{ background: cat.color, height: "100%", width: `${pct}%`, borderRadius: 4, transition: "width 0.6s ease" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "24px 28px", color: "var(--muted)", fontSize: 15 }}>
          No issues with AgentFlow-compatible labels found (bug, documentation, enhancement, etc.). AgentFlow can still work on unlabeled issues — connect your repo to try.
        </div>
      )}

      <div style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: 12, padding: "28px 32px", textAlign: "center" }}>
        <p style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
          {result.totalMatchingIssues > 0
            ? `AgentFlow can close ${result.totalMatchingIssues} of these issues`
            : `AgentFlow can close ~${Math.round(result.totalOpen * 0.3)} of these issues`}
        </p>
        <p style={{ color: "var(--muted)", marginBottom: 24, fontSize: 15 }}>
          Agents read the issue, write the code, open a PR, and close the ticket — automatically.
          {IS_STATIC_EXPORT ? (
            <> Book a 20-minute demo and we&apos;ll run one live on <span style={{ fontFamily: "var(--mono)", color: "var(--accent)" }}>{result.repo}</span>.</>
          ) : (
            <> Start your free trial and connect <span style={{ fontFamily: "var(--mono)", color: "var(--accent)" }}>{result.repo}</span> in minutes.</>
          )}
        </p>
        <Link href={ctaUrl} className="btn btn-primary btn-lg" style={{ display: "inline-flex" }}>
          {IS_STATIC_EXPORT ? "Book a demo — close these issues" : "Start free trial — connect this repo"}
        </Link>
        <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 12 }}>
          {IS_STATIC_EXPORT ? "Free · 20 minutes · No commitment" : "14-day free trial · No credit card required"}
        </p>
      </div>

      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        {shareUrl ? (
          <button
            className="btn btn-primary"
            style={{ fontSize: 14, padding: "8px 18px" }}
            onClick={handleCopyLink}
          >
            {copied ? "Link copied!" : "Share this analysis"}
          </button>
        ) : (
          <button
            className="btn btn-primary"
            style={{ fontSize: 14, padding: "8px 18px" }}
            onClick={handleCopyQueryLink}
          >
            {copiedQueryLink ? "Copied!" : "Copy shareable link"}
          </button>
        )}
        <button
          className="btn btn-secondary"
          style={{ fontSize: 14, padding: "8px 18px" }}
          onClick={() => {
            const agentHandled = result.totalMatchingIssues > 0 ? result.totalMatchingIssues : Math.round(result.totalOpen * 0.3);
            const text = `My GitHub repo ${result.repo} has ${result.totalOpen} open issues. AgentFlow says it can auto-close ~${agentHandled} of them. Free analyzer:`;
            const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl ?? queryParamUrl)}`;
            window.open(twitterUrl, "_blank", "noopener,noreferrer");
          }}
        >
          Share on X (Twitter)
        </button>
      </div>
    </div>
  );
}

export default function AnalyzeClient({ initialResult, initialResultId, initialRepo, demoMode }: { initialResult?: AnalysisResult; initialResultId?: string; initialRepo?: string; demoMode?: boolean }) {
  const [url, setUrl] = useState(initialRepo ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // gate states
  const [pendingResult, setPendingResult] = useState<AnalysisResult | null>(null);
  const [pendingResultId, setPendingResultId] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [submittingEmail, setSubmittingEmail] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  // final shown result
  const [result, setResult] = useState<AnalysisResult | null>(initialResult ?? (demoMode ? DEMO_RESULT : null));
  const [resultId, setResultId] = useState<string | null>(initialResultId ?? null);
  const [fromQueryParam, setFromQueryParam] = useState(false);
  const [isDemo, setIsDemo] = useState(demoMode ?? false);

  const resultsRef = useRef<HTMLDivElement>(null);
  const didAutoSubmit = useRef(false);

  const runAnalysis = useCallback(async (repoInput: string) => {
    setError(null);
    setPendingResult(null);

    const parsed = parseRepoUrl(repoInput);
    if (!parsed) {
      setError("Enter a valid GitHub repo URL (e.g. github.com/owner/repo).");
      return;
    }

    setLoading(true);
    try {
      const issues = await fetchIssues(parsed.owner, parsed.repo);
      const analysis = analyzeIssues(issues, parsed.owner, parsed.repo);
      const id = await persistResult(analysis);
      // On static export with no Formspree, skip the email gate — show results directly
      if (IS_STATIC_EXPORT && !FORMSPREE_FORM_ID) {
        setIsDemo(false);
        setResult(analysis);
        setResultId(id);
        setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
      } else {
        setPendingResult(analysis);
        setPendingResultId(id);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "api_error";
      if (msg === "not_found") {
        setError("Repo not found — is it public? Double-check the URL.");
      } else if (msg === "rate_limit") {
        setError("GitHub rate limit reached — try again in a minute, or sign up for a free trial to skip limits.");
      } else if (msg === "private") {
        setError("This looks like a private repo. Connect your GitHub account during your free trial to analyze private repos.");
      } else {
        setError("GitHub API error. Try again in a moment.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // For static export: read ?repo= from URL on the client (server searchParams unavailable)
  useEffect(() => {
    if (didAutoSubmit.current) return;
    const repoParam = typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("repo") ?? ""
      : (initialRepo ?? "");
    const candidate = repoParam || initialRepo || "";
    if (!candidate || !/^[^/\s]+\/[^/\s]+$/.test(candidate.trim())) return;
    didAutoSubmit.current = true;
    setUrl(candidate.trim());
    setFromQueryParam(true);
    const timer = setTimeout(() => runAnalysis(candidate.trim()), 500);
    return () => clearTimeout(timer);
  }, [initialRepo, runAnalysis]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await runAnalysis(url);
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!pendingResult) return;
    const trimmed = emailInput.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setEmailError("Enter a valid work email.");
      return;
    }
    setSubmittingEmail(true);

    if (IS_STATIC_EXPORT) {
      if (FORMSPREE_FORM_ID) {
        try {
          const res = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({ email: trimmed, repo: pendingResult.repo, totalCost: pendingResult.totalCost }),
          });
          if (!res.ok) {
            setEmailError("Something went wrong. Please try again.");
            setSubmittingEmail(false);
            return;
          }
        } catch {
          setEmailError("Something went wrong. Please try again.");
          setSubmittingEmail(false);
          return;
        }
        setEmailSubmitted(true);
      }
    } else {
      if (pendingResultId) {
        await captureLead(trimmed, pendingResultId, pendingResult, false);
      }
    }

    setIsDemo(false);
    setResult(pendingResult);
    setResultId(pendingResultId);
    setPendingResult(null);
    setSubmittingEmail(false);
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  }

  async function handleSkip() {
    if (!pendingResult) return;
    if (pendingResultId) {
      await captureLead("anonymous@skip", pendingResultId, pendingResult, true);
    }
    setIsDemo(false);
    setResult(pendingResult);
    setResultId(pendingResultId);
    setPendingResult(null);
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  }

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      {(!result || isDemo) && !pendingResult && (
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
      )}

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
          <p>Analyzing your backlog…</p>
        </div>
      )}

      {pendingResult && !loading && (
        <div style={{ marginTop: 48 }}>
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 16,
              padding: "40px 32px",
              maxWidth: 480,
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 16 }}>✓</div>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Your analysis is ready</h2>
            <p style={{ color: "var(--muted)", fontSize: 15, marginBottom: 28 }}>
              Enter your work email to see the full breakdown for{" "}
              <span style={{ fontFamily: "var(--mono)", color: "var(--accent)" }}>{pendingResult.repo}</span>.
            </p>
            {IS_STATIC_EXPORT && !FORMSPREE_FORM_ID ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
                <a
                  href={`mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent(`AgentFlow early access — ${pendingResult.repo}`)}`}
                  className="btn btn-primary"
                  style={{ padding: "12px 28px", fontSize: 16, display: "inline-block" }}
                  onClick={() => {
                    setIsDemo(false);
                    setResult(pendingResult);
                    setResultId(pendingResultId);
                    setPendingResult(null);
                  }}
                >
                  Email us for early access
                </a>
                <p style={{ fontSize: 13, color: "var(--muted)" }}>
                  {FALLBACK_EMAIL}
                </p>
                <button
                  onClick={handleSkip}
                  style={{ marginTop: 4, background: "none", border: "none", color: "var(--muted)", fontSize: 13, cursor: "pointer", textDecoration: "underline" }}
                >
                  Skip — just show me the results
                </button>
              </div>
            ) : (
              <>
                <form onSubmit={handleEmailSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <input
                    className="form-input"
                    type="email"
                    value={emailInput}
                    onChange={(e) => { setEmailInput(e.target.value); setEmailError(null); }}
                    placeholder="you@company.com"
                    disabled={submittingEmail}
                    style={{ fontSize: 15, padding: "12px 16px", textAlign: "center" }}
                    autoFocus
                  />
                  {emailError && <p className="form-error">{emailError}</p>}
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={submittingEmail || !emailInput.trim()}
                    style={{ padding: "12px 28px", fontSize: 16 }}
                  >
                    {submittingEmail ? "Loading…" : "Show results"}
                  </button>
                </form>
                <button
                  onClick={handleSkip}
                  style={{
                    marginTop: 12,
                    background: "none",
                    border: "none",
                    color: "var(--muted)",
                    fontSize: 13,
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Skip — just show me the results
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {result && !loading && (
        <div ref={resultsRef} style={{ marginTop: 48, display: "flex", flexDirection: "column", gap: 20 }}>
          {emailSubmitted && (
            <div style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: 10, padding: "12px 20px" }}>
              <p style={{ fontSize: 14, color: "#16a34a", fontWeight: 500 }}>
                Thanks! We will reach out within 24 hours.
              </p>
            </div>
          )}
          <ResultsDisplay result={result} resultId={resultId} fromQueryParam={fromQueryParam} isDemo={isDemo} />
        </div>
      )}
    </div>
  );
}
