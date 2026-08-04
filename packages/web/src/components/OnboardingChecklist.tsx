"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { api, type OnboardingStep } from "@/lib/api";
import { capture } from "@/lib/posthog";

const STEPS: { label: string; link?: string; linkLabel?: string }[] = [
  { label: "Create your account" },
  { label: "Connect a GitHub repo", link: "/dashboard/settings/integrations", linkLabel: "Go to integrations" },
  { label: "Create your first agent", link: "/dashboard/agents", linkLabel: "Go to agents" },
  { label: "Assign an issue to your agent", link: "/dashboard/issues", linkLabel: "View issues" },
  { label: "Review the PR your agent opened", link: "/dashboard/issues", linkLabel: "View issues" },
];

const DISMISS_KEY = "onboarding_dismissed_until";
const SEEN_KEY = "onboarding_seen_steps";

function isDismissed(): boolean {
  if (typeof window === "undefined") return false;
  const until = localStorage.getItem(DISMISS_KEY);
  if (!until) return false;
  return Date.now() < Number(until);
}

function getSeenSteps(): boolean[] {
  if (typeof window === "undefined") return [false, false, false, false, false];
  const raw = localStorage.getItem(SEEN_KEY);
  if (!raw) return [false, false, false, false, false];
  try {
    return JSON.parse(raw) as boolean[];
  } catch {
    return [false, false, false, false, false];
  }
}

export default function OnboardingChecklist() {
  const [steps, setSteps] = useState<OnboardingStep[] | null>(null);
  const [dismissed, setDismissed] = useState(true); // start hidden to avoid flash
  const prevSeenRef = useRef<boolean[]>([false, false, false, false, false]);

  useEffect(() => {
    if (isDismissed()) return;
    setDismissed(false);
    prevSeenRef.current = getSeenSteps();

    api.onboarding.status()
      .then(data => {
        setSteps(data.steps);

        // Fire PostHog events for newly completed steps
        const prev = prevSeenRef.current;
        data.steps.forEach((s, i) => {
          if (s.completed && !prev[i]) {
            capture("onboarding_step_completed", { step: s.step });
          }
        });

        // Persist newly seen completed state
        const updated = data.steps.map(s => s.completed);
        localStorage.setItem(SEEN_KEY, JSON.stringify(updated));
        prevSeenRef.current = updated;
      })
      .catch(() => {/* non-critical — silently ignore */});
  }, []);

  function dismiss() {
    const until = Date.now() + 7 * 24 * 60 * 60 * 1000;
    localStorage.setItem(DISMISS_KEY, String(until));
    setDismissed(true);
  }

  if (dismissed || !steps) return null;

  const completed = steps.filter(s => s.completed).length;
  const total = steps.length;
  const allDone = completed === total;

  // Auto-hide once all steps are done (after showing the celebration briefly)
  if (allDone) {
    return (
      <div style={cardStyle} className="onboarding-float">
        <div style={{ textAlign: "center", padding: "8px 0" }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>✓</div>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, color: "var(--green)" }}>You are set up.</div>
          <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 16 }}>Your agent is working your backlog.</div>
          <button onClick={dismiss} style={dismissBtnStyle}>Dismiss</button>
        </div>
      </div>
    );
  }

  return (
    <div style={cardStyle} className="onboarding-float">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <span style={{ fontWeight: 700, fontSize: 14 }}>Get started</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>{completed} of {total}</span>
          <button onClick={dismiss} style={dismissBtnStyle} aria-label="Dismiss checklist">✕</button>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ background: "var(--border)", borderRadius: 4, height: 4, marginBottom: 16, overflow: "hidden" }}>
        <div style={{
          background: "var(--accent)",
          height: "100%",
          width: `${(completed / total) * 100}%`,
          borderRadius: 4,
          transition: "width 0.3s ease",
        }} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {steps.map((step, i) => {
          const meta = STEPS[i];
          if (!meta) return null;
          return (
            <div key={step.step} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <span style={{
                flexShrink: 0,
                width: 20,
                height: 20,
                borderRadius: "50%",
                border: step.completed ? "none" : "2px solid var(--border)",
                background: step.completed ? "var(--green)" : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                color: "#fff",
                marginTop: 1,
              }}>
                {step.completed ? "✓" : ""}
              </span>
              <div style={{ flex: 1 }}>
                <span style={{
                  fontSize: 13,
                  color: step.completed ? "var(--muted)" : "var(--text)",
                  textDecoration: step.completed ? "line-through" : "none",
                }}>
                  {meta.label}
                </span>
                {!step.completed && meta.link && (
                  <div style={{ marginTop: 2 }}>
                    <Link href={meta.link} style={{ fontSize: 12, color: "var(--accent)" }}>
                      {meta.linkLabel} →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  position: "fixed",
  bottom: 24,
  right: 24,
  width: 280,
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: 12,
  padding: "16px 18px",
  zIndex: 100,
  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
  // Mobile override handled by .onboarding-float CSS class
};

const dismissBtnStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  color: "var(--muted)",
  cursor: "pointer",
  fontSize: 13,
  padding: "2px 4px",
  lineHeight: 1,
};
