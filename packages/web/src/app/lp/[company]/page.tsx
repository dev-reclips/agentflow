import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface CompanyData {
  name: string;
  slug: string;
  contactName: string;
  contactTitle: string;
  issueCount: string;
  bullets: string[];
}

const companies: Record<string, CompanyData> = {
  "trigger-dev": {
    name: "Trigger.dev",
    slug: "trigger-dev",
    contactName: "James",
    contactTitle: "CTO",
    issueCount: "800+",
    bullets: [
      "Job queue reliability — recurring failures in background job execution reported across multiple SDK versions",
      "Webhook delivery edge cases — missed events on high-throughput endpoints with no built-in retry visibility",
      "SDK type errors — TypeScript inference breaks on complex task payloads, blocking adoption of newer SDK versions",
    ],
  },
  mintlify: {
    name: "Mintlify",
    slug: "mintlify",
    contactName: "Han",
    contactTitle: "co-founder",
    issueCount: "100+",
    bullets: [
      "Docs rendering inconsistencies — MDX components behave differently in local preview vs. deployed output",
      "Config schema drift — undocumented fields silently ignored, causing confusing deploy failures",
      "Third-party integration requests — community repeatedly asks for Segment, Intercom, and PostHog embedding support",
    ],
  },
  loops: {
    name: "Loops.so",
    slug: "loops",
    contactName: "Chris",
    contactTitle: "co-founder",
    issueCount: "50+",
    bullets: [
      "Email automation edge cases — loops triggering multiple times for the same event under race conditions",
      "Integration bugs — Zapier and Make.com connectors drop attributes when payloads exceed size limits",
      "Template rendering issues — dynamic variables occasionally render as raw placeholders in live sends",
    ],
  },
  resend: {
    name: "Resend",
    slug: "resend",
    contactName: "Zeno",
    contactTitle: "CEO",
    issueCount: "200+",
    bullets: [
      "Email deliverability edge cases — SPF/DKIM alignment issues on custom domains reported by multiple enterprise users",
      "SDK edge cases — Node.js SDK throws untyped errors on non-2xx responses, making error handling brittle",
      "API pagination gaps — list endpoints return inconsistent cursor values under concurrent writes",
    ],
  },
  cal: {
    name: "Cal.com",
    slug: "cal",
    contactName: "Peer",
    contactTitle: "co-founder",
    issueCount: "500+",
    bullets: [
      "Booking flow bugs — double-booking occurs when two users select the same slot within the same second",
      "Timezone edge cases — DST transitions cause 1-hour offset errors in recurring event reminders",
      "Integration issues — Google Meet links not generated for some event types when calendar permissions are scoped",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(companies).map((slug) => ({ company: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ company: string }>;
}): Promise<Metadata> {
  const { company } = await params;
  const data = companies[company];
  if (!data) return {};
  return {
    title: `${data.name} × AgentFlow — AI Agents for GitHub Backlog Automation`,
    description: `${data.name} has ${data.issueCount} open GitHub issues. AgentFlow reads your issues, writes code, opens PRs, and merges them automatically.`,
  };
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ company: string }>;
}) {
  const { company } = await params;
  const data = companies[company];
  if (!data) notFound();

  const subject = encodeURIComponent(`Demo request - ${data.name}`);
  const mailto = `mailto:dev@reclips.ai?subject=${subject}`;

  return (
    <>
      <nav className="nav">
        <div className="container">
          <div className="nav-inner">
            <Link href="/" className="nav-logo">
              AgentFlow
            </Link>
            <div className="nav-links">
              <Link href="/#how-it-works" className="nav-text-link">
                How it works
              </Link>
              <Link href="/pricing" className="nav-text-link">
                Pricing
              </Link>
              <a href={mailto} className="btn btn-primary" style={{ fontSize: 14, padding: "8px 16px" }}>
                Schedule a Demo
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <section
          style={{
            padding: "80px 0 60px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div className="container" style={{ maxWidth: 760 }}>
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
              Personal note for {data.contactName}
            </div>

            <h1
              style={{
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: 800,
                lineHeight: 1.15,
                marginBottom: 24,
                letterSpacing: "-0.02em",
              }}
            >
              {data.name} has{" "}
              <span style={{ color: "var(--accent)" }}>{data.issueCount}</span>{" "}
              open GitHub issues
            </h1>

            <p style={{ fontSize: 18, color: "var(--muted)", marginBottom: 40, lineHeight: 1.7 }}>
              AgentFlow reads your issues, writes code, opens PRs, and merges them — end to end. Here is what it would look like for {data.name}:
            </p>

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 16, marginBottom: 48 }}>
              {data.bullets.map((bullet, i) => {
                const [title, ...rest] = bullet.split(" — ");
                return (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      gap: 16,
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius)",
                      padding: "20px 24px",
                    }}
                  >
                    <span
                      style={{
                        flexShrink: 0,
                        width: 28,
                        height: 28,
                        background: "rgba(99,102,241,0.15)",
                        border: "1px solid rgba(99,102,241,0.3)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 13,
                        fontWeight: 700,
                        color: "var(--accent)",
                        marginTop: 2,
                      }}
                    >
                      {i + 1}
                    </span>
                    <div>
                      <div style={{ fontWeight: 600, marginBottom: 4 }}>{title}</div>
                      <div style={{ color: "var(--muted)", fontSize: 15 }}>{rest.join(" — ")}</div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 16 }}>
              <a href={mailto} className="btn btn-primary btn-lg">
                Schedule a Demo →
              </a>
              <p style={{ fontSize: 14, color: "var(--muted)" }}>
                15-minute call · {data.contactName}, happy to show you a live run on {data.name}&apos;s repo
              </p>
            </div>
          </div>
        </section>

        <section style={{ padding: "60px 0" }}>
          <div className="container" style={{ maxWidth: 760 }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: 32 }}>
              How AgentFlow works
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: 20,
              }}
            >
              {[
                { step: "01", label: "Reads your issues", desc: "Analyzes open GitHub issues to understand scope and priority" },
                { step: "02", label: "Writes code", desc: "Generates a targeted fix or feature implementation" },
                { step: "03", label: "Opens a PR", desc: "Submits the change with a clear description and test coverage" },
                { step: "04", label: "Merges", desc: "Merges after your CI passes — fully autonomous or human-gated" },
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
    </>
  );
}
