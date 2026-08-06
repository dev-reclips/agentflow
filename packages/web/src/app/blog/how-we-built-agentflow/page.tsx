import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How AI Agents Built Our SaaS in 7 Days (And What They Shipped) | AgentFlow",
  description:
    "We built AgentFlow using AgentFlow. A CEO agent and a Founding Engineer agent shipped 28 issues in 7 days — multi-tenancy, billing, GitHub integration, analytics, 8 SEO pages, and more. Here's the real story.",
  openGraph: {
    title: "How AI Agents Built Our SaaS in 7 Days (And What They Shipped)",
    description:
      "We built AgentFlow using AgentFlow. A CEO agent and a Founding Engineer agent shipped 28 issues in 7 days. Here's the real story — the numbers, the surprises, and the one thing we couldn't automate.",
    url: "https://agentflow.ai/blog/how-we-built-agentflow",
    siteName: "AgentFlow",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "How AI Agents Built AgentFlow" }],
    type: "article",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How AI Agents Built Our SaaS in 7 Days (And What They Shipped)",
  description:
    "We built AgentFlow using AgentFlow. A CEO agent and a Founding Engineer agent shipped 28 issues in 7 days — multi-tenancy, billing, GitHub integration, analytics, 8 SEO pages, and more.",
  url: "https://agentflow.ai/blog/how-we-built-agentflow",
  datePublished: "2026-08-06",
  dateModified: "2026-08-06",
  author: { "@type": "Organization", name: "AgentFlow" },
  publisher: { "@type": "Organization", name: "AgentFlow", url: "https://agentflow.ai" },
  keywords: ["ai agents build saas", "build software with ai agents", "ai software development"],
};

export default function BlogPostPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
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
        <section className="hero" style={{ paddingBottom: "40px" }}>
          <div className="container" style={{ maxWidth: "720px" }}>
            <div className="hero-badge">Blog</div>
            <h1 className="hero-title" style={{ fontSize: "clamp(24px, 3.5vw, 40px)", lineHeight: 1.2 }}>
              How AI agents built our SaaS in 7 days (and what they shipped)
            </h1>
            <p style={{ color: "var(--muted)", fontSize: "14px", marginTop: "16px" }}>
              August 2026 · 10 min read
            </p>
          </div>
        </section>

        <section style={{ paddingBottom: "96px" }}>
          <div className="container" style={{ maxWidth: "720px" }}>
            <div style={{ color: "var(--muted)", fontSize: "16px", lineHeight: "1.8", display: "flex", flexDirection: "column", gap: "24px" }}>

              <p>
                AgentFlow is software that lets AI agents work through your GitHub backlog — reading issues,
                writing code, opening PRs, and marking tickets done without a human in the loop.
              </p>

              <p>
                We built AgentFlow using AgentFlow.
              </p>

              <p>
                That sentence sounds like a marketing line. It is not. The CEO is an AI agent. The founding
                engineer is an AI agent. Every line of production code in this repository was written by one
                of them. No human authored a commit. We ran the experiment because we wanted to know if
                agentic software development was real at the product level — not just for toy scripts, but for
                a full SaaS with auth, billing, integrations, and an SEO surface. Seven days later, we had
                our answer: 28 issues resolved, a working product, and a very specific list of where agents
                fall short.
              </p>

              <p>
                This is the technical post-mortem. Specific numbers, honest tradeoffs, real limitations. If
                you are considering deploying AI agents on your own backlog, this is the most honest data
                point I can give you.
              </p>

              <h2 style={{ color: "var(--text)", fontSize: "22px", fontWeight: 600, marginTop: "8px" }}>
                The setup
              </h2>

              <p>
                Two agents. One CEO, one Founding Engineer. They share a monorepo issue tracker — think
                Linear with a Paperclip API layer on top. The CEO agent creates issues, sets priority, and
                delegates. The Founding Engineer agent picks up assigned issues, checks them out (a mutex so
                two agents do not stomp each other), does the work, commits, and marks done.
              </p>

              <p>
                The human role: run the heartbeat. Every few hours, the harness wakes each agent with a
                payload describing their assigned work. The agent runs, does as much as it can in a single
                context window, then exits. No persistent process. No daemon. The "agent" is stateless between
                heartbeats — memory comes from files on disk, the issue thread, and daily notes.
              </p>

              <p>
                This matters because it means the loop is embarrassingly resumable. If an agent dies mid-task,
                the next heartbeat picks up from the last durable state. The issue thread is the source of
                truth. This design choice — heartbeat over daemon — turned out to be one of the most important
                ones we made.
              </p>

              <h2 style={{ color: "var(--text)", fontSize: "22px", fontWeight: 600, marginTop: "8px" }}>
                The numbers
              </h2>

              <p>
                28 issues closed in 7 days. Here is the breakdown by category:
              </p>

              <div style={{ overflowX: "auto" }}>
                <table style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "15px",
                  color: "var(--muted)",
                }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid var(--border)" }}>
                      <th style={{ textAlign: "left", padding: "12px 16px 12px 0", color: "var(--text)", fontWeight: 600 }}>Category</th>
                      <th style={{ textAlign: "left", padding: "12px 16px", color: "var(--text)", fontWeight: 600 }}>Issues</th>
                      <th style={{ textAlign: "left", padding: "12px 0", color: "var(--text)", fontWeight: 600 }}>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Core infrastructure", "4", "Auth, multi-tenancy, DB schema, API layer"],
                      ["Billing & payments", "2", "Stripe integration, subscription tiers, usage metering"],
                      ["GitHub integration", "3", "OAuth, webhook ingestion, issue sync"],
                      ["Analytics & dashboards", "2", "Backlog metrics, issue resolution tracking"],
                      ["SEO comparison pages", "8", "vs Devin, Copilot, Cursor, CodeRabbit, and more"],
                      ["Blog posts", "7", "Targeting backlog, AI agents, code review keywords"],
                      ["Free /analyze tool", "1", "Backlog scanner with email capture"],
                      ["Email capture & nurture", "1", "Sequence for /analyze signups"],
                      ["Onboarding checklist", "1", "In-app checklist for new users"],
                      ["Demo environment", "1", "Sandbox org with synthetic data"],
                    ].map(([cat, count, notes]) => (
                      <tr key={cat} style={{ borderBottom: "1px solid var(--border)" }}>
                        <td style={{ padding: "10px 16px 10px 0", color: "var(--text)" }}>{cat}</td>
                        <td style={{ padding: "10px 16px" }}>{count}</td>
                        <td style={{ padding: "10px 0" }}>{notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p>
                Human engineering cost: approximately zero lines of code. Human coordination cost: 10–15
                minutes per day running heartbeats and reviewing issue threads to make sure nothing was
                stuck. That is it.
              </p>

              <h2 style={{ color: "var(--text)", fontSize: "22px", fontWeight: 600, marginTop: "8px" }}>
                What the agents actually did
              </h2>

              <p>
                The loop for every issue was identical regardless of complexity:
              </p>

              <ol style={{ paddingLeft: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <li>
                  <strong>CEO creates the issue.</strong> Not a vague one-liner — a structured brief with
                  goal, acceptance criteria, technical requirements, and scope constraints. The quality of
                  the issue brief was the biggest lever on output quality. A lazy brief produced mediocre
                  output. A specific brief produced good output.
                </li>
                <li>
                  <strong>CEO assigns to Founding Engineer and sets priority.</strong>
                </li>
                <li>
                  <strong>Founding Engineer checks out the issue.</strong> Checkout is a mutex — the agent
                  POSTs to the API, gets a 200, and owns the issue. If someone else checked it out first,
                  they get a 409 and move on.
                </li>
                <li>
                  <strong>Founding Engineer reads the codebase.</strong> It does not assume anything about
                  file layout. It runs <code style={{ fontFamily: "monospace", fontSize: "14px", background: "var(--border)", padding: "2px 6px", borderRadius: "4px" }}>find</code>, reads related files, checks recent commits for
                  conventions, and builds a mental model before writing anything.
                </li>
                <li>
                  <strong>Founding Engineer writes code, commits, and marks done.</strong> Commits include
                  the issue ID in the message and <code style={{ fontFamily: "monospace", fontSize: "14px", background: "var(--border)", padding: "2px 6px", borderRadius: "4px" }}>Co-Authored-By: Paperclip</code>.
                  Done means a comment on the issue thread with a summary of what shipped, then a status
                  update to <code style={{ fontFamily: "monospace", fontSize: "14px", background: "var(--border)", padding: "2px 6px", borderRadius: "4px" }}>done</code>.
                </li>
              </ol>

              <p>
                The entire loop — from issue brief to committed code to marked done — happened without a
                human touch on the keyboard. The CEO agent ran on a separate heartbeat cadence from the
                Founding Engineer, which meant strategy and execution were decoupled. The CEO was creating
                and prioritizing while the FE was coding. It looked, from the outside, like a real team.
              </p>

              <h2 style={{ color: "var(--text)", fontSize: "22px", fontWeight: 600, marginTop: "8px" }}>
                Where agents excelled
              </h2>

              <p>
                <strong>Structured, repetitive output.</strong> The 8 comparison pages (AgentFlow vs Devin,
                Copilot, Cursor, etc.) are a perfect example. Each follows the same structure: intro,
                feature comparison table, pricing comparison, use-case fit, verdict. Once the CEO wrote a
                detailed brief for the first one, the FE could produce each subsequent page in a single
                heartbeat with consistent quality. A human would have burned out on page 3. The agent did
                not care.
              </p>

              <p>
                <strong>Following conventions already in the codebase.</strong> When the FE landed on the
                repo having never seen it, it read a few existing files and extrapolated the patterns —
                component structure, naming, CSS variables, API shape. The output was consistent with what
                was already there. This was one of the most surprising things: the agent was a better
                convention follower than most human contractors I have worked with, because it actually read
                the surrounding code before writing.
              </p>

              <p>
                <strong>Not breaking existing functionality.</strong> Because the agent scoped its changes
                narrowly — it only touched files relevant to the current issue — there were very few
                regressions. It did not refactor things it was not asked to refactor. It did not
                "while I'm here" itself into unrelated files. This is a discipline that human engineers
                frequently lack.
              </p>

              <p>
                <strong>Writing boilerplate that humans hate.</strong> Auth flows, email templates, Stripe
                webhook handlers, SEO metadata, structured data JSON-LD — all of it got done with zero
                complaints. This is the category where agents are unambiguously better: high-volume,
                pattern-based work that requires care but not creativity.
              </p>

              <h2 style={{ color: "var(--text)", fontSize: "22px", fontWeight: 600, marginTop: "8px" }}>
                Where agents needed guidance
              </h2>

              <p>
                <strong>Strategy and prioritization.</strong> The CEO agent set the roadmap, but the roadmap
                itself required a human to validate. The agent's instinct was to build a complete feature
                before moving on — correct engineering discipline, wrong startup posture. Left alone, it
                would have spent three days on a perfect multi-tenancy implementation before we had a single
                paying user to validate it. We had to explicitly constrain scope in issue briefs: "MVP only,
                no edge cases for now."
              </p>

              <p>
                <strong>Ambiguous requirements.</strong> When an issue brief was underspecified, the agent
                made a choice and shipped it. Sometimes that was fine. Sometimes it was wrong in ways that
                were not immediately obvious — a UI that looked right but had a subtle flow problem, or
                an API design that worked but made the next feature harder to add. The agent cannot tell
                you the thing you forgot to specify. It will confidently fill the gap with something
                reasonable-looking.
              </p>

              <p>
                <strong>Cross-issue consistency.</strong> Each heartbeat is a fresh context window. The agent
                has memory files, but those files only contain what a previous agent thought was worth
                persisting. Decisions made in issue ANI-12 are not automatically visible in ANI-27 unless
                someone wrote them down. A few times we noticed the FE re-implementing something slightly
                differently from how it had done it in an earlier issue. Not broken, but not consistent.
                We added a "conventions" memory file mid-experiment which helped.
              </p>

              <p>
                <strong>Knowing when to ask vs. guess.</strong> This is the hardest one. A junior human
                engineer, when stuck, asks a question. Our agents, by default, picked the most plausible
                interpretation and shipped it. That is usually fine for well-specified issues. For
                genuinely ambiguous ones — "add analytics" with no further detail — the agent built
                something, but not necessarily the thing we would have built if we had been consulted.
                We had to explicitly instruct agents to post a question on the issue thread before writing
                code when they hit ambiguity.
              </p>

              <h2 style={{ color: "var(--text)", fontSize: "22px", fontWeight: 600, marginTop: "8px" }}>
                The constraint we could not automate
              </h2>

              <p>
                Distribution.
              </p>

              <p>
                We can build the product with agents. We can write the SEO content with agents. We can
                instrument analytics, run A/B tests, and optimize conversion funnels with agents. None of
                that matters until people are actually reading the site.
              </p>

              <p>
                Posting to Hacker News, getting into the right Slack channels, getting a tech journalist
                to write about you — these require social capital that agents do not have and cannot
                acquire. The agent can write a perfect Show HN post. But someone with karma and credibility
                in that community needs to submit it. An agent submitting from an account with no history
                gets flagged and buried.
              </p>

              <p>
                The same applies to cold outreach. The agent can write a sharp email. It cannot build the
                relationship that makes someone actually reply. Human trust is still earned by humans.
              </p>

              <p>
                This is the honest limit: agentic AI software development gets you to a product. It does
                not get you to customers. You still need a human to bridge that gap — at least for now.
              </p>

              <h2 style={{ color: "var(--text)", fontSize: "22px", fontWeight: 600, marginTop: "8px" }}>
                What this means for your backlog
              </h2>

              <p>
                If AI agents can build a full SaaS from scratch in 7 days, they can clear your GitHub
                backlog. The math is not complicated. You have 200 open issues. Maybe 60% of them are
                the kind of work — bug fixes, dependency updates, test coverage, documentation, small
                features — that agents handle reliably. That is 120 issues your team could stop carrying.
              </p>

              <p>
                The part that needs human judgment: the 40% that require real architectural decisions, the
                ambiguous product calls, the things that should not be done at all. Those need you. But
                the other 60% — the pile of valid, understood, just-never-prioritized work — that pile
                is exactly what autonomous agents are for.
              </p>

              <p>
                We built AgentFlow to make this accessible without the harness setup overhead we went
                through. Connect your GitHub repository, and AgentFlow starts working through your issues
                the same way our Founding Engineer agent worked through ours: checkout, read, code,
                commit, done.
              </p>

              <p>
                If you want to see what your backlog looks like through that lens — how many issues are
                agent-ready, what the resolution rate might look like, where the complexity clusters —{" "}
                <Link href="/analyze" style={{ color: "var(--accent)", textDecoration: "none" }}>
                  the free backlog analyzer
                </Link>
                {" "}scans your repository and gives you a breakdown in under two minutes. No account
                required, no commit access needed.
              </p>

              <p style={{ borderLeft: "3px solid var(--accent)", paddingLeft: "16px", fontStyle: "italic" }}>
                The most surprising thing we learned: the bottleneck in agentic development is not the
                agents. It is the quality of the issue briefs. Write a vague issue, get vague output.
                Write a specific issue with clear acceptance criteria, and the agent delivers something
                you would be happy to review from a junior engineer. The skill that matters most is the
                same one that always mattered: knowing precisely what you want to build.
              </p>

              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginTop: "16px" }}>
                <Link href="/analyze" className="btn btn-primary">
                  Analyze your backlog free →
                </Link>
                <Link href="/pricing" className="btn btn-secondary">
                  See pricing
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
            <a href="/security">Security & Privacy</a>
          </p>
        </div>
      </footer>
    </>
  );
}
