import Link from "next/link";
import type { Metadata } from "next";
import AnalyzeClient from "../analyze/AnalyzeClient";

export const metadata: Metadata = {
  title: "Show HN: We built AgentFlow using AgentFlow — AgentFlow",
  description:
    "Two AI agents shipped 28 features in 7 days. CEO agent wrote the PRD. Engineer agent shipped the code. Now they're trying to sell it. This is the live experiment.",
  openGraph: {
    title: "Show HN: We built AgentFlow using AgentFlow",
    description:
      "Two AI agents shipped 28 features in 7 days. Now they're trying to sell it. This is the live experiment.",
    url: "https://dev-reclips.github.io/show-hn",
    siteName: "AgentFlow",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AgentFlow" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Show HN: We built AgentFlow using AgentFlow",
    description:
      "Two AI agents shipped 28 features in 7 days. Now they're trying to sell it. This is the live experiment.",
    images: ["/og-image.png"],
  },
};

const IS_STATIC = !process.env.NEXT_PUBLIC_API_URL;

const STORY_SECTIONS = [
  {
    label: "The problem",
    heading: "GitHub backlogs eat engineering time",
    body: "The average engineering team loses 20–30% of its capacity to backlog maintenance: triaging issues, writing boilerplate fixes, updating deps, closing stale tickets. It's not exciting work, and it's the kind that compounds silently until the backlog hits four digits.",
  },
  {
    label: "The build",
    heading: "28 features. 7 days. Two AI agents.",
    body: "We didn't hire a team. We gave a CEO agent a goal and a budget. It wrote PRDs, broke them into issues, and assigned them to the Founding Engineer agent. The engineer read each issue, cloned the repo, wrote the code, opened a PR, and merged it. We shipped the product that way. This page is one of those 28 features.",
  },
  {
    label: "The product",
    heading: "AgentFlow closes your issues automatically",
    body: "Connect your GitHub repo. AgentFlow reads the issue, writes the code, runs your CI, and opens a draft PR for your review. You merge it — or don't. No subscription to a coding tool. No prompting. Just closed tickets.",
  },
];

export default function ShowHNPage() {
  return (
    <>
      <nav className="nav">
        <div className="container nav-inner">
          <Link href="/" className="nav-logo" style={{ textDecoration: "none" }}>
            AgentFlow
          </Link>
          <div className="nav-links">
            {!IS_STATIC && (
              <Link href="/login" className="btn btn-secondary" style={{ padding: "8px 16px", fontSize: "14px" }}>
                Log in
              </Link>
            )}
            <Link
              href={IS_STATIC ? "/book-demo" : "/register"}
              className="btn btn-primary"
              style={{ padding: "8px 16px", fontSize: "14px" }}
            >
              {IS_STATIC ? "Book a demo" : "Get started"}
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section className="hero" style={{ paddingBottom: "64px" }}>
          <div className="container" style={{ maxWidth: 760, textAlign: "center" }}>
            <div className="hero-badge" style={{ marginBottom: 24 }}>Show HN</div>
            <h1 className="hero-title" style={{ fontSize: "clamp(28px, 5vw, 56px)", marginBottom: 20 }}>
              We built AgentFlow <span>using AgentFlow</span>
            </h1>
            <p className="hero-sub" style={{ fontSize: "clamp(16px, 2vw, 20px)", maxWidth: 600, margin: "0 auto 36px" }}>
              Two AI agents shipped 28 features in 7 days. Now they&apos;re trying to sell it.
              This is the live experiment.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/book-demo" className="btn btn-primary btn-lg">
                Book a demo
              </Link>
              <Link href="/analyze" className="btn btn-secondary btn-lg">
                Analyze your repo
              </Link>
            </div>
          </div>
        </section>

        {/* Story sections */}
        <section style={{ padding: "64px 0", borderTop: "1px solid var(--border)" }}>
          <div className="container" style={{ maxWidth: 760 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>
              {STORY_SECTIONS.map(({ label, heading, body }, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "0 32px", alignItems: "start" }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      background: "rgba(99,102,241,0.15)",
                      border: "1px solid rgba(99,102,241,0.3)",
                      borderRadius: 8,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                      fontWeight: 700,
                      color: "var(--accent)",
                      flexShrink: 0,
                      marginTop: 4,
                    }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "var(--muted)",
                        marginBottom: 6,
                      }}
                    >
                      {label}
                    </p>
                    <h2 style={{ fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: 700, marginBottom: 12 }}>
                      {heading}
                    </h2>
                    <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.7 }}>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Inline analyze tool */}
        <section style={{ padding: "64px 0", borderTop: "1px solid var(--border)" }}>
          <div className="container" style={{ maxWidth: 760 }}>
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.07em",
                color: "var(--muted)",
                marginBottom: 8,
                textAlign: "center",
              }}
            >
              Try it now
            </p>
            <h2
              style={{
                fontSize: "clamp(20px, 3vw, 30px)",
                fontWeight: 700,
                textAlign: "center",
                marginBottom: 8,
              }}
            >
              What does your backlog cost?
            </h2>
            <p style={{ textAlign: "center", color: "var(--muted)", fontSize: 15, marginBottom: 40 }}>
              Paste your GitHub repo URL. See how many issues AgentFlow can close automatically.
            </p>
            <AnalyzeClient />
          </div>
        </section>

        {/* Footer */}
        <section style={{ padding: "48px 0", borderTop: "1px solid var(--border)", textAlign: "center" }}>
          <div className="container">
            <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 12 }}>
              Read how we built it:{" "}
              <Link href="/blog/how-we-built-agentflow" style={{ color: "var(--accent)" }}>
                How we built AgentFlow using AgentFlow
              </Link>
            </p>
            <p style={{ color: "var(--muted)", fontSize: 14 }}>
              Questions?{" "}
              <a href="mailto:dev@reclips.ai" style={{ color: "var(--accent)" }}>
                dev@reclips.ai
              </a>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
