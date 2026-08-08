import Link from "next/link";
import type { Metadata } from "next";
import ROICalculator from "./ROICalculator";

export const metadata: Metadata = {
  title: "Pricing — AgentFlow | Free plan available",
  description:
    "AgentFlow offers a free plan with 1 agent and 5 issues/month — no credit card required. Paid plans from $299/mo for unlimited issues.",
  openGraph: {
    title: "Pricing — AgentFlow | Free plan available",
    description:
      "AgentFlow offers a free plan with 1 agent and 5 issues/month — no credit card required. Paid plans from $299/mo.",
    url: "https://agentflow.ai/pricing",
    siteName: "AgentFlow",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AgentFlow Pricing" }],
    type: "website",
  },
};

export default function PricingPage() {
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
            <div className="hero-badge">Pricing</div>
            <h1 className="hero-title" style={{ fontSize: "clamp(28px, 4vw, 48px)" }}>
              Straightforward <span>plans</span>
            </h1>
            <p className="hero-sub">
              Start free — no credit card required. Upgrade when you need more.
            </p>
          </div>
        </section>

        <ROICalculator />

        <section className="pricing" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="pricing-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
              <div className="pricing-card">
                <p className="pricing-name">Free</p>
                <p className="pricing-price">$0<span> / mo</span></p>
                <p className="pricing-desc">Get started with no credit card. Perfect for trying AgentFlow.</p>
                <ul className="pricing-features">
                  <li>1 AI developer agent</li>
                  <li>5 issues/month</li>
                  <li>Automatic PR creation</li>
                  <li>GitHub integration</li>
                  <li>Community support</li>
                </ul>
                <Link href="/register" className="btn btn-secondary" style={{ width: "100%", textAlign: "center" }}>
                  Get started free
                </Link>
              </div>
              <div className="pricing-card featured">
                <div className="pricing-badge">Most popular</div>
                <p className="pricing-name">Starter</p>
                <p className="pricing-price">$299<span> / mo</span></p>
                <p className="pricing-desc">For teams ready to start automating GitHub backlog delivery.</p>
                <ul className="pricing-features">
                  <li>3 AI developer agents</li>
                  <li>Unlimited GitHub issues</li>
                  <li>Automatic PR creation</li>
                  <li>GitHub integration</li>
                  <li>Standard support</li>
                </ul>
                <Link href="/register" className="btn btn-primary" style={{ width: "100%", textAlign: "center" }}>
                  Start 14-day trial
                </Link>
              </div>
              <div className="pricing-card">
                <p className="pricing-name">Growth</p>
                <p className="pricing-price">$1,499<span> / mo</span></p>
                <p className="pricing-desc">For teams shipping at scale with full AI agent automation power.</p>
                <ul className="pricing-features">
                  <li>10 AI developer agents</li>
                  <li>Unlimited GitHub issues</li>
                  <li>Automatic PR creation</li>
                  <li>GitHub integration</li>
                  <li>Priority support</li>
                  <li>Custom integrations</li>
                </ul>
                <Link href="/register" className="btn btn-secondary" style={{ width: "100%", textAlign: "center" }}>
                  Start 14-day trial
                </Link>
              </div>
            </div>

            <div style={{ textAlign: "center", marginTop: "48px", color: "var(--muted)", fontSize: "14px" }}>
              Need a custom plan for larger teams?{" "}
              <a href="mailto:sales@agentflow.ai" style={{ color: "var(--accent)" }}>
                Contact us
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
            <a href="/security">Security & Privacy</a>
          </p>
        </div>
      </footer>
    </>
  );
}
