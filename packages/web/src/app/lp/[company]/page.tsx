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
  dub: {
    name: "Dub.co",
    slug: "dub",
    contactName: "Steven",
    contactTitle: "founder",
    issueCount: "160+",
    bullets: [
      "Playwright test migrations (#4298–4300) — three open issues to migrate API integration tests to Playwright, pure mechanical work with no design ambiguity",
      "Analytics edge cases — click attribution drops on redirects with non-standard UTM parameters, affecting campaign measurement accuracy",
      "SDK type gaps — TypeScript types for workspace and UTM template APIs are incomplete, blocking typed client usage in strict codebases",
    ],
  },
  posthog: {
    name: "PostHog",
    slug: "posthog",
    contactName: "James",
    contactTitle: "CEO",
    issueCount: "6,084",
    bullets: [
      "Session recording gaps — recordings truncate or drop entirely on SPAs using hash-based routing, silently losing up to 20% of user sessions with no error surfaced to the dashboard",
      "ClickHouse query timeouts — funnel and retention queries on event tables with 90+ days of data hit the 30-second timeout in standard self-hosted Docker deployments, blocking analytics for high-volume customers",
      "Feature flag SDK inconsistency — React SDK caches flag values across user sessions when distinctId changes without a full page reload, causing new users to see stale flag state after login",
    ],
  },
  grafana: {
    name: "Grafana",
    slug: "grafana",
    contactName: "Raj",
    contactTitle: "CEO",
    issueCount: "820+",
    bullets: [
      "Dashboard variable propagation failures — template variables in linked panels don't refresh when parent variable changes, causing stale data to display silently without user-visible errors",
      "Alerting multi-dimensional query edge cases — alert rules on high-cardinality label sets fire duplicate notifications when series flap across evaluation windows, creating alert fatigue for oncall teams",
      "Plugin upgrade compatibility breaks — community data source plugins lose authentication config silently after minor Grafana version bumps, requiring manual reconfiguration with no migration path",
    ],
  },
  supabase: {
    name: "Supabase",
    slug: "supabase",
    contactName: "Ant",
    contactTitle: "CTO",
    issueCount: "1,253",
    bullets: [
      "Row Level Security edge cases — RLS policies using `auth.uid()` inside transactions silently return empty result sets instead of erroring, causing data-visibility bugs in multi-tenant apps with no server-side indication of the failure",
      "Realtime subscription reliability — channels disconnect silently on mobile clients when the network switches between wifi and cellular, requiring manual reconnect logic that most teams only discover after user complaints",
      "CLI migration conflicts — `supabase db push` throws constraint violation errors when a migration references a function not yet in scope, blocking automated deployment pipelines with an error message that doesn't identify the offending file",
    ],
  },
  plane: {
    name: "Plane",
    slug: "plane",
    contactName: "Vihar",
    contactTitle: "CTO",
    issueCount: "1,004",
    bullets: [
      "Cycle analytics sync lag — issues added to an active cycle don't update the burndown chart until a full page reload, making sprint velocity data unreliable for teams checking progress mid-cycle",
      "Webhook delivery failures — state-change webhooks fail silently when the target URL returns a non-200 response, with no failure log surfaced in the UI and no automatic retry, causing integrations to drift out of sync",
      "GitHub import label loss — issues imported from GitHub drop custom labels when label names contain colons or slashes, silently discarding triage metadata that teams rely on for prioritization",
    ],
  },
  infisical: {
    name: "Infisical",
    slug: "infisical",
    contactName: "Maidul",
    contactTitle: "co-founder",
    issueCount: "712",
    bullets: [
      "Secret reference resolution hang — circular references between environments cause the CLI to spin indefinitely instead of returning an actionable error, blocking CI/CD pipelines until the process is manually killed",
      "Kubernetes operator sync gaps — secrets don't re-sync after rotation when the target pod hasn't restarted, creating stale-secret drift in long-running deployments that's invisible until an auth failure surfaces in production",
      "RBAC metadata leak — users with viewer permissions on one project can enumerate secret names (not values) in sibling projects via the API's metadata endpoint, violating the principle of least privilege in multi-team organizations",
    ],
  },
  liveblocks: {
    name: "Liveblocks",
    slug: "liveblocks",
    contactName: "Steven",
    contactTitle: "CTO",
    issueCount: "300+",
    bullets: [
      "Presence sync drift on reconnect — awareness states don't reliably restore when clients reconnect after a network interruption, causing stale presence indicators for other collaborators until they manually refresh",
      "Storage conflict resolution edge case — Yjs conflict merges produce incorrect state on high-frequency concurrent list mutations, silently corrupting document state with no error surfaced to the client",
      "TypeScript inference gaps — schema type inference doesn't cover nested LiveMap and LiveList mutation patterns, forcing teams to cast to `any` in production code and losing type safety for collaborative state",
    ],
  },
  tinybird: {
    name: "Tinybird",
    slug: "tinybird",
    contactName: "Alejandro",
    contactTitle: "CTO",
    issueCount: "400+",
    bullets: [
      "Pipe dependency ordering failures — data pipes with cross-dependencies fail with ambiguous errors when upstream pipes aren't materialized yet, requiring manual deploy ordering that breaks automated CI pipelines",
      "Rate limit response missing Retry-After header — API endpoints return 429 with no Retry-After header, making client-side backoff implementations guesswork and causing cascading retry storms under load",
      "CLI workspace context leak — `tb push` applies migrations to the wrong workspace when TINYBIRD_TOKEN is set in both environment and config file, with no warning displayed before overwriting production data",
    ],
  },
  nango: {
    name: "Nango",
    slug: "nango",
    contactName: "Bastian",
    contactTitle: "CTO",
    issueCount: "500+",
    bullets: [
      "OAuth token refresh race condition — concurrent API requests fire multiple refresh calls when the access token expires simultaneously, causing the first refresh to succeed and subsequent ones to fail with invalid_grant errors that terminate the sync",
      "Sync checkpoint loss on temporary failure — integration syncs restart from page 0 instead of resuming from the last checkpoint after a transient fetch error, causing unnecessary re-ingestion of already-processed records and duplicates downstream",
      "Webhook signature verification gaps — several integrations skip HMAC verification for non-standard payload formats (e.g. multipart/form-data events from Shopify and Stripe), silently accepting potentially forged events",
    ],
  },
  documenso: {
    name: "Documenso",
    slug: "documenso",
    contactName: "Timur",
    contactTitle: "CTO",
    issueCount: "300+",
    bullets: [
      "PDF field positioning drift — signature and text fields shift by 2–5px on certain PDF versions with embedded fonts or non-standard page sizes, causing misaligned signature blocks on signed documents that fail legal verification",
      "Completion email race condition — signing-complete notification emails send before the final sealed PDF is fully generated and attached, causing recipients to receive emails with missing or corrupted attachments",
      "Team invitation stale after email change — pending team invites remain valid after the invitee changes their email address in their auth provider, allowing the original email to accept an invite belonging to a different identity",
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
