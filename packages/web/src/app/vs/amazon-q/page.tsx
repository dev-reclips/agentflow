import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AgentFlow vs Amazon Q Developer — GitHub-Native vs AWS-Centric AI Coding",
  description:
    "Amazon Q Developer is built for AWS. AgentFlow works with any GitHub repo, resolves issues autonomously, and doesn't require AWS infrastructure. Compare and decide.",
  openGraph: {
    title: "AgentFlow vs Amazon Q Developer — GitHub-Native vs AWS-Centric AI Coding",
    description:
      "Amazon Q Developer is built for AWS. AgentFlow works with any GitHub repo, resolves issues autonomously, and doesn't require AWS infrastructure. Compare and decide.",
    url: "https://agentflow.ai/vs/amazon-q",
    siteName: "AgentFlow",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AgentFlow vs Amazon Q" }],
    type: "website",
  },
  alternates: {
    canonical: "https://agentflow.ai/vs/amazon-q",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "AgentFlow vs Amazon Q Developer",
  description:
    "Amazon Q Developer is built for AWS. AgentFlow works with any GitHub repo, resolves issues autonomously, and doesn't require AWS infrastructure. Compare and decide.",
  url: "https://agentflow.ai/vs/amazon-q",
};

export default function VsAmazonQPage() {
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
              AgentFlow vs Amazon Q Developer
            </h1>
            <p className="hero-sub" style={{ maxWidth: "640px", margin: "16px auto 0" }}>
              Amazon Q Developer is Amazon&apos;s AI assistant — optimized for teams already deep in the AWS ecosystem. AgentFlow is GitHub-native, cloud-agnostic, and resolves your entire backlog autonomously. No AWS account required.
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
                      Amazon Q Developer
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
                      feature: "GitHub-native (no AWS account needed)",
                      agentflow: "Yes",
                      competitor: "No",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "Works on any GitHub repo",
                      agentflow: "Yes",
                      competitor: "Partial",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "Opens PRs without developer input",
                      agentflow: "Yes",
                      competitor: "No",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "Works on your backlog (not just in-IDE)",
                      agentflow: "Yes",
                      competitor: "No",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "AWS ecosystem integration",
                      agentflow: "No",
                      competitor: "Yes",
                      agentflowHighlight: false,
                    },
                    {
                      feature: "Requires AWS infrastructure",
                      agentflow: "No",
                      competitor: "Yes",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "Transparent flat pricing",
                      agentflow: "Yes",
                      competitor: "No",
                      agentflowHighlight: true,
                    },
                    {
                      feature: "Pricing",
                      agentflow: "$499–$1,499/mo flat",
                      competitor: "$19–$29/seat/mo + AWS",
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
            <h2 className="section-title">GitHub-native vs AWS-locked — a key distinction</h2>
            <div className="steps-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
              <div className="step-card">
                <h3 className="feature-title" style={{ fontSize: "16px" }}>Amazon Q is built for AWS teams</h3>
                <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.7, marginTop: "12px" }}>
                  Amazon Q Developer is deeply integrated with AWS services — CodeWhisperer-style suggestions in the IDE, Q in the console, Q for AWS security hub. It&apos;s a powerful tool if your team lives in AWS. But it&apos;s not designed to autonomously close issues from your GitHub backlog.
                </p>
              </div>
              <div className="step-card">
                <h3 className="feature-title" style={{ fontSize: "16px" }}>AgentFlow works with any repo</h3>
                <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.7, marginTop: "12px" }}>
                  AgentFlow connects to GitHub in minutes — no AWS account, no IAM roles, no VPCs. It reads your issue board, picks up assigned issues, implements the fix, and opens a PR. Works whether you&apos;re on AWS, GCP, Vercel, or bare metal.
                </p>
              </div>
              <div className="step-card">
                <h3 className="feature-title" style={{ fontSize: "16px" }}>Backlog focus vs in-IDE focus</h3>
                <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.7, marginTop: "12px" }}>
                  Amazon Q helps developers move faster in the moment. AgentFlow works while developers are doing other things — resolving GitHub issues from the backlog without anyone at the keyboard. The two tools target different bottlenecks.
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
                <h3 className="feature-title" style={{ fontSize: "16px" }}>Use Amazon Q when</h3>
                <ul style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.7, paddingLeft: "20px", marginTop: "12px" }}>
                  <li>Your team is deeply embedded in the AWS ecosystem</li>
                  <li>You want AI assistance with AWS Console or CloudFormation</li>
                  <li>Your primary need is IDE autocomplete and AWS-aware suggestions</li>
                </ul>
              </div>
              <div className="step-card">
                <h3 className="feature-title" style={{ fontSize: "16px" }}>Use AgentFlow when</h3>
                <ul style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.7, paddingLeft: "20px", marginTop: "12px" }}>
                  <li>You want GitHub issues resolved without developer time</li>
                  <li>You&apos;re not AWS-first and don&apos;t want vendor lock-in</li>
                  <li>You need predictable flat pricing without per-seat or AWS metering</li>
                </ul>
              </div>
              <div className="step-card">
                <h3 className="feature-title" style={{ fontSize: "16px" }}>Why teams switch</h3>
                <ul style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.7, paddingLeft: "20px", marginTop: "12px" }}>
                  <li>AWS lock-in adds operational complexity for non-AWS teams</li>
                  <li>AgentFlow ships backlog items without a developer writing code</li>
                  <li>Flat pricing is easier to forecast than seat + metered AWS costs</li>
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
