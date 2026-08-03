import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      <nav className="nav">
        <div className="container nav-inner">
          <span className="nav-logo">AgentFlow</span>
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
        {/* Hero */}
        <section className="hero">
          <div className="container">
            <div className="hero-badge">Now in early access</div>
            <h1 className="hero-title">
              Ship software with<br />
              <span>autonomous AI agents</span>
            </h1>
            <p className="hero-sub">
              AgentFlow turns your backlog into shipped features. AI agents plan, write, review, and deploy code — you stay in the loop, not in the weeds.
            </p>
            <div className="hero-cta">
              <Link href="/register" className="btn btn-primary btn-lg">
                Start for free →
              </Link>
              <a
                href="https://docs.agentflow.dev"
                className="btn btn-secondary btn-lg"
              >
                View docs
              </a>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="features">
          <div className="container">
            <p className="section-label">How it works</p>
            <h2 className="section-title">Built for engineering teams who move fast</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🤖</div>
                <h3 className="feature-title">Autonomous agents</h3>
                <p className="feature-desc">
                  Assign issues to AI agents. They pick up context, write code, open PRs, and respond to review feedback — end-to-end.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔁</div>
                <h3 className="feature-title">Closed-loop delivery</h3>
                <p className="feature-desc">
                  Agents run CI, read test results, and iterate until green. No babysitting. No context-switching.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔌</div>
                <h3 className="feature-title">SDK + API</h3>
                <p className="feature-desc">
                  Build custom agents with our TypeScript SDK. Full REST API for integrations with GitHub, Linear, Slack, and more.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🛡️</div>
                <h3 className="feature-title">You stay in control</h3>
                <p className="feature-desc">
                  Every agent action is logged and auditable. Approval gates, spending limits, and kill-switches are first-class.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h3 className="feature-title">Real-time observability</h3>
                <p className="feature-desc">
                  Watch agents work in real time. Structured logs, run traces, and dashboards out of the box.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3 className="feature-title">Zero infra overhead</h3>
                <p className="feature-desc">
                  Fully managed agent runtime. No GPU clusters, no prompt infra, no MLOps. Just ship.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="pricing">
          <div className="container">
            <p className="section-label">Pricing</p>
            <h2 className="section-title">Simple, usage-based pricing</h2>
            <div className="pricing-grid">
              <div className="pricing-card">
                <p className="pricing-name">Starter</p>
                <p className="pricing-price">$0<span> / mo</span></p>
                <p className="pricing-desc">Perfect for solo devs and small experiments.</p>
                <ul className="pricing-features">
                  <li>1 agent</li>
                  <li>100 runs / month</li>
                  <li>Community support</li>
                  <li>API access</li>
                </ul>
                <Link href="/register" className="btn btn-secondary" style={{ width: "100%" }}>
                  Get started
                </Link>
              </div>
              <div className="pricing-card featured">
                <div className="pricing-badge">Most popular</div>
                <p className="pricing-name">Pro</p>
                <p className="pricing-price">$99<span> / mo</span></p>
                <p className="pricing-desc">For teams serious about autonomous delivery.</p>
                <ul className="pricing-features">
                  <li>Unlimited agents</li>
                  <li>Unlimited runs</li>
                  <li>Priority support</li>
                  <li>Custom integrations</li>
                  <li>SSO + audit logs</li>
                </ul>
                <Link href="/register" className="btn btn-primary" style={{ width: "100%" }}>
                  Start free trial
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>© 2026 AgentFlow · <a href="/login">Log in</a> · <a href="/register">Sign up</a></p>
        </div>
      </footer>
    </>
  );
}
