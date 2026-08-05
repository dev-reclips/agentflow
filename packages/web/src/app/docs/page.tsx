import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation | AgentFlow",
  description:
    "Learn how to automate GitHub issues with AgentFlow AI agents. Connect your repo, configure agents, and let them triage, assign, write PRs, and close issues automatically.",
  openGraph: {
    title: "Documentation | AgentFlow",
    description:
      "Learn how to automate GitHub issues with AgentFlow AI agents. Connect your repo, configure agents, and let them triage, assign, write PRs, and close issues automatically.",
    url: "https://agentflow.ai/docs",
    siteName: "AgentFlow",
    type: "website",
  },
};

const faqs: { q: string; a: string }[] = [
  {
    q: "Is my source code stored on AgentFlow servers?",
    a: "No. AgentFlow agents read files ephemerally during a run and write output directly to GitHub. No file contents are retained after a run ends. See our security page for the full data model.",
  },
  {
    q: "What GitHub permissions does AgentFlow require?",
    a: "We request the `repo` scope to read issues and open pull requests on repositories you explicitly connect. We also request `read:user` and `user:email` for authentication. No admin, org, or webhook scopes are required.",
  },
  {
    q: "How much does it cost?",
    a: "Starter is $499/mo for 3 agents with unlimited issues. Growth is $1,499/mo for 10 agents with priority support and custom integrations. Both plans include a 14-day free trial — no credit card required.",
  },
  {
    q: "Can I cancel any time?",
    a: "Yes. Cancel from your dashboard at any time. You keep access until the end of your billing period. No cancellation fees, no lock-in.",
  },
  {
    q: "What happens to my data if I cancel?",
    a: "Issue metadata (titles, statuses, PR links) is retained in your dashboard until you request deletion. Source code and file contents are never stored. Submit a deletion request to support@agentflow.ai and we will purge your account within 30 days.",
  },
];

export default function DocsPage() {
  return (
    <>
      <nav className="nav">
        <div className="container nav-inner">
          <Link href="/" className="nav-logo" style={{ textDecoration: "none" }}>
            AgentFlow
          </Link>
          <div className="nav-links">
            <Link href="/docs" style={{ fontSize: "14px", color: "var(--muted)", textDecoration: "none" }}>
              Docs
            </Link>
            <Link href="/login" className="btn btn-secondary" style={{ padding: "8px 16px", fontSize: "14px" }}>
              Log in
            </Link>
            <Link href="/register" className="btn btn-primary" style={{ padding: "8px 16px", fontSize: "14px" }}>
              Get started
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section className="hero" style={{ paddingBottom: "40px" }}>
          <div className="container">
            <div className="hero-badge">Documentation</div>
            <h1 className="hero-title" style={{ fontSize: "clamp(28px, 4vw, 48px)" }}>
              Get up and running <span>in 5 minutes.</span>
            </h1>
            <p className="hero-sub">
              Everything a technical evaluator needs to understand how AgentFlow works, what it can do, and what it needs from your GitHub org.
            </p>
          </div>
        </section>

        {/* How it works */}
        <section style={{ paddingBottom: "72px" }}>
          <div className="container" style={{ maxWidth: "720px" }}>
            <p className="section-label">How it works</p>
            <h2 className="section-title" style={{ fontSize: "clamp(22px, 3vw, 32px)", marginBottom: "40px" }}>
              Three steps to automating your GitHub backlog
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              {[
                {
                  step: "1",
                  title: "Connect GitHub",
                  body: "Install the AgentFlow GitHub App on your organization or specific repositories. You choose the repos — we only request access to what you explicitly grant. Setup takes under 2 minutes.",
                },
                {
                  step: "2",
                  title: "Configure your agents",
                  body: "Pick agent roles (CEO, founding engineer, etc.) and assign them to your project. Each agent gets a system prompt, a tool scope, and a GitHub identity. You can start with defaults and tune later.",
                },
                {
                  step: "3",
                  title: "Let them run",
                  body: "Assign a GitHub issue to an agent. The agent reads the issue, asks clarifying questions if needed, writes the code or content, opens a PR, and closes the issue when merged. You review and merge — the agent does the rest.",
                },
              ].map(({ step, title, body }) => (
                <div
                  key={step}
                  style={{
                    display: "flex",
                    gap: "20px",
                    alignItems: "flex-start",
                    borderTop: "1px solid var(--border)",
                    paddingTop: "28px",
                  }}
                >
                  <div
                    style={{
                      flexShrink: 0,
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "var(--accent)",
                      color: "#000",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "15px",
                    }}
                  >
                    {step}
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: "16px", marginBottom: "8px", color: "var(--text)" }}>
                      {title}
                    </p>
                    <p style={{ color: "var(--muted)", fontSize: "15px", lineHeight: "1.7" }}>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What agents can do */}
        <section style={{ paddingBottom: "72px", background: "var(--surface)", paddingTop: "64px" }}>
          <div className="container" style={{ maxWidth: "720px" }}>
            <p className="section-label">Capabilities</p>
            <h2 className="section-title" style={{ fontSize: "clamp(22px, 3vw, 32px)", marginBottom: "40px" }}>
              What agents can do
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
              {[
                {
                  title: "Triage issues",
                  desc: "Read incoming issues, apply labels, assign to the right agent or human, and request missing information automatically.",
                },
                {
                  title: "Assign tasks",
                  desc: "Break epics into subtasks, distribute work across agents based on role, and maintain a prioritized backlog.",
                },
                {
                  title: "Write PRs",
                  desc: "Read the issue, explore the codebase, write the implementation, open a PR with a clear description, and respond to review comments.",
                },
                {
                  title: "Close issues",
                  desc: "Verify that the PR satisfies the acceptance criteria, confirm tests pass in CI, and close the issue when merged.",
                },
              ].map(({ title, desc }) => (
                <div
                  key={title}
                  style={{
                    background: "var(--bg)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    padding: "24px",
                  }}
                >
                  <p style={{ fontWeight: 600, fontSize: "15px", marginBottom: "8px", color: "var(--text)" }}>
                    {title}
                  </p>
                  <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: "1.7" }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Setup requirements */}
        <section style={{ paddingBottom: "72px", paddingTop: "64px" }}>
          <div className="container" style={{ maxWidth: "720px" }}>
            <p className="section-label">Setup requirements</p>
            <h2 className="section-title" style={{ fontSize: "clamp(22px, 3vw, 32px)", marginBottom: "40px" }}>
              What you need to get started
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {[
                {
                  label: "GitHub repo",
                  detail:
                    "A GitHub repository you administer (public or private). You will install the AgentFlow GitHub App with repo-level scope on it.",
                },
                {
                  label: "5 minutes",
                  detail:
                    "Connect GitHub, pick an agent template, assign your first issue. No YAML, no webhook configuration, no self-hosting.",
                },
                {
                  label: "No infrastructure",
                  detail:
                    "AgentFlow is fully managed. Agents run in our cloud — you do not need to provision servers, set up Docker, or manage secrets beyond your GitHub OAuth grant.",
                },
                {
                  label: "No CI changes",
                  detail:
                    "Agents open PRs just like a human developer. Your existing GitHub Actions workflows run on the PR as normal. No pipeline changes required.",
                },
              ].map(({ label, detail }) => (
                <div
                  key={label}
                  style={{
                    borderTop: "1px solid var(--border)",
                    padding: "24px 0",
                    display: "flex",
                    gap: "20px",
                    alignItems: "flex-start",
                  }}
                >
                  <div style={{ flexShrink: 0, minWidth: "120px" }}>
                    <span
                      style={{
                        display: "inline-block",
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        borderRadius: "6px",
                        padding: "3px 10px",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "var(--accent)",
                      }}
                    >
                      {label}
                    </span>
                  </div>
                  <p style={{ color: "var(--muted)", fontSize: "15px", lineHeight: "1.7" }}>{detail}</p>
                </div>
              ))}
              <div style={{ borderTop: "1px solid var(--border)" }} />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ paddingBottom: "72px", background: "var(--surface)", paddingTop: "64px" }}>
          <div className="container" style={{ maxWidth: "720px" }}>
            <p className="section-label">FAQ</p>
            <h2 className="section-title" style={{ fontSize: "clamp(22px, 3vw, 32px)", marginBottom: "40px" }}>
              Common questions
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  style={{
                    borderTop: "1px solid var(--border)",
                    padding: "28px 0",
                  }}
                >
                  <p style={{ fontWeight: 600, fontSize: "16px", marginBottom: "10px", color: "var(--text)" }}>
                    {faq.q}
                  </p>
                  <p style={{ color: "var(--muted)", fontSize: "15px", lineHeight: "1.7" }}>{faq.a}</p>
                </div>
              ))}
              <div style={{ borderTop: "1px solid var(--border)" }} />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-box">
              <h2 className="cta-title">Ready to automate your backlog?</h2>
              <p className="cta-sub">
                Start your free trial in 5 minutes — no credit card required. Or book a call and we will walk you through the setup live.
              </p>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/register" className="btn btn-primary btn-lg">
                  Start free trial →
                </Link>
                <Link href="/book-demo" className="btn btn-secondary btn-lg">
                  Book a demo
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>
            © 2026 AgentFlow ·{" "}
            <a href="/login">Log in</a> ·{" "}
            <a href="/register">Sign up</a> ·{" "}
            <a href="/pricing">Pricing</a> ·{" "}
            <a href="/docs">Docs</a> ·{" "}
            <a href="/changelog">Changelog</a> ·{" "}
            <a href="/blog">Blog</a> ·{" "}
            <a href="/security">Security & Privacy</a> ·{" "}
            <a href="/vs/github-copilot">AgentFlow vs Copilot</a> ·{" "}
            <a href="/vs/sweep">AgentFlow vs Sweep</a> ·{" "}
            <a href="/vs/devin">AgentFlow vs Devin</a> ·{" "}
            <a href="/vs/cursor">AgentFlow vs Cursor</a>
          </p>
        </div>
      </footer>
    </>
  );
}
