import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — AI Engineering Automation | AgentFlow",
  description:
    "Practical guides on AI code review, GitHub issue automation, and eliminating engineering backlog. Learn how AI agents handle the work that slows your team down.",
  openGraph: {
    title: "Blog — AI Engineering Automation | AgentFlow",
    description:
      "Practical guides on AI code review, GitHub issue automation, and eliminating engineering backlog.",
    url: "https://agentflow.ai/blog",
    siteName: "AgentFlow",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AgentFlow Blog" }],
    type: "website",
  },
};

const posts = [
  {
    slug: "how-we-built-agentflow",
    title: "How AI Agents Built Our SaaS in 7 Days (And What They Shipped)",
    date: "August 6, 2026",
    excerpt:
      "We built AgentFlow using AgentFlow. A CEO agent and a Founding Engineer agent shipped 28 issues in 7 days — multi-tenancy, billing, GitHub integration, 8 SEO pages, and more. Here's the real story.",
  },
  {
    slug: "ai-agents-vs-copilots",
    title: "AI Agents vs Copilots for Developers: The Fundamental Difference",
    date: "August 6, 2026",
    excerpt:
      "GitHub Copilot and AI agents are not the same tool. One suggests code while you type; the other executes full issue-to-PR pipelines autonomously. Here's why the distinction matters for backlog reduction.",
  },
  {
    slug: "reduce-engineering-backlog",
    title: "How to Reduce Engineering Backlog (Without Adding Headcount)",
    date: "August 6, 2026",
    excerpt:
      "Learn proven strategies to reduce your engineering backlog — from triage frameworks to AI-powered automation that closes 30% of open issues without adding headcount.",
  },
  {
    slug: "ai-code-review-automation",
    title: "AI Code Review Automation: How to Cut Review Time by 80%",
    date: "August 5, 2026",
    excerpt:
      "AI code review automation is eliminating the review bottleneck that stalls engineering teams. Learn how automated pull request review works and how to deploy it without breaking your workflow.",
  },
  {
    slug: "github-issue-automation",
    title: "GitHub Issue Automation: How AI Agents Resolve Tickets Without Human Intervention",
    date: "August 4, 2026",
    excerpt:
      "GitHub issue automation has evolved beyond label bots. Learn how AI agents triage, fix, and close GitHub issues end-to-end — and which ticket types automate best.",
  },
  {
    slug: "ai-agents-github-integration",
    title: "How AI Agents Are Changing GitHub Issue Management in 2026",
    date: "August 3, 2026",
    excerpt:
      "AI GitHub integration is reshaping how engineering teams handle issue queues. Learn how AI agents assign, close, and automate GitHub issues — and what they can't do yet.",
  },
  {
    slug: "engineering-backlog-cost",
    title: "The True Cost of an Unresolved Engineering Backlog",
    date: "August 2, 2026",
    excerpt:
      "Most engineering teams lose 15–20% of capacity to backlog toil. Learn how to calculate your real cost and eliminate the drag before it compounds.",
  },
  {
    slug: "github-backlog-automation",
    title: "How to Clear Your GitHub Backlog with AI Agents",
    date: "August 1, 2026",
    excerpt:
      "GitHub backlog automation using AI developer agents. Learn how autonomous agents read your issues, write code, open PRs, and close tickets — without hand-holding.",
  },
];

export default function BlogIndexPage() {
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
          <div className="container" style={{ maxWidth: "720px" }}>
            <div className="hero-badge">Blog</div>
            <h1 className="hero-title" style={{ fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.15 }}>
              AI engineering automation — <span>practical guides</span>
            </h1>
            <p className="hero-subtitle" style={{ marginTop: "16px" }}>
              How AI agents handle code review, issue triage, and backlog work so your team can focus on what matters.
            </p>
          </div>
        </section>

        <section style={{ paddingBottom: "96px" }}>
          <div className="container" style={{ maxWidth: "720px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              {posts.map((post) => (
                <article
                  key={post.slug}
                  style={{
                    borderBottom: "1px solid var(--border)",
                    paddingBottom: "32px",
                  }}
                >
                  <p style={{ color: "var(--muted)", fontSize: "13px", marginBottom: "8px" }}>
                    {post.date}
                  </p>
                  <h2 style={{ fontSize: "20px", fontWeight: 600, color: "var(--text)", lineHeight: 1.3, marginBottom: "10px" }}>
                    <Link
                      href={`/blog/${post.slug}`}
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p style={{ color: "var(--muted)", fontSize: "15px", lineHeight: 1.6, marginBottom: "14px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    style={{ color: "var(--accent)", fontSize: "14px", textDecoration: "none", fontWeight: 500 }}
                  >
                    Read →
                  </Link>
                </article>
              ))}
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
