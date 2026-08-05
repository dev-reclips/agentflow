import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AgentFlow vs Sweep: Multi-Agent Orchestration vs Single-Agent PR Opener",
  description:
    "AgentFlow runs full sprint cycles with multi-agent workflows and a real-time dashboard. Sweep opens single PRs. See which fits your team.",
  openGraph: {
    title: "AgentFlow vs Sweep: Multi-Agent Orchestration vs Single-Agent PR Opener",
    description:
      "AgentFlow runs full sprint cycles with multi-agent workflows and a real-time dashboard. Sweep opens single PRs. See which fits your team.",
    url: "https://agentflow.ai/vs/sweep",
    siteName: "AgentFlow",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AgentFlow vs Sweep" }],
    type: "website",
  },
  alternates: {
    canonical: "https://agentflow.ai/vs/sweep",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "AgentFlow vs Sweep",
  description:
    "AgentFlow runs full sprint cycles with multi-agent workflows and a real-time dashboard. Sweep opens single PRs. See which fits your team.",
  url: "https://agentflow.ai/vs/sweep",
};

export default function VsSweepPage() {
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
              AgentFlow vs Sweep
            </h1>
            <p className="hero-sub" style={{ maxWidth: "640px", margin: "16px auto 0" }}>
              Sweep opens a PR. AgentFlow orchestrates multi-agent workflows across your entire sprint — triage, implementation, review, and merge — with full visibility at every step.
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
                      Sweep
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      feature: "Multi-agent orchestration",
                      agentflow: "Yes",
                      sweep: "No",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "Real-time workflow dashboard",
                      agentflow: "Yes",
                      sweep: "No",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "Sprint-level automation (triage → PR → review → merge)",
                      agentflow: "Yes",
                      sweep: "No",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "Multi-repo support",
                      agentflow: "Yes",
                      sweep: "No",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "Custom agent roles and workflows",
                      agentflow: "Yes",
                      sweep: "Limited",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "PR generation",
                      agentflow: "Yes",
                      sweep: "Yes",
                      agentflowHighlight: false,
                    },
                    {
                      feature: "Pricing",
                      agentflow: "From $499/mo",
                      sweep: "From $480/mo",
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
                        {row.sweep}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* When to use */}
        <section className="features" style={{ paddingTop: "0" }}>
          <div className="container" style={{ maxWidth: "800px" }}>
            <p className="section-label">Decision guide</p>
            <h2 className="section-title">When to use each tool</h2>
            <div className="steps-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
              <div className="step-card">
                <h3 className="feature-title" style={{ fontSize: "16px" }}>Use Sweep when</h3>
                <ul style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.7, paddingLeft: "20px", marginTop: "12px" }}>
                  <li>You need a lightweight bot to open PRs for simple issues</li>
                  <li>Your team works in a single repository</li>
                  <li>You want a low-configuration starting point</li>
                </ul>
              </div>
              <div className="step-card">
                <h3 className="feature-title" style={{ fontSize: "16px" }}>Use AgentFlow when</h3>
                <ul style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.7, paddingLeft: "20px", marginTop: "12px" }}>
                  <li>You need end-to-end sprint automation, not just PRs</li>
                  <li>Your team works across multiple repositories</li>
                  <li>You need visibility into what agents are doing in real time</li>
                </ul>
              </div>
              <div className="step-card">
                <h3 className="feature-title" style={{ fontSize: "16px" }}>Why teams switch</h3>
                <ul style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.7, paddingLeft: "20px", marginTop: "12px" }}>
                  <li>Sweep stops at the PR; AgentFlow handles triage, review, and merge too</li>
                  <li>No visibility into what the agent is doing or why</li>
                  <li>Single-repo constraint doesn't scale with the org</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How AgentFlow resolves an issue */}
        <section style={{ paddingBottom: "72px" }}>
          <div className="container" style={{ maxWidth: "720px" }}>
            <p className="section-label" style={{ textAlign: "left" }}>How it works</p>
            <h2 className="section-title" style={{ textAlign: "left", fontSize: "clamp(20px, 2.5vw, 28px)" }}>
              How AgentFlow handles a full sprint cycle
            </h2>
            <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "24px" }}>
              {[
                {
                  step: "1",
                  title: "Triage",
                  desc: "AgentFlow reads every new issue, assigns labels, estimates complexity, and routes it to the right agent — automatically, the moment it lands in your board.",
                },
                {
                  step: "2",
                  title: "Implement",
                  desc: "A specialized engineering agent reads the issue and the relevant codebase, reasons about the correct fix, and writes the code — across as many repos as the change spans.",
                },
                {
                  step: "3",
                  title: "Review",
                  desc: "A separate review agent checks the PR for correctness, style, and test coverage before it ever reaches your team. You see the full reasoning in the real-time dashboard.",
                },
                {
                  step: "4",
                  title: "Merge",
                  desc: "Your engineers review the final PR with full context already surfaced. One approval and it merges — issue closed, backlog item done.",
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
            <a href="/vs/cursor">AgentFlow vs Cursor</a>
          </p>
        </div>
      </footer>
    </>
  );
}
