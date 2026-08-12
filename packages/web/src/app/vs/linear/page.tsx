import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AgentFlow vs Linear — Automate Your Backlog Instead of Just Organizing It",
  description:
    "Linear is excellent for organizing and tracking issues. AgentFlow is for closing them automatically. Linear tracks your backlog. AgentFlow shrinks it.",
  openGraph: {
    title: "AgentFlow vs Linear — Automate Your Backlog Instead of Just Organizing It",
    description:
      "Linear is excellent for organizing and tracking issues. AgentFlow is for closing them automatically. Linear tracks your backlog. AgentFlow shrinks it.",
    url: "https://agentflow.ai/vs/linear",
    siteName: "AgentFlow",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AgentFlow vs Linear" }],
    type: "website",
  },
  alternates: {
    canonical: "https://agentflow.ai/vs/linear",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "AgentFlow vs Linear",
  description:
    "Linear is excellent for organizing and tracking issues. AgentFlow is for closing them automatically. Linear tracks your backlog. AgentFlow shrinks it.",
  url: "https://agentflow.ai/vs/linear",
};

export default function VsLinearPage() {
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
              AgentFlow vs Linear
            </h1>
            <p className="hero-sub" style={{ maxWidth: "640px", margin: "16px auto 0" }}>
              Linear is excellent at organizing and tracking issues. AgentFlow is for closing them automatically. Linear tracks your backlog. AgentFlow shrinks it.
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
                      Linear
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      feature: "Automatically closes GitHub issues with PRs",
                      agentflow: "Yes",
                      competitor: "No",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "Backlog organization & prioritization",
                      agentflow: "Via GitHub labels",
                      competitor: "Yes (best-in-class)",
                      agentflowHighlight: false,
                    },
                    {
                      feature: "Writes code from issue descriptions",
                      agentflow: "Yes",
                      competitor: "No",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "Opens pull requests automatically",
                      agentflow: "Yes",
                      competitor: "No",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "GitHub-native integration",
                      agentflow: "Yes",
                      competitor: "Partial (via sync)",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "Real-time agent dashboard",
                      agentflow: "Yes",
                      competitor: "No",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "Issue tracking & sprint planning",
                      agentflow: "No",
                      competitor: "Yes",
                      agentflowHighlight: false,
                    },
                    {
                      feature: "Pricing",
                      agentflow: "From $499/mo",
                      competitor: "From $8/seat/mo",
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
            <p className="section-label">Why teams add AgentFlow alongside Linear</p>
            <h2 className="section-title">Organize vs execute</h2>
            <div className="steps-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
              <div className="step-card">
                <h3 className="feature-title" style={{ fontSize: "16px" }}>Linear organizes. AgentFlow executes.</h3>
                <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.7, marginTop: "12px" }}>
                  Linear is the best tool for tracking issues, managing sprints, and communicating priorities. But it doesn't write code — that's still a human job. AgentFlow picks up where Linear leaves off and ships PRs for you.
                </p>
              </div>
              <div className="step-card">
                <h3 className="feature-title" style={{ fontSize: "16px" }}>Your backlog is costing you</h3>
                <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.7, marginTop: "12px" }}>
                  Most engineering teams have hundreds of small, well-scoped issues sitting untouched — bugs, polish items, small features. They're perfectly described in Linear. They never get picked up because engineers have bigger priorities.
                </p>
              </div>
              <div className="step-card">
                <h3 className="feature-title" style={{ fontSize: "16px" }}>GitHub-native, not a new tool</h3>
                <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.7, marginTop: "12px" }}>
                  AgentFlow works directly in your GitHub repositories. Keep using Linear for planning — just label issues as agent-ready and AgentFlow handles the rest. No migration, no workflow change.
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
              How AgentFlow shrinks your backlog automatically
            </h2>
            <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "24px" }}>
              {[
                {
                  step: "1",
                  title: "Label issues as agent-ready",
                  desc: "In your GitHub repo, label issues you want AgentFlow to handle. Small bugs, well-scoped features, documentation updates — anything a focused engineer could knock out in a few hours.",
                },
                {
                  step: "2",
                  title: "Agent picks up the work",
                  desc: "AgentFlow's triage agent reads the issue, understands the codebase context, and assigns it to a coding agent automatically — no manual assignment, no Slack ping.",
                },
                {
                  step: "3",
                  title: "Code is written and tested",
                  desc: "The coding agent implements the fix inside your real codebase and runs your existing test suite. If tests fail, it iterates until they pass.",
                },
                {
                  step: "4",
                  title: "PR opened, issue closed",
                  desc: "A pull request is opened with a clear description. Your team reviews and merges — the Linear issue or GitHub issue closes, and your backlog is visibly smaller.",
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
              <h2 className="cta-title">Try AgentFlow free — 14-day trial, no card</h2>
              <p className="cta-sub">
                Connect your GitHub repo in 10 minutes. Start closing backlog issues automatically.
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
