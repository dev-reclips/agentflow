import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const COMPANIES: Record<
  string,
  {
    name: string;
    personName: string;
    personTitle: string;
    issueCount: string;
    repo: string;
    bullets: string[];
  }
> = {
  "trigger-dev": {
    name: "Trigger.dev",
    personName: "James Ritchie",
    personTitle: "CTO",
    issueCount: "800",
    repo: "triggerdotdev/trigger.dev",
    bullets: [
      "Job queue reliability — intermittent failures in long-running background jobs causing retries to pile up across production workloads",
      "Webhook failures — delivery errors silently dropped with no dead-letter queue surfaced to users, leading to lost events",
      "SDK bugs — edge cases in the TypeScript client breaking task scheduling for complex multi-step workflow definitions",
    ],
  },
  mintlify: {
    name: "Mintlify",
    personName: "Han Wang",
    personTitle: "co-founder",
    issueCount: "100",
    repo: "mintlify/mintlify",
    bullets: [
      "Docs rendering — MDX components not hydrating correctly inside nested code blocks on certain page templates",
      "Config issues — invalid mint.json silently breaking deployments without surfacing a useful error to users",
      "Integration requests — Docusaurus and Sphinx import tools repeatedly requested by teams migrating to Mintlify",
    ],
  },
  loops: {
    name: "Loops.so",
    personName: "Chris Frantz",
    personTitle: "co-founder",
    issueCount: "50",
    repo: "loops-so/loops",
    bullets: [
      "Email automation edge cases — sequences firing twice for users who re-subscribe mid-campaign, causing duplicate sends",
      "Integration bugs — Slack and Stripe webhook handlers dropping events under high concurrency with no retry path",
      "Template issues — custom Liquid variables not interpolating inside conditional blocks in complex email templates",
    ],
  },
  resend: {
    name: "Resend",
    personName: "Zeno Rocha",
    personTitle: "CEO",
    issueCount: "200",
    repo: "resendlabs/resend",
    bullets: [
      "Email deliverability — SPF/DKIM edge cases surfacing as silent bounces in certain ISP routing configurations",
      "SDK edge cases — batch send returning partial success without a structured error payload clients can act on",
      "API issues — rate-limit headers missing from 429 responses, breaking exponential-backoff retry logic in client libraries",
    ],
  },
  cal: {
    name: "Cal.com",
    personName: "Peer Richelsen",
    personTitle: "co-founder",
    issueCount: "500",
    repo: "calcom/cal.com",
    bullets: [
      "Booking flow bugs — double-bookings slipping through when two guests confirm the same slot within milliseconds",
      "Timezone edge cases — DST transitions shifting recurring event times by an hour for specific region combinations",
      "Integration issues — Google Calendar sync intermittently failing for users with multiple connected accounts and shared calendars",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(COMPANIES).map((company) => ({ company }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ company: string }>;
}): Promise<Metadata> {
  const { company } = await params;
  const data = COMPANIES[company];
  if (!data) return {};
  return {
    title: `${data.name} × AgentFlow — Clear your GitHub backlog with AI`,
    description: `${data.name} has ${data.issueCount}+ open GitHub issues. AgentFlow deploys AI agents to read your issues, write code, open PRs, and merge them autonomously.`,
    robots: { index: false, follow: false },
  };
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ company: string }>;
}) {
  const { company } = await params;
  const data = COMPANIES[company];
  if (!data) notFound();

  const mailtoHref = `mailto:dev@reclips.ai?subject=Demo%20request%20-%20${encodeURIComponent(data.name)}`;

  return (
    <>
      <nav className="nav">
        <div className="container nav-inner">
          <Link href="/" className="nav-logo" style={{ textDecoration: "none" }}>
            AgentFlow
          </Link>
          <div className="nav-links">
            <a href={mailtoHref} className="btn btn-primary" style={{ padding: "8px 16px", fontSize: "14px" }}>
              Schedule a demo
            </a>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section className="hero" style={{ paddingBottom: 0 }}>
          <div className="container">
            <div className="hero-badge">
              {data.repo}
            </div>
            <h1 className="hero-title">
              {data.name} has{" "}
              <span>{data.issueCount}+</span>
              <br />
              open GitHub issues
            </h1>
            <p className="hero-sub">
              AgentFlow reads your issues, writes code, opens PRs, and merges them — so {data.personName}&rsquo;s team ships features instead of clearing backlog.
            </p>
            <div className="hero-cta" style={{ marginBottom: 64 }}>
              <a href={mailtoHref} className="btn btn-primary btn-lg">
                Schedule a demo →
              </a>
              <Link href="/analyze" className="btn btn-secondary btn-lg">
                Analyze {data.name}&rsquo;s backlog
              </Link>
            </div>
          </div>
        </section>

        {/* Personalized analysis */}
        <section style={{ padding: "80px 0", borderTop: "1px solid var(--border)" }}>
          <div className="container">
            <p className="section-label">Hardcoded analysis — {data.name}</p>
            <h2 className="section-title">
              Here&rsquo;s what AgentFlow would fix first
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 20,
                maxWidth: 720,
                margin: "0 auto",
              }}
            >
              {data.bullets.map((bullet, i) => {
                const [label, detail] = bullet.split(" — ");
                return (
                  <div
                    key={i}
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderRadius: 12,
                      padding: "24px 28px",
                      display: "flex",
                      gap: 20,
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        flexShrink: 0,
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: "var(--accent)",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        fontSize: 14,
                      }}
                    >
                      {i + 1}
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: 15, marginBottom: 6 }}>
                        {label}
                      </p>
                      <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.7 }}>
                        {detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="features">
          <div className="container">
            <p className="section-label">How AgentFlow works</p>
            <h2 className="section-title">From issue to merged PR, end-to-end</h2>
            <div className="steps-grid">
              <div className="step-card">
                <div className="step-num">1</div>
                <h3 className="feature-title">Reads your issues</h3>
                <p className="feature-desc">
                  Agents pull full context from {data.name}&rsquo;s GitHub issues — comments, labels, linked PRs — and build a plan before writing a single line of code.
                </p>
              </div>
              <div className="step-card">
                <div className="step-num">2</div>
                <h3 className="feature-title">Writes the code</h3>
                <p className="feature-desc">
                  Agents implement the fix in your codebase, run your test suite, and iterate until CI passes. No hand-holding required.
                </p>
              </div>
              <div className="step-card">
                <div className="step-num">3</div>
                <h3 className="feature-title">Opens &amp; merges PRs</h3>
                <p className="feature-desc">
                  Agents open a PR with a full description, respond to review feedback, and merge when approved. Your team reviews; the agent does the rest.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-box">
              <h2 className="cta-title">
                Let&rsquo;s clear {data.name}&rsquo;s backlog together
              </h2>
              <p className="cta-sub">
                {data.personName} — reply to this link or email us directly. We&rsquo;ll set up a live demo on {data.name}&rsquo;s own repo in under 30 minutes.
              </p>
              <a href={mailtoHref} className="btn btn-primary btn-lg">
                Schedule a demo →
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>
            &copy; 2026 AgentFlow &middot;{" "}
            <Link href="/">Home</Link> &middot;{" "}
            <Link href="/pricing">Pricing</Link> &middot;{" "}
            <Link href="/analyze">Free Analyzer</Link> &middot;{" "}
            <a href={mailtoHref}>Contact us</a>
          </p>
        </div>
      </footer>
    </>
  );
}
