import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AgentFlow — Your GitHub backlog, on autopilot";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#0a0a0f",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        {/* Top: wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 40,
              height: 40,
              background: "#6366f1",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ color: "#fff", fontSize: 22, fontWeight: 800 }}>A</div>
          </div>
          <div style={{ color: "#e8e8f0", fontSize: 22, fontWeight: 700 }}>AgentFlow</div>
        </div>

        {/* Middle: headline + subline + mock terminal */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flex: 1, paddingTop: 56 }}>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 620 }}>
            <div
              style={{
                display: "inline-flex",
                background: "rgba(99,102,241,0.15)",
                border: "1px solid rgba(99,102,241,0.3)",
                borderRadius: 100,
                padding: "4px 16px",
                color: "#a5b4fc",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: 28,
                width: "fit-content",
              }}
            >
              Product Hunt Launch
            </div>
            <div
              style={{
                color: "#e8e8f0",
                fontSize: 56,
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: 24,
              }}
            >
              Your GitHub backlog,{" "}
              <span style={{ color: "#6366f1" }}>on autopilot.</span>
            </div>
            <div style={{ color: "#888899", fontSize: 20, lineHeight: 1.5, maxWidth: 540 }}>
              Assign an issue. Agent writes code. PR opens. Ticket closes.
            </div>
          </div>

          {/* Mock GitHub issue card */}
          <div
            style={{
              background: "#111118",
              border: "1px solid #222230",
              borderRadius: 12,
              padding: "24px 28px",
              width: 340,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e" }} />
              <div style={{ color: "#888899", fontSize: 12, fontWeight: 600 }}>IN PROGRESS</div>
            </div>
            <div style={{ color: "#e8e8f0", fontSize: 15, fontWeight: 600, lineHeight: 1.4 }}>
              Add user auth flow with JWT tokens
            </div>
            <div style={{ color: "#888899", fontSize: 13 }}>
              Assigned to <span style={{ color: "#a5b4fc" }}>Founding Engineer</span>
            </div>
            <div
              style={{
                background: "#0d0d14",
                border: "1px solid #222230",
                borderRadius: 8,
                padding: "12px 16px",
                fontFamily: "monospace",
                fontSize: 12,
                color: "#a5b4fc",
                lineHeight: 1.6,
              }}
            >
              {"▸ Writing src/auth/jwt.ts\n▸ Tests passing (12/12)\n▸ Opening PR…"}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#6366f1" }} />
              <div style={{ color: "#6366f1", fontSize: 12, fontWeight: 600 }}>PR #42 opened</div>
            </div>
          </div>
        </div>

        {/* Bottom: agentflow.ai */}
        <div style={{ color: "#444455", fontSize: 15, fontWeight: 500 }}>agentflow.ai</div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
