import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Demo — AgentFlow",
  description:
    "See AgentFlow close a real GitHub issue in 20 minutes. We connect to your repo, run an agent on a real issue, and show you the PR it opens. No commitment.",
};

const MAILTO =
  "mailto:dev@reclips.ai?subject=AgentFlow+Demo+Request&body=Hi%2C%20I%27d+like+to+see+a+demo+of+AgentFlow+for+[Company+Name].+Best+time+for+me%3A+[time+slot].";

export default function BookDemoPage() {
  return (
    <>
      <nav className="nav">
        <div className="container nav-inner">
          <Link href="/" className="nav-logo" style={{ textDecoration: "none" }}>
            AgentFlow
          </Link>
          <div className="nav-links">
            <Link href="/#how-it-works" className="nav-text-link">
              How it works
            </Link>
            <Link href="/pricing" className="nav-text-link">
              Pricing
            </Link>
            <Link href="/register" className="btn btn-primary" style={{ padding: "8px 16px", fontSize: "14px" }}>
              Start free trial
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <section style={{ padding: "80px 0 60px", borderBottom: "1px solid var(--border)" }}>
          <div className="container" style={{ maxWidth: 680 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 20,
                padding: "4px 14px",
                fontSize: 13,
                color: "var(--muted)",
                marginBottom: 28,
              }}
            >
              <span style={{ color: "var(--accent)" }}>●</span>
              Free · No commitment · 20 minutes
            </div>

            <h1
              style={{
                fontSize: "clamp(1.75rem, 4.5vw, 2.75rem)",
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                marginBottom: 20,
              }}
            >
              See AgentFlow close a real GitHub issue —{" "}
              <span style={{ color: "var(--accent)" }}>20 minutes</span>
            </h1>

            <p style={{ fontSize: 18, color: "var(--muted)", lineHeight: 1.7, marginBottom: 48 }}>
              We will connect AgentFlow to one of your repos, run an agent on a real issue, and show you the PR it opens. No commitment, no credit card.
            </p>

            {/* Social proof bullets */}
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                marginBottom: 48,
              }}
            >
              {[
                "Live agent run on your real repo",
                "20 minutes",
                "No commitment",
              ].map((item) => (
                <li
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    fontSize: 16,
                  }}
                >
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      background: "rgba(99,102,241,0.15)",
                      border: "1px solid rgba(99,102,241,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontSize: 12,
                      color: "var(--accent)",
                      fontWeight: 700,
                    }}
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            {/* Primary CTA */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 16 }}>
              <a href={MAILTO} className="btn btn-primary btn-lg">
                Email to book →
              </a>
              <p style={{ fontSize: 14, color: "var(--muted)" }}>
                Opens your email client with subject and body pre-filled. Reply within one business day.
              </p>
            </div>

            {/* Secondary CTA — Calendly placeholder for when calendar link is set up */}
            {/* TODO: replace this div with a Calendly embed once the board sets up a calendar link */}
            <div id="calendly-placeholder" style={{ marginTop: 48 }} />
          </div>
        </section>

        {/* How it works */}
        <section style={{ padding: "60px 0" }}>
          <div className="container" style={{ maxWidth: 680 }}>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: 28 }}>
              What happens in the demo
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: 16,
              }}
            >
              {[
                { step: "01", label: "Connect your repo", desc: "We point AgentFlow at a real GitHub repo you own" },
                { step: "02", label: "Pick an issue", desc: "You choose an open issue — bug, feature, or chore" },
                { step: "03", label: "Watch the agent run", desc: "Agent reads the issue, writes code, and opens a PR live" },
                { step: "04", label: "Ask anything", desc: "Q&A — pricing, security, integrations, whatever you need" },
              ].map(({ step, label, desc }) => (
                <div
                  key={step}
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    padding: "20px",
                  }}
                >
                  <div style={{ fontSize: 12, color: "var(--accent)", fontWeight: 700, marginBottom: 8 }}>
                    {step}
                  </div>
                  <div style={{ fontWeight: 600, marginBottom: 6 }}>{label}</div>
                  <div style={{ fontSize: 14, color: "var(--muted)" }}>{desc}</div>
                </div>
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
            <a href="/pricing">Pricing</a> ·{" "}
            <a href="/analyze">Free Analyzer</a> ·{" "}
            <a href="/docs">Docs</a>
          </p>
        </div>
      </footer>
    </>
  );
}
