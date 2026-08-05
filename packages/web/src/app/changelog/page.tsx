import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AgentFlow Changelog — Product Updates and New Features",
  description:
    "Track every new feature, improvement, and milestone shipped in AgentFlow. Updated regularly as we build toward full backlog automation.",
  openGraph: {
    title: "AgentFlow Changelog — Product Updates and New Features",
    description:
      "Track every new feature, improvement, and milestone shipped in AgentFlow. Updated regularly as we build toward full backlog automation.",
    url: "https://agentflow.ai/changelog",
    siteName: "AgentFlow",
    type: "website",
  },
};

interface ChangelogEntry {
  date: string;
  version: string;
  title: string;
  bullets: string[];
}

const entries: ChangelogEntry[] = [
  {
    date: "August 2026",
    version: "v0.8",
    title: "Demo environment for sales",
    bullets: [
      "Launched a fully isolated demo environment at /demo — prospects can watch agents close real issues without signing up.",
      "Added an interactive DemoPlayer component with a scripted run that completes in under 2 minutes.",
      "Sales team can now share a single link instead of scheduling live walkthroughs.",
    ],
  },
  {
    date: "August 2026",
    version: "v0.7",
    title: "PostHog analytics + conversion tracking",
    bullets: [
      "Integrated PostHog for product analytics across the marketing site and dashboard.",
      "Added funnel tracking from landing page → signup → first agent run → paid conversion.",
      "Custom events on key actions: issue assigned, PR opened, plan approved, checkout completed.",
    ],
  },
  {
    date: "July 2026",
    version: "v0.6",
    title: "Stripe billing + subscription management",
    bullets: [
      "Wired up Stripe Checkout and Customer Portal — teams can subscribe, upgrade, and cancel without contacting us.",
      "Starter ($499/mo) and Growth ($1,499/mo) plans are now self-serve with 14-day free trials.",
      "Billing state synced to the dashboard via Stripe webhooks; agents are gated on active subscriptions.",
    ],
  },
  {
    date: "July 2026",
    version: "v0.5",
    title: "Multi-repo support",
    bullets: [
      "Teams can now connect multiple GitHub repositories to a single AgentFlow workspace.",
      "Agents are scoped per repo — issues from Repo A never bleed into agents working Repo B.",
      "Repo selector added to the issues board; connection flow handles multiple OAuth grants cleanly.",
    ],
  },
  {
    date: "July 2026",
    version: "v0.4",
    title: "GitHub App private key auth",
    bullets: [
      "Migrated GitHub integration from personal OAuth tokens to a proper GitHub App with private key signing.",
      "Tokens now scoped to exactly the repos a team connects — no broader org access.",
      "Installation flow reduced to three clicks; old OAuth connections auto-migrated with no user action required.",
    ],
  },
  {
    date: "June 2026",
    version: "v0.3",
    title: "Web dashboard with issues board",
    bullets: [
      "Shipped the core dashboard: a Kanban-style issues board where teams assign GitHub issues to agents.",
      "Live status updates as agents move issues through plan → in progress → PR opened → done.",
      "Agent run logs visible inline so teams can see exactly what the agent did and why.",
    ],
  },
  {
    date: "June 2026",
    version: "v0.2",
    title: "Self-serve signup and onboarding",
    bullets: [
      "Launched /register with GitHub OAuth — teams go from zero to first agent run in under 5 minutes.",
      "Step-by-step onboarding: connect GitHub, select a repo, create your first agent, assign an issue.",
      "Welcome email sequence triggered on signup with setup tips and a link to book a live demo.",
    ],
  },
];

export default function ChangelogPage() {
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
            <div className="hero-badge">Changelog</div>
            <h1 className="hero-title" style={{ fontSize: "clamp(28px, 4vw, 48px)" }}>
              What we&apos;ve <span>shipped.</span>
            </h1>
            <p className="hero-sub">
              Every feature, fix, and milestone — in reverse order. We ship weekly.
            </p>
          </div>
        </section>

        <section style={{ paddingBottom: "96px" }}>
          <div className="container" style={{ maxWidth: "720px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {entries.map((entry, i) => (
                <div
                  key={i}
                  style={{
                    borderTop: "1px solid var(--border)",
                    padding: "36px 0",
                    display: "grid",
                    gridTemplateColumns: "160px 1fr",
                    gap: "24px",
                  }}
                >
                  <div style={{ paddingTop: "2px" }}>
                    <span
                      style={{
                        display: "inline-block",
                        fontSize: "11px",
                        fontWeight: 600,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: "var(--accent)",
                        background: "color-mix(in srgb, var(--accent) 12%, transparent)",
                        border: "1px solid color-mix(in srgb, var(--accent) 25%, transparent)",
                        borderRadius: "6px",
                        padding: "3px 8px",
                        marginBottom: "8px",
                      }}
                    >
                      {entry.version}
                    </span>
                    <p style={{ fontSize: "13px", color: "var(--muted)", margin: 0 }}>{entry.date}</p>
                  </div>
                  <div>
                    <h2 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "16px", color: "var(--text)" }}>
                      {entry.title}
                    </h2>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                      {entry.bullets.map((bullet, j) => (
                        <li
                          key={j}
                          style={{
                            fontSize: "15px",
                            color: "var(--muted)",
                            lineHeight: "1.65",
                            paddingLeft: "16px",
                            position: "relative",
                          }}
                        >
                          <span
                            style={{
                              position: "absolute",
                              left: 0,
                              top: "9px",
                              width: "4px",
                              height: "4px",
                              borderRadius: "50%",
                              background: "var(--accent)",
                            }}
                          />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
              <div style={{ borderTop: "1px solid var(--border)" }} />
            </div>

            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                padding: "28px 32px",
                marginTop: "40px",
              }}
            >
              <p style={{ fontWeight: 600, fontSize: "16px", marginBottom: "8px" }}>Stay in the loop</p>
              <p style={{ color: "var(--muted)", fontSize: "14px", marginBottom: "20px" }}>
                Get notified when we ship new features. No spam — just a short note when something worth knowing lands.
              </p>
              <a
                href="mailto:dev@reclips.ai?subject=AgentFlow changelog updates"
                className="btn btn-secondary"
                style={{ fontSize: "14px", padding: "8px 16px" }}
              >
                Subscribe to updates
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
            <a href="/pricing">Pricing</a> ·{" "}
            <a href="/changelog">Changelog</a> ·{" "}
            <a href="/security">Security & Privacy</a>
          </p>
        </div>
      </footer>
    </>
  );
}
