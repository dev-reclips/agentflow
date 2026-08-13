import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AgentFlow vs CodeRabbit — AI Issue Resolution vs AI Code Review",
  description:
    "CodeRabbit reviews your PRs and leaves comments. AgentFlow writes the code, opens the PR, and closes the issue — autonomously. See which fits your team.",
  openGraph: {
    title: "AgentFlow vs CodeRabbit — AI Issue Resolution vs AI Code Review",
    description:
      "CodeRabbit reviews your PRs and leaves comments. AgentFlow writes the code, opens the PR, and closes the issue — autonomously. See which fits your team.",
    url: "https://agentflow.ai/vs/coderabbit",
    siteName: "AgentFlow",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AgentFlow vs CodeRabbit" }],
    type: "website",
  },
  alternates: {
    canonical: "https://agentflow.ai/vs/coderabbit",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "AgentFlow vs CodeRabbit",
  description:
    "CodeRabbit reviews your PRs and leaves comments. AgentFlow writes the code, opens the PR, and closes the issue — autonomously. See which fits your team.",
  url: "https://agentflow.ai/vs/coderabbit",
};

export default function VsCoderabbitPage() {
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
              AgentFlow vs CodeRabbit
            </h1>
            <p className="hero-sub" style={{ maxWidth: "640px", margin: "16px auto 0" }}>
              CodeRabbit reviews PRs and tells your developers what to fix. AgentFlow skips the middle step — it reads the GitHub issue, writes the fix, and opens the PR. No developer prompt required.
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
                      CodeRabbit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      feature: "Autonomously resolves GitHub issues",
                      agentflow: "Yes",
                      competitor: "No",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "Writes code — not just reviews it",
                      agentflow: "Yes",
                      competitor: "No",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "Opens PRs without developer input",
                      agentflow: "Yes",
                      competitor: "No",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "Clears your backlog",
                      agentflow: "Yes",
                      competitor: "No",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "AI code review on PRs",
                      agentflow: "Yes",
                      competitor: "Yes",
                      agentflowHighlight: false,
                    },
                    {
                      feature: "Developer still required to write fixes",
                      agentflow: "No",
                      competitor: "Yes",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "Pricing",
                      agentflow: "$499–$1,499/mo flat",
                      competitor: "$19–$29/seat/mo",
                      agentflowHighlight: false,
                    },
                    {
                      feature: "Scales without adding headcount",
                      agentflow: "Yes",
                      competitor: "No",
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
            <p className="section-label">Why teams add AgentFlow</p>
            <h2 className="section-title">Review vs resolution — a fundamental difference</h2>
            <div className="steps-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
              <div className="step-card">
                <h3 className="feature-title" style={{ fontSize: "16px" }}>CodeRabbit reviews, you fix</h3>
                <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.7, marginTop: "12px" }}>
                  CodeRabbit reads your PR and leaves comments: "this function is too complex," "add a null check here." Then a developer has to read those comments, write the actual fix, and push another commit. The review overhead lands back on your team.
                </p>
              </div>
              <div className="step-card">
                <h3 className="feature-title" style={{ fontSize: "16px" }}>AgentFlow fixes without being asked</h3>
                <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.7, marginTop: "12px" }}>
                  AgentFlow starts from the GitHub issue — not the PR. It reads the context, writes the code, runs your tests, and opens a PR with a full description. Your team reviews and merges. No back-and-forth, no follow-up commits.
                </p>
              </div>
              <div className="step-card">
                <h3 className="feature-title" style={{ fontSize: "16px" }}>ROI that compounds</h3>
                <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.7, marginTop: "12px" }}>
                  CodeRabbit adds review overhead; AgentFlow removes backlog hours. At $499/mo flat, a single mid-level engineer issue resolved per week covers the cost. More issues, same price — the ROI compounds as your backlog shrinks.
                </p>
              </div>
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
                <h3 className="feature-title" style={{ fontSize: "16px" }}>Use CodeRabbit when</h3>
                <ul style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.7, paddingLeft: "20px", marginTop: "12px" }}>
                  <li>You want automated commentary on human-written PRs</li>
                  <li>Your primary need is faster human code review cycles</li>
                  <li>You have developers who will act on review suggestions</li>
                </ul>
              </div>
              <div className="step-card">
                <h3 className="feature-title" style={{ fontSize: "16px" }}>Use AgentFlow when</h3>
                <ul style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.7, paddingLeft: "20px", marginTop: "12px" }}>
                  <li>You want to close GitHub issues without writing the code yourself</li>
                  <li>Your backlog is growing faster than your team can ship</li>
                  <li>You need to scale throughput without adding headcount</li>
                </ul>
              </div>
              <div className="step-card">
                <h3 className="feature-title" style={{ fontSize: "16px" }}>Why teams switch</h3>
                <ul style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.7, paddingLeft: "20px", marginTop: "12px" }}>
                  <li>CodeRabbit adds steps; AgentFlow removes them</li>
                  <li>Per-seat pricing scales up fast as the team grows</li>
                  <li>Review comments don't ship features — resolved issues do</li>
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
