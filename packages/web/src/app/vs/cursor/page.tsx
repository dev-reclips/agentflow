import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AgentFlow vs Cursor — Autonomous GitHub Issue Resolution vs AI Code Editor",
  description:
    "Cursor is an AI code editor that needs a developer at the keyboard. AgentFlow autonomously picks up GitHub issues and resolves them end-to-end while your team sleeps.",
  openGraph: {
    title: "AgentFlow vs Cursor — Autonomous GitHub Issue Resolution vs AI Code Editor",
    description:
      "Cursor is an AI code editor that needs a developer at the keyboard. AgentFlow autonomously picks up GitHub issues and resolves them end-to-end while your team sleeps.",
    url: "https://agentflow.ai/vs/cursor",
    siteName: "AgentFlow",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AgentFlow vs Cursor" }],
    type: "website",
  },
  alternates: {
    canonical: "https://agentflow.ai/vs/cursor",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "AgentFlow vs Cursor",
  description:
    "Cursor is an AI code editor that needs a developer at the keyboard. AgentFlow autonomously picks up GitHub issues and resolves them end-to-end while your team sleeps.",
  url: "https://agentflow.ai/vs/cursor",
};

export default function VsCursorPage() {
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
              AgentFlow vs Cursor
            </h1>
            <p className="hero-sub" style={{ maxWidth: "640px", margin: "16px auto 0" }}>
              Cursor makes you a faster developer. AgentFlow replaces the developer for entire classes of work — picking up GitHub issues autonomously and shipping PRs while your team focuses on what matters.
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
                      Cursor
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      feature: "Autonomous issue resolution",
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
                      feature: "Native GitHub integration",
                      agentflow: "Yes",
                      competitor: "No",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "Proactive — picks up issues automatically",
                      agentflow: "Yes",
                      competitor: "No (reactive only)",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "End-to-end: triage → PR → review",
                      agentflow: "Yes",
                      competitor: "No",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "IDE required",
                      agentflow: "No",
                      competitor: "Yes",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "Inline code suggestions",
                      agentflow: "No",
                      competitor: "Yes",
                      agentflowHighlight: false,
                    },
                    {
                      feature: "Pricing",
                      agentflow: "From $499/mo",
                      competitor: "From $20/mo per seat",
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
            <p className="section-label">Why teams add AgentFlow</p>
            <h2 className="section-title">Reactive vs proactive AI</h2>
            <div className="steps-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
              <div className="step-card">
                <h3 className="feature-title" style={{ fontSize: "16px" }}>Cursor waits for you</h3>
                <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.7, marginTop: "12px" }}>
                  Cursor is a reactive tool: you open the IDE, highlight code, and ask it to help. Every suggestion still requires a developer at the keyboard to prompt, review, and apply changes.
                </p>
              </div>
              <div className="step-card">
                <h3 className="feature-title" style={{ fontSize: "16px" }}>AgentFlow acts on its own</h3>
                <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.7, marginTop: "12px" }}>
                  AgentFlow watches your GitHub board. The moment an issue lands, it triages, plans, implements, and opens a PR — no developer prompt needed, no IDE open. It works while your team sleeps.
                </p>
              </div>
              <div className="step-card">
                <h3 className="feature-title" style={{ fontSize: "16px" }}>No IDE required</h3>
                <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.7, marginTop: "12px" }}>
                  Cursor lives inside a desktop app. AgentFlow integrates directly with GitHub — no editor to install, no local setup to maintain, no context-switching out of your existing workflow.
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
              How AgentFlow resolves a GitHub issue end-to-end
            </h2>
            <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "24px" }}>
              {[
                {
                  step: "1",
                  title: "Issue detected",
                  desc: "AgentFlow watches your GitHub board. When a new issue appears — or one is assigned to AgentFlow — it immediately picks it up, reads the full context, and plans the fix.",
                },
                {
                  step: "2",
                  title: "Autonomous implementation",
                  desc: "A coding agent reads the relevant parts of your codebase, writes the change, and runs your tests — no developer prompt, no IDE, no context-switch required.",
                },
                {
                  step: "3",
                  title: "PR opened with full context",
                  desc: "AgentFlow opens a pull request with a clear description of what changed and why. A review agent checks for correctness and style before it reaches your team.",
                },
                {
                  step: "4",
                  title: "Your team reviews and merges",
                  desc: "Engineers review AI-authored PRs the same way they review any teammate's work. One approval and it merges — issue closed, backlog item done.",
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
              <h2 className="cta-title">Start your free trial</h2>
              <p className="cta-sub">
                Connect your GitHub repo in 10 minutes. No credit card required.
              </p>
              <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
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
