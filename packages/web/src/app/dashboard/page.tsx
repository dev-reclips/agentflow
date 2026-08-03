"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getToken, clearToken } from "@/lib/auth";
import { api, type MeResult } from "@/lib/api";

export default function DashboardPage() {
  const router = useRouter();
  const [me, setMe] = useState<MeResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace("/login");
      return;
    }
    api.me(token)
      .then(setMe)
      .catch(() => {
        clearToken();
        router.replace("/login");
      })
      .finally(() => setLoading(false));
  }, [router]);

  function handleLogout() {
    clearToken();
    router.push("/");
  }

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)" }}>
        Loading…
      </div>
    );
  }

  return (
    <div className="dashboard">
      <nav className="dashboard-header">
        <div className="container nav-inner">
          <Link href="/dashboard" className="nav-logo">AgentFlow</Link>
          <div className="nav-links">
            <span style={{ fontSize: 14, color: "var(--muted)" }}>{me?.user.email}</span>
            <Link href="/settings" className="btn btn-secondary" style={{ padding: "6px 14px", fontSize: 14 }}>
              Settings
            </Link>
            <button className="btn btn-secondary" style={{ padding: "6px 14px", fontSize: 14 }} onClick={handleLogout}>
              Log out
            </button>
          </div>
        </div>
      </nav>

      <main className="dashboard-main">
        <div className="container">
          <h1 className="dashboard-title">
            Welcome back{me?.company ? `, ${me.company.name}` : ""}
          </h1>
          <p className="dashboard-sub">
            Your AgentFlow workspace is ready.
          </p>

          <div className="stat-grid">
            <div className="stat-card">
              <p className="stat-label">Active agents</p>
              <p className="stat-value">0</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Open issues</p>
              <p className="stat-value">0</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Runs this month</p>
              <p className="stat-value">0</p>
            </div>
          </div>

          <div className="card" style={{ maxWidth: 560 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>Next steps</h2>
            <ul style={{ display: "flex", flexDirection: "column", gap: 12, listStyle: "none" }}>
              <li style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ color: "var(--accent)", fontWeight: 700, flexShrink: 0 }}>→</span>
                <span style={{ fontSize: 14 }}>
                  <strong>Create your first agent</strong> — use the SDK or API to register an agent for your repo.
                </span>
              </li>
              <li style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ color: "var(--accent)", fontWeight: 700, flexShrink: 0 }}>→</span>
                <span style={{ fontSize: 14 }}>
                  <strong>Create an issue</strong> — assign it to an agent and watch it get worked on autonomously.
                </span>
              </li>
              <li style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ color: "var(--accent)", fontWeight: 700, flexShrink: 0 }}>→</span>
                <span style={{ fontSize: 14 }}>
                  <strong>Manage API keys</strong> — rotate or create additional keys from <Link href="/settings">settings</Link>.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
