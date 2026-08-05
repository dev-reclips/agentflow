"use client";

import { useState, useEffect, useRef } from "react";

const FRAME_DURATION = 2800;

function IssueRow({
  id,
  title,
  status,
  assignee,
}: {
  id: string;
  title: string;
  status: "open" | "in_progress" | "closed";
  assignee?: string;
}) {
  const statusColor =
    status === "closed"
      ? "#22c55e"
      : status === "in_progress"
      ? "#6366f1"
      : "#888899";
  const statusLabel =
    status === "closed"
      ? "Closed"
      : status === "in_progress"
      ? "In Progress"
      : "Open";

  return (
    <div
      style={{
        background: "#0a0a0f",
        border: "1px solid #222230",
        borderRadius: 8,
        padding: "12px 14px",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: statusColor,
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: "#e8e8f0",
            marginBottom: 3,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {id}: {title}
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: statusColor,
              background:
                status === "closed"
                  ? "rgba(34,197,94,0.1)"
                  : status === "in_progress"
                  ? "rgba(99,102,241,0.1)"
                  : "rgba(136,136,153,0.1)",
              padding: "1px 7px",
              borderRadius: 100,
            }}
          >
            {statusLabel}
          </span>
          {assignee && (
            <span style={{ fontSize: 11, color: "#888899" }}>
              → {assignee}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function AppChrome({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "#0a0a0f",
        border: "1px solid #222230",
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Window chrome */}
      <div
        style={{
          background: "#111118",
          borderBottom: "1px solid #222230",
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#ef4444",
            display: "inline-block",
          }}
        />
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#f59e0b",
            display: "inline-block",
          }}
        />
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#22c55e",
            display: "inline-block",
          }}
        />
        <span
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: 12,
            color: "#888899",
            fontFamily: "var(--mono, monospace)",
            marginLeft: -32,
          }}
        >
          app.agentflow.ai
        </span>
      </div>
      {/* Body: sidebar + main */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Sidebar */}
        <div
          style={{
            width: 140,
            background: "#111118",
            borderRight: "1px solid #222230",
            padding: "16px 0",
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <div
            style={{
              padding: "0 12px 12px",
              fontSize: 13,
              fontWeight: 700,
              color: "#e8e8f0",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span
              style={{
                width: 20,
                height: 20,
                background: "#6366f1",
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 800,
                color: "#fff",
              }}
            >
              A
            </span>
            AgentFlow
          </div>
          {["Dashboard", "Issues", "Agents"].map((item) => (
            <div
              key={item}
              style={{
                padding: "6px 12px",
                fontSize: 12,
                color: item === "Issues" ? "#6366f1" : "#888899",
                background:
                  item === "Issues"
                    ? "rgba(99,102,241,0.1)"
                    : "transparent",
                borderRadius: 6,
                margin: "0 4px",
                fontWeight: item === "Issues" ? 600 : 400,
              }}
            >
              {item}
            </div>
          ))}
        </div>
        {/* Main content */}
        <div
          style={{
            flex: 1,
            padding: "16px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <AppChrome>
      <div
        style={{ fontSize: 13, fontWeight: 600, color: "#888899", marginBottom: 4 }}
      >
        Issues · Backlog
      </div>
      <IssueRow
        id="#42"
        title="Login form crashes on empty email"
        status="open"
      />
      <IssueRow id="#41" title="Add dark mode toggle" status="open" />
      <IssueRow id="#38" title="Fix CSV export encoding" status="open" />
    </AppChrome>
  );
}

function Frame2() {
  return (
    <AppChrome>
      <div
        style={{ fontSize: 13, fontWeight: 600, color: "#888899", marginBottom: 4 }}
      >
        Issues · Backlog
      </div>
      <IssueRow
        id="#42"
        title="Login form crashes on empty email"
        status="in_progress"
        assignee="Founding Engineer"
      />
      <IssueRow id="#41" title="Add dark mode toggle" status="open" />
      <IssueRow id="#38" title="Fix CSV export encoding" status="open" />
    </AppChrome>
  );
}

function LogLine({
  text,
  delay,
  color,
}: {
  text: string;
  delay: number;
  color?: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      style={{
        fontSize: 12,
        fontFamily: "var(--mono, monospace)",
        color: color ?? "#888899",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s ease",
        lineHeight: 1.6,
      }}
    >
      {text}
    </div>
  );
}

function Frame3() {
  return (
    <AppChrome>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "#6366f1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 11,
            fontWeight: 700,
            color: "#fff",
          }}
        >
          FE
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#e8e8f0" }}>
            Founding Engineer
          </div>
          <div style={{ fontSize: 11, color: "#22c55e" }}>● Working on #42</div>
        </div>
      </div>
      <div
        style={{
          flex: 1,
          background: "#0d0d14",
          border: "1px solid #222230",
          borderRadius: 8,
          padding: "10px 12px",
          display: "flex",
          flexDirection: "column",
          gap: 0,
          overflow: "hidden",
        }}
      >
        <LogLine text="✓ Checked out issue #42" delay={0} color="#22c55e" />
        <LogLine text="✓ Reading codebase..." delay={300} color="#22c55e" />
        <LogLine
          text="✓ Found: auth/login.ts:47 — no null check"
          delay={650}
          color="#22c55e"
        />
        <LogLine text="⟳ Writing fix..." delay={1000} color="#6366f1" />
        <LogLine text="⟳ Running tests..." delay={1500} color="#6366f1" />
        <LogLine text="✓ Tests pass (12/12)" delay={2000} color="#22c55e" />
      </div>
    </AppChrome>
  );
}

function Frame4() {
  return (
    <AppChrome>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1, justifyContent: "center" }}>
        <div
          style={{
            background: "rgba(34,197,94,0.08)",
            border: "1px solid rgba(34,197,94,0.25)",
            borderRadius: 10,
            padding: "12px 14px",
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "#22c55e",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: 4,
            }}
          >
            Pull request opened
          </div>
          <div style={{ fontSize: 13, fontWeight: 500, color: "#e8e8f0" }}>
            PR #89: fix: handle empty email in login form
          </div>
          <div style={{ fontSize: 11, color: "#888899", marginTop: 3 }}>
            1 file changed · 3 tests added · CI passing
          </div>
        </div>
        <div
          style={{
            background: "rgba(99,102,241,0.08)",
            border: "1px solid rgba(99,102,241,0.25)",
            borderRadius: 10,
            padding: "12px 14px",
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "#6366f1",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: 4,
            }}
          >
            Issue resolved
          </div>
          <div style={{ fontSize: 13, fontWeight: 500, color: "#e8e8f0" }}>
            #42 Login form crashes on empty email — Closed ✓
          </div>
          <div style={{ fontSize: 11, color: "#888899", marginTop: 3 }}>
            Closed in 1m 47s by Founding Engineer
          </div>
        </div>
      </div>
    </AppChrome>
  );
}

const FRAMES: { label: string; element: React.ReactNode }[] = [
  { label: "Open issue in backlog", element: <Frame1 /> },
  { label: "Assign to AI agent", element: <Frame2 /> },
  { label: "Agent writes the fix", element: <Frame3 /> },
  { label: "PR opened · Issue closed", element: <Frame4 /> },
];

export default function DemoPlayer() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const advance = (idx: number) => {
    setCurrent(idx);
  };

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % FRAMES.length);
    }, FRAME_DURATION);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current]);

  return (
    <div style={{ width: "100%", maxWidth: 640, margin: "0 auto" }}>
      {/* Browser window */}
      <div
        style={{
          height: 260,
          borderRadius: 12,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {FRAMES.map((f, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              opacity: i === current ? 1 : 0,
              transition: "opacity 0.5s ease",
              pointerEvents: i === current ? "auto" : "none",
            }}
          >
            {/* Re-mount Frame3 to restart its log animations each time it becomes active */}
            {i === 2 && i === current ? <Frame3 key={current} /> : i !== 2 ? f.element : null}
          </div>
        ))}
      </div>

      {/* Step indicators */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          marginTop: 14,
        }}
      >
        {FRAMES.map((f, i) => (
          <button
            key={i}
            onClick={() => advance(i)}
            aria-label={f.label}
            style={{
              width: i === current ? 24 : 8,
              height: 8,
              borderRadius: 4,
              background: i === current ? "#6366f1" : "#222230",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "width 0.3s ease, background 0.3s ease",
            }}
          />
        ))}
      </div>

      {/* Step label */}
      <div
        style={{
          textAlign: "center",
          fontSize: 13,
          color: "#888899",
          marginTop: 8,
          height: 20,
          transition: "opacity 0.3s ease",
        }}
      >
        {FRAMES[current]?.label}
      </div>
    </div>
  );
}
