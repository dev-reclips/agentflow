import Link from "next/link";
import type { Metadata } from "next";
import AnalyzeClient from "./AnalyzeClient";

export const metadata: Metadata = {
  title: "GitHub Backlog Analyzer — AgentFlow | Free Tool",
  description:
    "Paste your public GitHub repo URL and instantly see how many issues AgentFlow can automate, how many hours it saves, and what it costs you today.",
  openGraph: {
    title: "GitHub Backlog Analyzer — Free Tool by AgentFlow",
    description:
      "See how many GitHub issues AgentFlow can close automatically. Free tool — no sign-up required.",
    url: "https://agentflow.ai/analyze",
    siteName: "AgentFlow",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "GitHub Backlog Analyzer" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GitHub Backlog Analyzer — Free Tool by AgentFlow",
    description:
      "See how many GitHub issues AgentFlow can close automatically. Free tool — no sign-up required.",
    images: ["/og-image.png"],
  },
};

export default function AnalyzePage() {
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
        <section className="hero" style={{ paddingBottom: "48px" }}>
          <div className="container">
            <div className="hero-badge">Free Tool</div>
            <h1 className="hero-title" style={{ fontSize: "clamp(28px, 4vw, 52px)" }}>
              GitHub <span>Backlog Analyzer</span>
            </h1>
            <p className="hero-sub">
              Paste your public GitHub repo URL. See exactly how many open issues AgentFlow can handle — and how many hours you're losing each month.
            </p>
          </div>
        </section>

        <section style={{ paddingBottom: "96px" }}>
          <div className="container">
            <AnalyzeClient demoMode />
          </div>
        </section>

        {/* How it works */}
        <section style={{ padding: "64px 0", borderTop: "1px solid var(--border)" }}>
          <div className="container" style={{ maxWidth: 720 }}>
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
              How it works
            </p>
            <h2
              style={{
                fontSize: "clamp(22px, 3vw, 32px)",
                fontWeight: 700,
                textAlign: "center",
                marginBottom: 48,
              }}
            >
              From backlog to closed PR — automatically
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: 24,
              }}
            >
              {[
                { step: "1", title: "Connect your repo", desc: "Link your GitHub repo during your free trial. Works on public and private repos." },
                { step: "2", title: "Agent reads the issue", desc: "AgentFlow reads the issue title, description, and labels to understand the task." },
                { step: "3", title: "Agent writes the code", desc: "The agent clones the repo, makes the change, and runs your CI checks." },
                { step: "4", title: "PR opened, ticket closed", desc: "A draft PR lands for your review. Merge it and the issue closes automatically." },
              ].map(({ step, title, desc }) => (
                <div
                  key={step}
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      background: "rgba(99,102,241,0.15)",
                      border: "1px solid rgba(99,102,241,0.3)",
                      borderRadius: 8,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                      fontWeight: 700,
                      color: "var(--accent)",
                    }}
                  >
                    {step}
                  </div>
                  <p style={{ fontWeight: 600, fontSize: 15 }}>{title}</p>
                  <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.5 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section style={{ padding: "64px 0 96px", textAlign: "center" }}>
          <div className="container">
            <h2 style={{ fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 700, marginBottom: 16 }}>
              Ready to clear your backlog?
            </h2>
            <p style={{ color: "var(--muted)", marginBottom: 32, fontSize: 16 }}>
              14-day free trial. No credit card required. Cancel any time.
            </p>
            <Link href="/register" className="btn btn-primary btn-lg">
              Start your free trial
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
