import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AgentFlow vs Jira — Close Your Backlog Instead of Managing It",
  description:
    "Jira is project management. AgentFlow is code execution. Jira shows you the backlog. AgentFlow closes it. See how many of your issues are agent-ready.",
  openGraph: {
    title: "AgentFlow vs Jira — Close Your Backlog Instead of Managing It",
    description:
      "Jira is project management. AgentFlow is code execution. Jira shows you the backlog. AgentFlow closes it. See how many of your issues are agent-ready.",
    url: "https://agentflow.ai/vs/jira",
    siteName: "AgentFlow",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AgentFlow vs Jira" }],
    type: "website",
  },
  alternates: {
    canonical: "https://agentflow.ai/vs/jira",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "AgentFlow vs Jira",
  description:
    "Jira is project management. AgentFlow is code execution. Jira shows you the backlog. AgentFlow closes it.",
  url: "https://agentflow.ai/vs/jira",
};

export default function VsJiraPage() {
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
              AgentFlow vs Jira
            </h1>
            <p className="hero-sub" style={{ maxWidth: "640px", margin: "16px auto 0" }}>
              Jira is project management. AgentFlow is code execution. Jira shows you the backlog. AgentFlow closes it.
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
                      Capability
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
                      Jira
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      feature: "Automatically closes issues with shipped PRs",
                      agentflow: "Yes",
                      competitor: "No",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "Project & sprint management",
                      agentflow: "No",
                      competitor: "Yes (industry standard)",
                      agentflowHighlight: false,
                    },
                    {
                      feature: "Writes and ships code from ticket descriptions",
                      agentflow: "Yes",
                      competitor: "No",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "GitHub-native issue resolution",
                      agentflow: "Yes",
                      competitor: "No",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "Multi-agent orchestration (triage → code → review)",
                      agentflow: "Yes",
                      competitor: "No",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "Works without a developer at the keyboard",
                      agentflow: "Yes",
                      competitor: "No",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "Roadmaps & dependency tracking",
                      agentflow: "No",
                      competitor: "Yes",
                      agentflowHighlight: false,
                    },
                    {
                      feature: "Pricing",
                      agentflow: "From $499/mo",
                      competitor: "From $8.15/user/mo",
                      agentflowHighlight: false,
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
            <p className="section-label">The real problem with Jira backlogs</p>
            <h2 className="section-title">Jira shows it. AgentFlow closes it.</h2>
            <div className="steps-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
              <div className="step-card">
                <h3 className="feature-title" style={{ fontSize: "16px" }}>80% of backlog dies there</h3>
                <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.7, marginTop: "12px" }}>
                  The average engineering team has hundreds of well-written Jira tickets that never get resolved. Not because they're unimportant — because engineers are always pulled to bigger priorities. AgentFlow closes the long tail automatically.
                </p>
              </div>
              <div className="step-card">
                <h3 className="feature-title" style={{ fontSize: "16px" }}>Jira tracks status. AgentFlow changes it.</h3>
                <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.7, marginTop: "12px" }}>
                  Jira is excellent at visualizing work, managing sprints, and tracking blockers. But it can't write code. AgentFlow picks up labeled GitHub issues and ships PRs — moving tickets from "In Progress" to "Done" without a human touch.
                </p>
              </div>
              <div className="step-card">
                <h3 className="feature-title" style={{ fontSize: "16px" }}>No migration required</h3>
                <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.7, marginTop: "12px" }}>
                  Keep Jira for planning and stakeholder communication. AgentFlow plugs into your GitHub repos directly. Sync issues from Jira to GitHub, label them for AgentFlow, and watch them close.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How AgentFlow works */}
        <section style={{ paddingBottom: "72px" }}>
          <div className="container" style={{ maxWidth: "720px" }}>
            <p className="section-label" style={{ textAlign: "left" }}>How it works</p>
            <h2 className="section-title" style={{ textAlign: "left", fontSize: "clamp(20px, 2.5vw, 28px)" }}>
              How AgentFlow closes your Jira backlog
            </h2>
            <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "24px" }}>
              {[
                {
                  step: "1",
                  title: "Sync Jira tickets to GitHub issues",
                  desc: "Use Jira's GitHub integration or a simple sync tool to mirror your agent-ready Jira tickets as GitHub issues. AgentFlow works natively with GitHub — no Jira API needed.",
                },
                {
                  step: "2",
                  title: "Label issues as agent-ready",
                  desc: "Apply a label to the GitHub issues you want AgentFlow to handle. Small bugs, well-scoped tasks, polish items — anything with a clear definition of done.",
                },
                {
                  step: "3",
                  title: "Agents write and test the code",
                  desc: "AgentFlow's coding agents pick up the issue, read your codebase, implement the fix, and run your test suite — entirely autonomously.",
                },
                {
                  step: "4",
                  title: "PR merged, Jira ticket closed",
                  desc: "When the PR merges, the GitHub issue closes — and the linked Jira ticket updates automatically. Your backlog shrinks. Your team ships more without doing more.",
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

        {/* CTA */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-box">
              <h2 className="cta-title">See how many of your issues are agent-ready</h2>
              <p className="cta-sub">
                Connect your GitHub repo and AgentFlow will analyze your backlog — showing exactly which issues agents can close autonomously.
              </p>
              <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/analyze" className="btn btn-primary btn-lg">
                  Analyze my repo →
                </Link>
                <Link href="/register" className="btn btn-secondary btn-lg">
                  Get started free
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
