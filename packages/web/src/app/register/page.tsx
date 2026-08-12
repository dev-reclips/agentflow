"use client";
import { useState } from "react";
import Link from "next/link";

const FORMSPREE_FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID ?? "";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Enter a valid work email.");
      return;
    }
    setError("");
    setLoading(true);
    if (FORMSPREE_FORM_ID) {
      try {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ email: trimmed, source: "register_waitlist" }),
        });
        if (!res.ok) {
          setError("Something went wrong. Please try again.");
          setLoading(false);
          return;
        }
      } catch {
        setError("Something went wrong. Please try again.");
        setLoading(false);
        return;
      }
    }
    setSubmittedEmail(trimmed);
    setSubmitted(true);
    setLoading(false);
  }

  return (
    <div className="auth-page">
      <Link href="/" className="nav-logo" style={{ marginBottom: 32, fontSize: 20 }}>
        AgentFlow
      </Link>
      <div className="auth-card">
        {submitted ? (
          <>
            <div style={{ fontSize: 40, marginBottom: 16, textAlign: "center" }}>✓</div>
            <h1 className="auth-title" style={{ textAlign: "center" }}>You are in.</h1>
            <p className="auth-sub" style={{ textAlign: "center" }}>
              We will email you at <strong>{submittedEmail}</strong> when production is live.
            </p>
            <Link href="/" className="btn btn-secondary" style={{ display: "block", textAlign: "center", marginTop: 8 }}>
              Back to home
            </Link>
          </>
        ) : (
          <>
            <h1 className="auth-title">You are on the list.</h1>
            <p className="auth-sub">
              AgentFlow is in early access. Enter your work email and we will notify you the moment
              your account is ready — no card required, 14-day free trial.
            </p>
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Work email</label>
                <input
                  id="email"
                  className="form-input"
                  type="email"
                  placeholder="you@company.com"
                  required
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(""); }}
                  disabled={loading}
                />
              </div>
              {error && <p className="form-error">{error}</p>}
              <button
                className="btn btn-primary"
                type="submit"
                disabled={loading || !email.trim()}
                style={{ width: "100%", padding: "12px" }}
              >
                {loading ? "Saving your spot…" : "Notify me when ready"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
