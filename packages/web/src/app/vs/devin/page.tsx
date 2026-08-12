import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AgentFlow vs Devin: Team Agent Orchestration vs Solo AI Engineer",
  description:
    "Devin is a single AI engineer in a cloud sandbox. AgentFlow orchestrates a team of agents natively in your GitHub workflow. Here's the difference.",
  openGraph: {
    title: "AgentFlow vs Devin: Team Agent Orchestration vs Solo AI Engineer",
    description:
      "Devin is a single AI engineer in a cloud sandbox. AgentFlow orchestrates a team of agents natively in your GitHub workflow. Here's the difference.",
    url: "https://agentflow.ai/vs/devin",
    siteName: "AgentFlow",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AgentFlow vs Devin" }],
    type: "website",
  },
  alternates: {
    canonical: "https://agentflow.ai/vs/devin",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "AgentFlow vs Devin",
  description:
    "Devin is a single AI engineer in a cloud sandbox. AgentFlow orchestrates a team of agents natively in your GitHub workflow. Here's the difference.",
  url: "https://agentflow.ai/vs/devin",
};

export default function VsDevinPage() {
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
              AgentFlow vs Devin
            </h1>
            <p className="hero-sub" style={{ maxWidth: "640px", margin: "16px auto 0" }}>
              Devin sends a single AI engineer into an isolated sandbox. AgentFlow deploys a coordinated team of agents directly inside your GitHub workflow — no sandbox, no friction.
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
                      Devin
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      feature: "Multi-agent orchestration",
                      agentflow: "Yes",
                      competitor: "No (single agent)",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "GitHub-native integration",
                      agentflow: "Yes",
                      competitor: "Partial",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "Real-time dashboard",
                      agentflow: "Yes",
                      competitor: "No",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "Sprint-level workflow automation",
                      agentflow: "Yes",
                      competitor: "No",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "Works in your existing codebase",
                      agentflow: "Yes",
                      competitor: "Sandbox only",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "Pricing",
                      agentflow: "From $499/mo",
                      competitor: "Usage-based (expensive)",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "SOC 2 compliance",
                      agentflow: "Yes",
                      competitor: "Yes",
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
            <p className="section-label">Why teams choose AgentFlow</p>
            <h2 className="section-title">The fundamental difference</h2>
            <div className="steps-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
              <div className="step-card">
                <h3 className="feature-title" style={{ fontSize: "16px" }}>Team vs solo</h3>
                <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.7, marginTop: "12px" }}>
                  Devin is one AI engineer working alone. AgentFlow deploys a coordinated team — a triage agent, a coder, a reviewer — working in parallel across your entire sprint backlog.
                </p>
              </div>
              <div className="step-card">
                <h3 className="feature-title" style={{ fontSize: "16px" }}>No sandbox needed</h3>
                <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.7, marginTop: "12px" }}>
                  Devin spins up an isolated cloud sandbox for every task. AgentFlow works directly in your existing codebase and CI/CD pipeline — zero environment drift, zero extra overhead.
                </p>
              </div>
              <div className="step-card">
                <h3 className="feature-title" style={{ fontSize: "16px" }}>Full transparency</h3>
                <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.7, marginTop: "12px" }}>
                  Devin operates inside a black-box sandbox. AgentFlow surfaces every agent action in a real-time dashboard — your team always knows exactly what's happening and why.
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
                  desc: "A coding agent pulls context from your repo, writes the fix, and runs your existing tests — all inside your real codebase, not a sandbox.",
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
