"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getToken, clearToken } from "@/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

interface ApiKey {
  id: string;
  name: string;
  createdAt: string;
}

export default function SettingsPage() {
  const router = useRouter();
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [newKeyValue, setNewKeyValue] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  const token = typeof window !== "undefined" ? getToken() : null;

  const fetchKeys = useCallback(async () => {
    if (!token) return;
    const res = await fetch(`${API_URL}/api/v1/api-keys`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setKeys(await res.json());
    }
  }, [token]);

  useEffect(() => {
    if (!getToken()) {
      router.replace("/login");
      return;
    }
    fetchKeys().finally(() => setLoading(false));
  }, [router, fetchKeys]);

  async function createKey() {
    if (!token) return;
    setCreating(true);
    setError("");
    setNewKeyValue(null);
    try {
      const res = await fetch(`${API_URL}/api/v1/api-keys`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Rotated key" }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error ?? "Failed to create key");
      setNewKeyValue(body.key);
      await fetchKeys();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setCreating(false);
    }
  }

  async function deleteKey(id: string) {
    if (!token) return;
    await fetch(`${API_URL}/api/v1/api-keys/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    await fetchKeys();
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
            <button className="btn btn-secondary" style={{ padding: "6px 14px", fontSize: 14 }} onClick={() => { clearToken(); router.push("/"); }}>
              Log out
            </button>
          </div>
        </div>
      </nav>

      <main className="dashboard-main">
        <div className="container" style={{ maxWidth: 640 }}>
          <h1 className="dashboard-title">Settings</h1>
          <p className="dashboard-sub">Manage your API keys and account.</p>

          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, fontWeight: 600 }}>API keys</h2>
              <button className="btn btn-primary" style={{ padding: "8px 16px", fontSize: 14 }} onClick={createKey} disabled={creating}>
                {creating ? "Creating…" : "+ New key"}
              </button>
            </div>

            {newKeyValue && (
              <div style={{ marginBottom: 20 }}>
                <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 8 }}>
                  ⚠️ New key — copy it now. It won&apos;t be shown again.
                </p>
                <div className="api-key-box">
                  <span className="api-key-text">{newKeyValue}</span>
                  <button className="copy-btn" onClick={() => navigator.clipboard.writeText(newKeyValue!)}>
                    Copy
                  </button>
                </div>
              </div>
            )}

            {error && <p className="form-error" style={{ marginBottom: 12 }}>{error}</p>}

            {keys.length === 0 ? (
              <p style={{ color: "var(--muted)", fontSize: 14 }}>No API keys. Create one above.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {keys.map(k => (
                  <div key={k.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
                    <div>
                      <p style={{ fontWeight: 500, marginBottom: 2 }}>{k.name}</p>
                      <p style={{ fontSize: 12, color: "var(--muted)" }}>
                        Created {new Date(k.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      style={{ background: "transparent", border: "1px solid var(--border)", color: "var(--red)", borderRadius: 6, padding: "4px 10px", fontSize: 12, cursor: "pointer" }}
                      onClick={() => deleteKey(k.id)}
                    >
                      Revoke
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
