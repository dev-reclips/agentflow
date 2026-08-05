"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

const TEAM_SIZES = ["1–5", "6–15", "16–50", "51–200", "200+"];
const ROLES = [
  "Engineering Manager / VP",
  "CTO / VP Engineering",
  "Founder / CEO",
  "Software Engineer",
  "Product Manager",
  "Other",
];

export default function BookDemoPage() {
  const [form, setForm] = useState({
    name: "",
    workEmail: "",
    company: "",
    role: "",
    teamSize: "",
    painPoint: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/demo/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error((body as { error?: string }).error ?? "Submission failed. Please try again.");
      }
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

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
              Start free trial
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <div
          style={{
            maxWidth: 560,
            margin: "64px auto",
            padding: "0 24px",
          }}
        >
          {done ? (
            <div className="card" style={{ textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
              <h2 style={{ marginBottom: 8 }}>We'll be in touch!</h2>
              <p style={{ color: "var(--muted)", marginBottom: 24 }}>
                Expect a reply within one business day to schedule your call.
              </p>
              <Link href="/" className="btn btn-secondary">
                Back to home
              </Link>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: 32 }}>
                <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Book a demo</h1>
                <p style={{ color: "var(--muted)", fontSize: 15 }}>
                  See how AgentFlow works for your team. We'll walk through your specific use case and answer all your questions.
                </p>
              </div>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Full name</label>
                  <input
                    id="name"
                    className="form-input"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    placeholder="Jane Smith"
                    autoComplete="name"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="workEmail">Work email</label>
                  <input
                    id="workEmail"
                    className="form-input"
                    type="email"
                    required
                    value={form.workEmail}
                    onChange={(e) => set("workEmail", e.target.value)}
                    placeholder="jane@acme.com"
                    autoComplete="email"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="company">Company</label>
                  <input
                    id="company"
                    className="form-input"
                    type="text"
                    required
                    value={form.company}
                    onChange={(e) => set("company", e.target.value)}
                    placeholder="Acme Corp"
                    autoComplete="organization"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="role">Your role</label>
                  <select
                    id="role"
                    className="form-input"
                    required
                    value={form.role}
                    onChange={(e) => set("role", e.target.value)}
                    style={{ cursor: "pointer" }}
                  >
                    <option value="" disabled>Select a role…</option>
                    {ROLES.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="teamSize">Engineering team size</label>
                  <select
                    id="teamSize"
                    className="form-input"
                    required
                    value={form.teamSize}
                    onChange={(e) => set("teamSize", e.target.value)}
                    style={{ cursor: "pointer" }}
                  >
                    <option value="" disabled>Select team size…</option>
                    {TEAM_SIZES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="painPoint">
                    What's your biggest backlog challenge? <span style={{ color: "var(--muted)" }}>(optional)</span>
                  </label>
                  <textarea
                    id="painPoint"
                    className="form-input"
                    rows={3}
                    value={form.painPoint}
                    onChange={(e) => set("painPoint", e.target.value)}
                    placeholder="e.g. Too many issues, not enough engineers to triage and ship them…"
                    style={{ resize: "vertical" }}
                  />
                </div>

                {error && <p className="form-error">{error}</p>}

                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  disabled={submitting}
                  style={{ width: "100%" }}
                >
                  {submitting ? "Sending…" : "Request a demo →"}
                </button>

                <p style={{ textAlign: "center", fontSize: 13, color: "var(--muted)" }}>
                  Prefer to jump straight in?{" "}
                  <Link href="/register" style={{ color: "var(--accent)" }}>
                    Start a free trial
                  </Link>
                </p>
              </form>
            </>
          )}
        </div>
      </main>
    </>
  );
}
