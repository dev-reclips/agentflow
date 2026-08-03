"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getToken } from "@/lib/auth";

export default function OnboardingPage() {
  const router = useRouter();
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!getToken()) {
      router.replace("/login");
      return;
    }
    const key = sessionStorage.getItem("agentflow_new_api_key");
    if (key) {
      setApiKey(key);
      sessionStorage.removeItem("agentflow_new_api_key");
    }
  }, [router]);

  function copyKey() {
    if (!apiKey) return;
    navigator.clipboard.writeText(apiKey).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const snippetInit = `npm install @agentflow/sdk`;
  const snippetCode = `import { AgentFlow } from "@agentflow/sdk";

const client = new AgentFlow({
  apiKey: "${apiKey ?? "YOUR_API_KEY"}",
});

const issue = await client.issues.create({
  title: "Write a health-check endpoint",
  description: "Add GET /health returning { status: 'ok' }",
});

console.log("Issue created:", issue.id);`;

  return (
    <div className="onboarding-page">
      <Link href="/" className="nav-logo" style={{ marginBottom: 40, fontSize: 20 }}>
        AgentFlow
      </Link>
      <div className="onboarding-card">
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>You&apos;re in. 🎉</h1>
        <p style={{ color: "var(--muted)", marginBottom: 36 }}>
          Follow these steps to make your first agent request.
        </p>

        <div className="onboarding-steps">
          {/* Step 1 - API Key */}
          <div>
            <div className="step-header">
              <span className="step-number">1</span>
              <span className="step-title">Save your API key</span>
            </div>
            {apiKey ? (
              <>
                <div className="api-key-box">
                  <span className="api-key-text">{apiKey}</span>
                  <button className="copy-btn" onClick={copyKey}>
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <p className="key-warning">
                  ⚠️ This key is shown once. Store it securely — you can rotate it from settings.
                </p>
              </>
            ) : (
              <p style={{ color: "var(--muted)", fontSize: 14 }}>
                API key already dismissed. <Link href="/settings">Generate a new one</Link> from settings.
              </p>
            )}
          </div>

          {/* Step 2 - Install */}
          <div>
            <div className="step-header">
              <span className="step-number">2</span>
              <span className="step-title">Install the SDK</span>
            </div>
            <div className="code-block">{snippetInit}</div>
          </div>

          {/* Step 3 - First call */}
          <div>
            <div className="step-header">
              <span className="step-number">3</span>
              <span className="step-title">Create your first issue</span>
            </div>
            <div className="code-block">{snippetCode}</div>
          </div>

          <Link href="/dashboard" className="btn btn-primary" style={{ width: "100%", padding: "12px", textAlign: "center" }}>
            Go to dashboard →
          </Link>
        </div>
      </div>
    </div>
  );
}
