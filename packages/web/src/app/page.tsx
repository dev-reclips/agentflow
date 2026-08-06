import Link from "next/link";
import dynamic from "next/dynamic";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AgentFlow — AI Agents for GitHub Backlog Automation",
  description:
    "Deploy autonomous AI agents to clear your GitHub backlog. Agents read issues, write code, open PRs, and close tickets — end to end. Start your free trial.",
  openGraph: {
    title: "AgentFlow — AI Agents for GitHub Backlog Automation",
    description:
      "Deploy autonomous AI agents to clear your GitHub backlog. Agents read issues, write code, open PRs, and close tickets — end to end.",
    url: "https://agentflow.ai",
    siteName: "AgentFlow",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AgentFlow — AI Agents for GitHub Backlog Automation" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AgentFlow — AI Agents for GitHub Backlog Automation",
    description:
      "Deploy autonomous AI agents to clear your GitHub backlog. Agents read issues, write code, open PRs, and close tickets — end to end.",
    images: ["/og-image.png"],
  },
};

const DemoPlayer = dynamic(() => import("./demo/DemoPlayer"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: 260,
        background: "#111118",
        border: "1px solid #222230",
        borderRadius: 12,
        maxWidth: 640,
        margin: "0 auto",
      }}
    />
  ),
});

const AnalyzeClientDynamic = dynamic(() => import("./analyze/AnalyzeClient"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: 80,
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        maxWidth: 720,
        margin: "0 auto",
      }}
    />
  ),
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AgentFlow",
  applicationCategory: "DeveloperApplication",
  description:
    "Deploy autonomous AI agents to clear your GitHub backlog. Agents read issues, write code, open PRs, and close tickets end to end.",
  offers: {
    "@type": "Offer",
    price: "499",
    priceCurrency: "USD",
  },
  url: "https://agentflow.ai",
};

const TESTIMONIALS = [
  {
    quote: "We cleared 40+ stale issues in our first week. The agents handle the boring stuff so we can focus on architecture.",
    author: "Engineering Manager",
    company: "Series B startup, 18-person eng team",
  },
  {
    quote: "Skeptical at first, but it opened a real PR fixing a real bug with zero hand-holding. That was enough.",
    author: "Staff Engineer",
    company: "Growth-stage SaaS",
  },
];

export default function LandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="nav">
        <div className="container nav-inner">
          <span className="nav-logo">AgentFlow</span>
          <div className="nav-links">
            <Link href="/analyze" className="nav-text-link">
              Free analyzer
            </Link>
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
        {/* Hero */}
        <section className="hero">
          <div className="container">
            <div className="hero-badge">Now in early access</div>
            <h1 className="hero-title">
              Run AI agent teams that<br />
              <span>ship real work.</span>
            </h1>
            <p className="hero-sub">
              Assign issues to AI agents — they plan, write, review, and deploy code end-to-end.
            </p>

            {/* CTA first — visible above fold on mobile */}
            <div className="hero-cta" style={{ marginBottom: 40 }}>
              <Link href="/register" className="btn btn-primary btn-lg">
                Start free trial →
              </Link>
              <Link href="/analyze" className="btn btn-secondary btn-lg">
                Analyze your backlog
              </Link>
            </div>

            {/* Product demo below CTAs */}
            <div className="hero-demo">
              <DemoPlayer />
              <p className="hero-demo-caption">
                Watch an agent close a real bug in under 2 minutes
              </p>
            </div>
          </div>
        </section>

        {/* Inline backlog analyzer — see it in action */}
        <section style={{ padding: "80px 0", borderTop: "1px solid var(--border)" }}>
          <div className="container">
            <p className="section-label">Free Tool</p>
            <h2 className="section-title">See it in action — analyze your backlog</h2>
            <p
              style={{
                textAlign: "center",
                color: "var(--muted)",
                fontSize: 16,
                maxWidth: 540,
                margin: "0 auto 48px",
              }}
            >
              Paste any public GitHub repo URL. Instantly see how many issues AgentFlow can automate and how many hours you're losing each month.
            </p>
            <AnalyzeClientDynamic />
          </div>
        </section>

        {/* Social proof */}
        <section style={{ padding: "80px 0", borderTop: "1px solid var(--border)" }}>
          <div className="container">
            <p className="section-label">Early access teams</p>
            <h2 className="section-title">What teams are saying</h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 24,
                maxWidth: 860,
                margin: "0 auto",
              }}
            >
              {TESTIMONIALS.map(({ quote, author, company }, i) => (
                <div
                  key={i}
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    padding: "28px 32px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 20,
                  }}
                >
                  <p
                    style={{
                      fontSize: 15,
                      lineHeight: 1.7,
                      color: "var(--text)",
                      fontStyle: "italic",
                    }}
                  >
                    &ldquo;{quote}&rdquo;
                  </p>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600 }}>{author}</p>
                    <p style={{ fontSize: 13, color: "var(--muted)" }}>{company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="features">
          <div className="container">
            <p className="section-label">How it works</p>
            <h2 className="section-title">Three steps to shipping</h2>
            <div className="steps-grid">
              <div className="step-card">
                <div className="step-num">1</div>
                <h3 className="feature-title">Create agents</h3>
                <p className="feature-desc">
                  Spin up specialized AI agents for your team — CEO, engineer, designer. Each runs autonomously with its own context, memory, and tools.
                </p>
              </div>
              <div className="step-card">
                <div className="step-num">2</div>
                <h3 className="feature-title">Assign issues</h3>
                <p className="feature-desc">
                  Drop issues from your backlog onto agents. They pick up context, ask clarifying questions, and get to work — no hand-holding required.
                </p>
              </div>
              <div className="step-card">
                <div className="step-num">3</div>
                <h3 className="feature-title">Agents ship code</h3>
                <p className="feature-desc">
                  Agents write code, open PRs, run CI, and respond to review feedback. You review and merge. Done.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="pricing">
          <div className="container">
            <p className="section-label">Pricing</p>
            <h2 className="section-title">Straightforward plans</h2>
            <p className="pricing-trial-note">14-day free trial on all plans. No credit card required.</p>
            <div className="pricing-grid">
              <div className="pricing-card">
                <p className="pricing-name">Starter</p>
                <p className="pricing-price">$499<span> / mo</span></p>
                <p className="pricing-desc">For teams ready to start automating delivery.</p>
                <ul className="pricing-features">
                  <li>3 agents</li>
                  <li>Unlimited issues</li>
                  <li>GitHub integration</li>
                  <li>Standard support</li>
                </ul>
                <Link href="/register" className="btn btn-secondary" style={{ width: "100%", textAlign: "center" }}>
                  Start free trial
                </Link>
              </div>
              <div className="pricing-card featured">
                <div className="pricing-badge">Most popular</div>
                <p className="pricing-name">Growth</p>
                <p className="pricing-price">$1,499<span> / mo</span></p>
                <p className="pricing-desc">For teams shipping at scale with full agent power.</p>
                <ul className="pricing-features">
                  <li>10 agents</li>
                  <li>Unlimited issues</li>
                  <li>GitHub integration</li>
                  <li>Priority support</li>
                  <li>Custom integrations</li>
                </ul>
                <Link href="/register" className="btn btn-primary" style={{ width: "100%", textAlign: "center" }}>
                  Start free trial
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Sign-up CTA */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-box">
              <h2 className="cta-title">Ready to ship faster?</h2>
              <p className="cta-sub">Join teams using AgentFlow to close their backlog with AI. 14-day free trial, cancel any time.</p>
              <Link href="/register" className="btn btn-primary btn-lg">
                Create your account →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>© 2026 AgentFlow · <a href="/login">Log in</a> · <a href="/register">Sign up</a> · <a href="/pricing">Pricing</a> · <a href="/analyze">Free Analyzer</a> · <a href="/docs">Docs</a> · <a href="/changelog">Changelog</a> · <a href="/blog">Blog</a> · <a href="/security">Security & Privacy</a> · <a href="/vs/github-copilot">AgentFlow vs Copilot</a> · <a href="/vs/sweep">AgentFlow vs Sweep</a> · <a href="/vs/devin">AgentFlow vs Devin</a> · <a href="/vs/cursor">AgentFlow vs Cursor</a></p>
        </div>
      </footer>
    </>
  );
}
