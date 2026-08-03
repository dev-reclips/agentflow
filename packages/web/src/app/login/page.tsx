"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { setToken } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await api.login(form.email, form.password);
      setToken(result.token);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
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
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-sub">Log in to your AgentFlow workspace.</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
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
              placeholder="••••••••"
              required
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            />
          </div>
          {error && <p className="form-error">{error}</p>}
          <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: "100%", padding: "12px" }}>
            {loading ? "Logging in…" : "Log in →"}
          </button>
        </form>
        <p className="auth-footer">
          Don&apos;t have an account? <Link href="/register">Sign up free</Link>
        </p>
      </div>
    </div>
  );
}
