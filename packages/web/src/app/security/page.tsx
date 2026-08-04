import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security & Privacy — AgentFlow",
  description:
    "How AgentFlow handles your code, GitHub permissions, and data. Straight answers for technical teams evaluating AgentFlow.",
};

const faqs: { q: string; a: string }[] = [
  {
    q: "What GitHub OAuth scopes does AgentFlow request, and why?",
    a: "We request `repo` (read/write access to repositories you explicitly connect) so agents can read issues, open pull requests, and push branches on your behalf. We also request `read:user` and `user:email` to identify your account during authentication. We do not request admin, org, or webhook scopes — agents operate only at the repository level you grant.",
  },
  {
    q: "Does AgentFlow store my source code?",
    a: "No. AgentFlow never persists your repository code on its servers. When an agent runs, it reads the files it needs ephemerally during that run and writes the output directly to GitHub via the API. Once the run ends, no file contents are retained.",
  },
  {
    q: "How are agent actions sandboxed between runs?",
    a: "Each agent run is stateless — it starts fresh with only the context you provide (issue title, description, and linked files). There is no shared filesystem or persistent process between runs. An agent that finished a PR yesterday has no residual access or memory when a new issue is assigned today.",
  },
  {
    q: "Who can see the code and PRs the agent writes?",
    a: "Only your GitHub repository and anyone you've granted access to it. AgentFlow does not index, read, or retain the content of the PRs or code diffs that agents produce. The PR lives entirely on GitHub under your team's standard access controls.",
  },
  {
    q: "What data does AgentFlow keep, and what does it discard?",
    a: "We retain issue metadata (title, status, assignee, timestamps) and links to the PRs agents opened — the minimum needed to power your dashboard and billing. We do not retain source code, file contents, PR diffs, or commit messages. Log records for billing and debugging are purged after 90 days.",
  },
  {
    q: "What happens if I revoke AgentFlow's GitHub access?",
    a: "Revocation is immediate. As soon as you remove the OAuth grant from your GitHub settings, AgentFlow loses all access to your repositories. No residual tokens are cached, and no background jobs retain prior access. Existing issue metadata in your AgentFlow dashboard stays visible until you delete your account.",
  },
  {
    q: "Is AgentFlow SOC 2 certified?",
    a: "Not yet. We are a seed-stage company and have not completed a SOC 2 audit. We follow security best practices — encrypted data in transit (TLS 1.2+), encrypted at rest (AES-256), scoped OAuth tokens, and no code retention — but we cannot provide a SOC 2 report at this time. If compliance certification is a hard requirement, reach out and we will share our current controls documentation.",
  },
];

export default function SecurityPage() {
  return (
    <>
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
        <section className="hero" style={{ paddingBottom: "40px" }}>
          <div className="container">
            <div className="hero-badge">Security & Privacy</div>
            <h1 className="hero-title" style={{ fontSize: "clamp(28px, 4vw, 48px)" }}>
              Your code stays <span>yours.</span>
            </h1>
            <p className="hero-sub">
              Straight answers to the questions every technical team asks before connecting a new tool to their GitHub.
            </p>
          </div>
        </section>

        <section style={{ paddingBottom: "96px" }}>
          <div className="container" style={{ maxWidth: "720px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  style={{
                    borderTop: "1px solid var(--border)",
                    padding: "28px 0",
                  }}
                >
                  <p style={{ fontWeight: 600, fontSize: "16px", marginBottom: "10px", color: "var(--text)" }}>
                    {faq.q}
                  </p>
                  <p style={{ color: "var(--muted)", fontSize: "15px", lineHeight: "1.7" }}>{faq.a}</p>
                </div>
              ))}
              <div style={{ borderTop: "1px solid var(--border)", paddingTop: "28px" }} />
            </div>

            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                padding: "28px 32px",
                marginTop: "8px",
              }}
            >
              <p style={{ fontWeight: 600, fontSize: "16px", marginBottom: "8px" }}>Still have questions?</p>
              <p style={{ color: "var(--muted)", fontSize: "14px", marginBottom: "20px" }}>
                If you need more detail — architecture diagrams, current security controls, or a call with our team —
                reach out. We are happy to walk you through it.
              </p>
              <a
                href="mailto:security@agentflow.ai"
                className="btn btn-secondary"
                style={{ fontSize: "14px", padding: "8px 16px" }}
              >
                Contact security@agentflow.ai
              </a>
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
            <a href="/security">Security & Privacy</a>
          </p>
        </div>
      </footer>
    </>
  );
}
