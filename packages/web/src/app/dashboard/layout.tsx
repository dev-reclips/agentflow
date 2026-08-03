"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { getToken, clearToken } from "@/lib/auth";
import { api, type MeResult } from "@/lib/api";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [me, setMe] = useState<MeResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) { router.replace("/login"); return; }
    api.me(token)
      .then(setMe)
      .catch(() => { clearToken(); router.replace("/login"); })
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
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <nav className="dash-topnav">
        <div className="container nav-inner">
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <Link href="/dashboard" className="nav-logo">AgentFlow</Link>
            <div className="dash-nav-links">
              <Link href="/dashboard/issues" className={`dash-nav-link${pathname?.startsWith("/dashboard/issues") ? " active" : ""}`}>Issues</Link>
              <Link href="/dashboard/agents" className={`dash-nav-link${pathname?.startsWith("/dashboard/agents") ? " active" : ""}`}>Agents</Link>
            </div>
          </div>
          <div className="nav-links">
            <span style={{ fontSize: 13, color: "var(--muted)" }}>{me?.company.name}</span>
            <span style={{ fontSize: 13, color: "var(--muted)" }}>{me?.user.email}</span>
            <Link href="/settings" className="btn btn-secondary" style={{ padding: "5px 12px", fontSize: 13 }}>Settings</Link>
            <button className="btn btn-secondary" style={{ padding: "5px 12px", fontSize: 13 }} onClick={handleLogout}>Log out</button>
          </div>
        </div>
      </nav>
      <main style={{ flex: 1 }}>{children}</main>
    </div>
  );
}
