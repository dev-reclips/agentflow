import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AgentFlow vs GitHub Copilot: Autonomous Issue Resolution vs Code Autocomplete",
  description:
    "AgentFlow closes GitHub issues end-to-end. GitHub Copilot suggests code as you type. Here's when to use each.",
  openGraph: {
    title: "AgentFlow vs GitHub Copilot: Autonomous Issue Resolution vs Code Autocomplete",
    description:
      "AgentFlow closes GitHub issues end-to-end. GitHub Copilot suggests code as you type. Here's when to use each.",
    url: "https://agentflow.ai/vs/github-copilot",
    siteName: "AgentFlow",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AgentFlow vs GitHub Copilot" }],
    type: "website",
  },
  alternates: {
    canonical: "https://agentflow.ai/vs/github-copilot",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "AgentFlow vs GitHub Copilot",
  description:
    "AgentFlow closes GitHub issues end-to-end. GitHub Copilot suggests code as you type. Here's when to use each.",
  url: "https://agentflow.ai/vs/github-copilot",
};

export default function VsGitHubCopilotPage() {
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
              AgentFlow vs GitHub Copilot
            </h1>
            <p className="hero-sub" style={{ maxWidth: "640px", margin: "16px auto 0" }}>
              GitHub Copilot helps engineers write code faster. AgentFlow closes GitHub issues while your engineers focus on architecture.
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
                      GitHub Copilot
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      feature: "Works autonomously on GitHub issues",
                      agentflow: "Yes",
                      copilot: "No",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "Writes and opens PRs without human prompt",
                      agentflow: "Yes",
                      copilot: "No",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "Code autocomplete in your IDE",
                      agentflow: "No",
                      copilot: "Yes",
                      agentflowHighlight: false,
                    },
                    {
                      feature: "Reviews and understands codebase context",
                      agentflow: "Yes",
                      copilot: "Partial",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "Human review before merge",
                      agentflow: "Required",
                      copilot: "Optional",
                      agentflowHighlight: false,
                    },
                    {
                      feature: "Pricing",
                      agentflow: "From $499/mo",
                      copilot: "$19/user/mo",
                      agentflowHighlight: false,
                    },
                    {
                      feature: "Best for",
                      agentflow: "Teams with ticket backlogs",
                      copilot: "Individual developers",
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
                        {row.copilot}
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
                <h3 className="feature-title" style={{ fontSize: "16px" }}>Use Copilot when</h3>
                <ul style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.7, paddingLeft: "20px", marginTop: "12px" }}>
                  <li>You want AI assistance while actively writing code</li>
                  <li>You're doing greenfield or exploratory work</li>
                  <li>You want real-time code suggestions in your editor</li>
                </ul>
              </div>
              <div className="step-card">
                <h3 className="feature-title" style={{ fontSize: "16px" }}>Use AgentFlow when</h3>
                <ul style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.7, paddingLeft: "20px", marginTop: "12px" }}>
                  <li>You have a backlog of maintenance tickets and bug fixes</li>
                  <li>Repetitive tasks don't need an engineer's full attention</li>
                  <li>You want issues resolved end-to-end, not just code suggested</li>
                </ul>
              </div>
              <div className="step-card">
                <h3 className="feature-title" style={{ fontSize: "16px" }}>Use both</h3>
                <ul style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.7, paddingLeft: "20px", marginTop: "12px" }}>
                  <li>Copilot for active development and new features</li>
                  <li>AgentFlow for the ticket queue running in parallel</li>
                  <li>Engineers ship faster, backlog drains automatically</li>
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
              How AgentFlow resolves a GitHub issue
            </h2>
            <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "24px" }}>
              {[
                {
                  step: "1",
                  title: "Assign",
                  desc: "Add an issue to AgentFlow the same way you'd assign it to a teammate — directly in GitHub. The agent picks it up immediately.",
                },
                {
                  step: "2",
                  title: "Analyze",
                  desc: "The agent reads the issue, pulls relevant code from the repository, and reasons about the root cause and the correct fix.",
                },
                {
                  step: "3",
                  title: "Pull request",
                  desc: "AgentFlow opens a PR referencing the original issue — with a clear description, the code change, and tests. Your team reviews it exactly like any other PR.",
                },
                {
                  step: "4",
                  title: "Close",
                  desc: "Merge when satisfied. The issue closes automatically. No human time spent on triage, implementation, or back-and-forth.",
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
