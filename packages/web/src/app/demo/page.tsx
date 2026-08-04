"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { setToken } from "@/lib/auth";

const DEMO_EMAIL = "demo@agentflow.ai";
const DEMO_PASSWORD = process.env.NEXT_PUBLIC_DEMO_PASSWORD ?? "";

export default function DemoPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!DEMO_PASSWORD) {
      setError("Demo environment is not configured.");
      return;
    }

    api
      .login(DEMO_EMAIL, DEMO_PASSWORD)
      .then((result) => {
        setToken(result.token);
        router.replace("/dashboard/issues");
      })
      .catch(() => {
        setError("Demo login failed. Run seed-demo.ts to set up the demo account.");
      });
  }, [router]);

  if (error) {
    return (
      <div className="auth-page">
        <div className="auth-card" style={{ textAlign: "center" }}>
          <p style={{ color: "var(--color-error, red)" }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ textAlign: "center" }}>
        <p style={{ color: "var(--color-muted, #888)" }}>Loading demo…</p>
      </div>
    </div>
  );
}
