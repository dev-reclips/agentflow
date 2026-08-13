import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AgentFlow vs GitHub Copilot Workspace: Always-On Agent vs Session Tool",
  description:
    "Copilot Workspace requires a new task description and an active session. AgentFlow works on any backlog issue, opens real PRs, and runs 24/7 in your GitHub workflow.",
  openGraph: {
    title: "AgentFlow vs GitHub Copilot Workspace: Always-On Agent vs Session Tool",
    description:
      "Copilot Workspace requires a new task description and an active session. AgentFlow works on any backlog issue, opens real PRs, and runs 24/7 in your GitHub workflow.",
    url: "https://agentflow.ai/vs/copilot-workspace",
    siteName: "AgentFlow",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AgentFlow vs GitHub Copilot Workspace" }],
    type: "website",
  },
  alternates: {
    canonical: "https://agentflow.ai/vs/copilot-workspace",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "AgentFlow vs GitHub Copilot Workspace",
  description:
    "Copilot Workspace requires a new task description and an active session. AgentFlow works on any backlog issue, opens real PRs, and runs 24/7 in your GitHub workflow.",
  url: "https://agentflow.ai/vs/copilot-workspace",
};

export default function VsCopilotWorkspacePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="nav">
        <div className="container nav-inner">
          <Link href="/" className="nav-logo" style={{ textDecoration: "none" }}>
            AgentFlow
          </Link>
          <div className="nav-links">
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
          <div className="container" style={{ maxWidth: "800px" }}>
            <div className="hero-badge">Comparison</div>
            <h1 className="hero-title" style={{ fontSize: "clamp(24px, 3.5vw, 44px)", lineHeight: 1.2 }}>
              AgentFlow vs GitHub Copilot Workspace
            </h1>
            <p className="hero-sub" style={{ maxWidth: "640px", margin: "16px auto 0" }}>
              Copilot Workspace is a session-based coding tool that starts from a new task description. AgentFlow is an always-on agent that works your existing backlog, opens real PRs, and integrates with your CI/CD — no active session required.
            </p>
          </div>
        </section>

        {/* Comparison table */}
        <section style={{ paddingBottom: "72px" }}>
          <div className="container" style={{ maxWidth: "800px" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "15px",
                color: "var(--muted)",
              }}>
                <thead>
                  <tr>
                    <th style={{
                      textAlign: "left",
                      padding: "12px 16px",
                      borderBottom: "1px solid #222230",
                      color: "var(--text)",
                      fontWeight: 600,
                      width: "40%",
                    }}>
                      Feature
                    </th>
                    <th style={{
                      textAlign: "center",
                      padding: "12px 16px",
                      borderBottom: "1px solid #222230",
                      color: "var(--accent)",
                      fontWeight: 600,
                      width: "30%",
                    }}>
                      AgentFlow
                    </th>
                    <th style={{
                      textAlign: "center",
                      padding: "12px 16px",
                      borderBottom: "1px solid #222230",
                      color: "var(--text)",
                      fontWeight: 600,
                      width: "30%",
                    }}>
                      Copilot Workspace
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      feature: "Works on existing backlog issues",
                      agentflow: "Yes",
                      competitor: "No — requires new task description",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "Opens real PRs in your repo",
                      agentflow: "Yes",
                      competitor: "No — creates workspaces requiring manual file copy",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "Always-on / async operation",
                      agentflow: "Yes",
                      competitor: "No — session-based, requires active user",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "CI/CD integration",
                      agentflow: "Yes",
                      competitor: "No — standalone tool",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "Multi-agent orchestration",
                      agentflow: "Yes",
                      competitor: "No (single assistant)",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "Real-time dashboard",
                      agentflow: "Yes",
                      competitor: "No",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "Pricing",
                      agentflow: "$499–$1,499/mo",
                      competitor: "Included with Copilot Enterprise (~$39/user/mo)",
                      agentflowHighlight: false,
                    },
                    {
                      feature: "GitHub-native workflow",
                      agentflow: "Yes",
                      competitor: "Partial",
                      agentflowHighlight: true,
                    },
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #1a1a28" }}>
                      <td style={{ padding: "14px 16px", color: "var(--text)", fontWeight: 500 }}>
                        {row.feature}
                      </td>
                      <td style={{
                        padding: "14px 16px",
                        textAlign: "center",
                        color: row.agentflowHighlight ? "var(--accent)" : "var(--muted)",
                        fontWeight: row.agentflowHighlight ? 600 : 400,
                      }}>
                        {row.agentflow}
                      </td>
                      <td style={{ padding: "14px 16px", textAlign: "center", color: "var(--muted)" }}>
                        {row.competitor}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Key differentiators */}
        <section className="features" style={{ paddingTop: "0" }}>
          <div className="container" style={{ maxWidth: "800px" }}>
            <p className="section-label">Why teams choose AgentFlow</p>
            <h2 className="section-title">The fundamental difference</h2>
            <div className="steps-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
              <div className="step-card">
                <h3 className="feature-title" style={{ fontSize: "16px" }}>Your backlog, not a blank canvas</h3>
                <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.7, marginTop: "12px" }}>
                  Copilot Workspace starts from a new task you describe from scratch. AgentFlow picks up issues directly from your GitHub backlog — no re-describing work that already exists.
                </p>
              </div>
              <div className="step-card">
                <h3 className="feature-title" style={{ fontSize: "16px" }}>Real PRs, not workspaces</h3>
                <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.7, marginTop: "12px" }}>
                  Copilot Workspace produces a "workspace" that engineers must manually copy into their repo. AgentFlow opens a real pull request — reviewable and mergeable the same day it runs.
                </p>
              </div>
              <div className="step-card">
                <h3 className="feature-title" style={{ fontSize: "16px" }}>Async by default</h3>
                <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.7, marginTop: "12px" }}>
                  Copilot Workspace requires an engineer to be present in an active session. AgentFlow runs overnight, on weekends, and across time zones — shipping progress while your team sleeps.
                </p>
              </div>
              <div className="step-card">
                <h3 className="feature-title" style={{ fontSize: "16px" }}>Built into your CI/CD</h3>
                <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.7, marginTop: "12px" }}>
                  Copilot Workspace is a standalone browser tool. AgentFlow hooks into your existing pipeline — tests run, checks pass, and nothing merges without your green light.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How AgentFlow resolves an issue */}
        <section style={{ paddingBottom: "72px" }}>
          <div className="container" style={{ maxWidth: "720px" }}>
            <p className="section-label" style={{ textAlign: "left" }}>How it works</p>
            <h2 className="section-title" style={{ textAlign: "left", fontSize: "clamp(20px, 2.5vw, 28px)" }}>
              How AgentFlow handles your sprint backlog
            </h2>
            <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "24px" }}>
              {[
                {
                  step: "1",
                  title: "Triage",
                  desc: "AgentFlow's triage agent reads new issues as they land, labels them, estimates complexity, and routes them to the right agent — automatically.",
                },
                {
                  step: "2",
                  title: "Implement",
                  desc: "A coding agent pulls context from your repo, writes the fix, and runs your existing tests — all inside your real codebase, not a workspace.",
                },
                {
                  step: "3",
                  title: "Review",
                  desc: "A review agent checks the diff for correctness and style before a PR is opened. Your engineers review AI work the same way they review a teammate's PR.",
                },
                {
                  step: "4",
                  title: "Merge and close",
                  desc: "Merge when satisfied. The issue closes, the backlog shrinks, and your team stays focused on the work only humans can do.",
                },
              ].map((item) => (
                <div key={item.step} style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                  <div className="step-num" style={{ flexShrink: 0 }}>{item.step}</div>
                  <div>
                    <h3 style={{ color: "var(--text)", fontWeight: 600, fontSize: "16px", marginBottom: "6px" }}>
                      {item.title}
                    </h3>
                    <p style={{ color: "var(--muted)", fontSize: "15px", lineHeight: 1.7, margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Analyze CTA */}
        <section style={{ paddingBottom: "48px" }}>
          <div className="container" style={{ maxWidth: "720px" }}>
            <div style={{
              background: "var(--card-bg, #13131f)",
              border: "1px solid #222230",
              borderRadius: "12px",
              padding: "32px",
              textAlign: "center",
            }}>
              <h2 style={{ fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 700, marginBottom: "12px" }}>
                See how AgentFlow handles your backlog
              </h2>
              <p style={{ color: "var(--muted)", fontSize: "15px", marginBottom: "24px" }}>
                Paste your GitHub repo URL and get an instant breakdown of which issues AgentFlow can resolve today.
              </p>
              <Link
                href="/analyze?repo=https://github.com/"
                className="btn btn-primary btn-lg"
              >
                Analyze my repo →
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-box">
              <h2 className="cta-title">Start your 14-day free trial</h2>
              <p className="cta-sub">
                Connect your GitHub repo in 10 minutes. No credit card required.
              </p>
              <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/register" className="btn btn-primary btn-lg">
                  Get started free →
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
            <a href="/security">Security & Privacy</a> ·{" "}
            <a href="/vs/github-copilot">AgentFlow vs Copilot</a> ·{" "}
            <a href="/vs/copilot-workspace">AgentFlow vs Copilot Workspace</a> ·{" "}
            <a href="/vs/sweep">AgentFlow vs Sweep</a> ·{" "}
            <a href="/vs/devin">AgentFlow vs Devin</a> ·{" "}
            <a href="/vs/cursor">AgentFlow vs Cursor</a> ·{" "}
            <a href="/vs/coderabbit">AgentFlow vs CodeRabbit</a> ·{" "}
            <a href="/vs/tabnine">AgentFlow vs Tabnine</a> ·{" "}
            <a href="/vs/amazon-q">AgentFlow vs Amazon Q</a> ·{" "}
            <a href="/vs/aider">AgentFlow vs Aider</a> ·{" "}
            <a href="/vs/linear">AgentFlow vs Linear</a> ·{" "}
            <a href="/vs/jira">AgentFlow vs Jira</a>
          </p>
        </div>
      </footer>
    </>
  );
}
