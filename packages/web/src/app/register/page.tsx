"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { setToken } from "@/lib/auth";
import { capture, identifyUser } from "@/lib/posthog";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await api.register(form.email, form.password);
      setToken(result.token);
      sessionStorage.setItem("agentflow_new_api_key", result.apiKey);
      identifyUser(result.user.id, result.company.id);
      capture("user_signed_up", { company_id: result.company.id });
      capture("trial_started", { company_id: result.company.id });
      router.push("/onboarding");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <Link href="/" className="nav-logo" style={{ marginBottom: 32, fontSize: 20 }}>
        AgentFlow
      </Link>
      <div className="auth-card">
        <h1 className="auth-title">Create your account</h1>
        <p className="auth-sub">Get your first agent running in under 2 minutes.</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Work email</label>
            <input
              id="email"
              className="form-input"
              type="email"
              placeholder="you@company.com"
              required
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              id="password"
              className="form-input"
              type="password"
              placeholder="Minimum 8 characters"
              required
              minLength={8}
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            />
          </div>
          {error && <p className="form-error">{error}</p>}
          <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: "100%", padding: "12px" }}>
            {loading ? "Creating account…" : "Create account →"}
          </button>
        </form>
        <p className="auth-footer">
          Already have an account? <Link href="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}
