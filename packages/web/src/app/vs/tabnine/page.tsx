import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AgentFlow vs Tabnine — AI Issue Resolution vs AI Code Autocomplete",
  description:
    "Tabnine autocompletes lines of code as you type. AgentFlow closes entire GitHub issues — autonomously, no IDE required. Different category, different ROI.",
  openGraph: {
    title: "AgentFlow vs Tabnine — AI Issue Resolution vs AI Code Autocomplete",
    description:
      "Tabnine autocompletes lines of code as you type. AgentFlow closes entire GitHub issues — autonomously, no IDE required. Different category, different ROI.",
    url: "https://agentflow.ai/vs/tabnine",
    siteName: "AgentFlow",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AgentFlow vs Tabnine" }],
    type: "website",
  },
  alternates: {
    canonical: "https://agentflow.ai/vs/tabnine",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "AgentFlow vs Tabnine",
  description:
    "Tabnine autocompletes lines of code as you type. AgentFlow closes entire GitHub issues — autonomously, no IDE required. Different category, different ROI.",
  url: "https://agentflow.ai/vs/tabnine",
};

export default function VsTabninePage() {
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
              AgentFlow vs Tabnine
            </h1>
            <p className="hero-sub" style={{ maxWidth: "640px", margin: "16px auto 0" }}>
              Tabnine predicts your next line of code. AgentFlow doesn't need you in the loop at all — it reads your GitHub issue, writes the entire fix, and opens the PR. Copilot vs agent: a fundamentally different category.
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
                      Tabnine
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
                      feature: "Closes entire issues end-to-end",
                      agentflow: "Yes",
                      competitor: "No",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "Requires developer at the keyboard",
                      agentflow: "No",
                      competitor: "Yes",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "Opens PRs without developer input",
                      agentflow: "Yes",
                      competitor: "No",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "IDE plugin required",
                      agentflow: "No",
                      competitor: "Yes",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "GitHub-native (no IDE needed)",
                      agentflow: "Yes",
                      competitor: "No",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "Line-level autocomplete",
                      agentflow: "No",
                      competitor: "Yes",
                      agentflowHighlight: false,
                    },
                    {
                      feature: "Clears your backlog autonomously",
                      agentflow: "Yes",
                      competitor: "No",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "Pricing",
                      agentflow: "$499–$1,499/mo flat",
                      competitor: "$9–$39/seat/mo",
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
            <h2 className="section-title">Copilot vs agent — a fundamental difference</h2>
            <div className="steps-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
              <div className="step-card">
                <h3 className="feature-title" style={{ fontSize: "16px" }}>Tabnine completes lines, you do the rest</h3>
                <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.7, marginTop: "12px" }}>
                  Tabnine is a force-multiplier for developers actively writing code. It predicts what you&apos;re about to type and saves keystrokes. But a developer still has to read the issue, open the file, understand the context, and guide every step. The cognitive load stays with your team.
                </p>
              </div>
              <div className="step-card">
                <h3 className="feature-title" style={{ fontSize: "16px" }}>AgentFlow resolves issues without you</h3>
                <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.7, marginTop: "12px" }}>
                  AgentFlow starts from the GitHub issue — not the cursor position. It plans the fix, navigates your codebase, writes every file, runs tests, and opens a PR. No IDE, no developer prompt, no context-switch. Your team reviews the finished PR.
                </p>
              </div>
              <div className="step-card">
                <h3 className="feature-title" style={{ fontSize: "16px" }}>Different ROI, different category</h3>
                <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.7, marginTop: "12px" }}>
                  Tabnine makes developers faster at writing code. AgentFlow removes the developer from routine issue resolution entirely. Teams use both — Tabnine for complex, judgment-heavy work; AgentFlow for the 60% of backlog items that are well-defined enough to delegate.
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
                <h3 className="feature-title" style={{ fontSize: "16px" }}>Use Tabnine when</h3>
                <ul style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.7, paddingLeft: "20px", marginTop: "12px" }}>
                  <li>You want to speed up developers writing complex or novel code</li>
                  <li>Your team works heavily inside an IDE</li>
                  <li>You need privacy-first, on-prem AI autocomplete</li>
                </ul>
              </div>
              <div className="step-card">
                <h3 className="feature-title" style={{ fontSize: "16px" }}>Use AgentFlow when</h3>
                <ul style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.7, paddingLeft: "20px", marginTop: "12px" }}>
                  <li>Your backlog has well-defined issues no one has time to tackle</li>
                  <li>You want PRs opened without a developer writing a single line</li>
                  <li>You need to scale throughput without adding headcount</li>
                </ul>
              </div>
              <div className="step-card">
                <h3 className="feature-title" style={{ fontSize: "16px" }}>Why teams switch</h3>
                <ul style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.7, paddingLeft: "20px", marginTop: "12px" }}>
                  <li>Autocomplete accelerates writing; AgentFlow eliminates writing entirely</li>
                  <li>Per-seat pricing adds up; flat pricing scales with output</li>
                  <li>Backlog items don&apos;t need a developer in the chair to get resolved</li>
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
