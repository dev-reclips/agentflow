"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { getToken, clearToken } from "@/lib/auth";
import { api, type MeResult, type Subscription } from "@/lib/api";
import { identifyUser, resetAnalytics } from "@/lib/posthog";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [me, setMe] = useState<MeResult | null>(null);
  const [sub, setSub] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [pastDueDismissed, setPastDueDismissed] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) { router.replace("/login"); return; }
    api.me(token)
      .then(data => {
        setMe(data);
        identifyUser(data.user.id, data.company.id);
        // Load subscription status for past_due banner (best-effort)
        api.billing.get().then(setSub).catch(() => {});
      })
      .catch(() => { clearToken(); router.replace("/login"); })
      .finally(() => setLoading(false));
  }, [router]);

  function handleLogout() {
    clearToken();
    resetAnalytics();
    router.push("/");
  }

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)" }}>
        Loading…
      </div>
    );
  }

  const showPastDueBanner = !pastDueDismissed && sub?.status === "past_due";

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {showPastDueBanner && (
        <div style={{
          background: "#78350f",
          borderBottom: "1px solid #92400e",
          padding: "10px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 14,
          color: "#fef3c7",
        }}>
          <span>
            ⚠️ Your payment failed. Update your payment method to avoid service interruption.{" "}
            <Link href="/dashboard/settings/billing" style={{ color: "#fde68a", fontWeight: 600, textDecoration: "underline" }}>
              Manage billing →
            </Link>
          </span>
          <button
            onClick={() => setPastDueDismissed(true)}
            style={{ background: "none", border: "none", color: "#fef3c7", cursor: "pointer", fontSize: 16, lineHeight: 1, padding: "0 4px" }}
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      )}
      <nav className="dash-topnav">
        <div className="container nav-inner">
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <Link href="/dashboard" className="nav-logo">AgentFlow</Link>
            <div className="dash-nav-links">
              <Link href="/dashboard/issues" className={`dash-nav-link${pathname?.startsWith("/dashboard/issues") ? " active" : ""}`}>Issues</Link>
              <Link href="/dashboard/agents" className={`dash-nav-link${pathname?.startsWith("/dashboard/agents") ? " active" : ""}`}>Agents</Link>
              <Link href="/dashboard/settings/integrations" className={`dash-nav-link${pathname?.startsWith("/dashboard/settings/integrations") ? " active" : ""}`}>Integrations</Link>
              <Link href="/dashboard/settings/billing" className={`dash-nav-link${pathname?.startsWith("/dashboard/settings/billing") ? " active" : ""}`}>Billing</Link>
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
