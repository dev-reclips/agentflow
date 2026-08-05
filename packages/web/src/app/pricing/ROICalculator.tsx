"use client";
import { useState } from "react";
import Link from "next/link";

const TEAM_SIZES = [5, 10, 20, 50];
const SALARIES = [100_000, 150_000, 200_000, 250_000];
const BACKLOG_PCTS = [0.1, 0.2, 0.3, 0.4];
const AGENTFLOW_COST = 1_499;

function fmt(n: number) {
  return "$" + Math.round(n).toLocaleString("en-US");
}

function SliderRow({
  label,
  value,
  displayValue,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  displayValue: string;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontSize: "14px", color: "var(--muted)", fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: "18px", fontWeight: 700, color: "var(--text)" }}>{displayValue}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          WebkitAppearance: "none",
          appearance: "none",
          width: "100%",
          height: "4px",
          borderRadius: "2px",
          outline: "none",
          cursor: "pointer",
          background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${(value / max) * 100}%, var(--border) ${(value / max) * 100}%, var(--border) 100%)`,
        }}
      />
    </div>
  );
}

export default function ROICalculator() {
  const [teamIdx, setTeamIdx] = useState(1);
  const [salaryIdx, setSalaryIdx] = useState(1);
  const [backlogIdx, setBacklogIdx] = useState(2);

  const teamSize = TEAM_SIZES[teamIdx] ?? 10;
  const salary = SALARIES[salaryIdx] ?? 150_000;
  const backlogPct = BACKLOG_PCTS[backlogIdx] ?? 0.3;

  const monthlyToil = (salary / 12) * teamSize * backlogPct;
  const roiMultiple = Math.round(monthlyToil / AGENTFLOW_COST);
  const savings = monthlyToil - AGENTFLOW_COST;

  return (
    <section style={{ padding: "64px 0", borderTop: "1px solid var(--border)" }}>
      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--accent);
          cursor: pointer;
          border: 2px solid var(--bg);
          box-shadow: 0 0 0 2px var(--accent);
        }
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--accent);
          cursor: pointer;
          border: 2px solid var(--bg);
          box-shadow: 0 0 0 2px var(--accent);
        }
        input[type="range"]::-webkit-slider-runnable-track { border-radius: 2px; }
        input[type="range"]::-moz-range-track { border-radius: 2px; height: 4px; }
      `}</style>
      <div className="container">
        <p className="section-label">ROI Calculator</p>
        <h2 className="section-title" style={{ marginBottom: "12px" }}>
          Is AgentFlow worth it for your team?
        </h2>
        <p style={{ textAlign: "center", color: "var(--muted)", fontSize: "16px", marginBottom: "48px" }}>
          Adjust the sliders to see how much your team spends on backlog toil.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "32px",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          {/* Inputs */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              gap: "28px",
            }}
          >
            <SliderRow
              label="Team size"
              value={teamIdx}
              displayValue={teamSize === 50 ? "50+ devs" : `${teamSize} devs`}
              min={0}
              max={TEAM_SIZES.length - 1}
              onChange={setTeamIdx}
            />
            <SliderRow
              label="Avg developer salary"
              value={salaryIdx}
              displayValue={salary === 250_000 ? "$250K+" : `$${salary / 1_000}K`}
              min={0}
              max={SALARIES.length - 1}
              onChange={setSalaryIdx}
            />
            <SliderRow
              label="Time spent on backlog/maintenance"
              value={backlogIdx}
              displayValue={`${backlogPct * 100}%`}
              min={0}
              max={BACKLOG_PCTS.length - 1}
              onChange={setBacklogIdx}
            />
          </div>

          {/* Outputs */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--accent)",
              borderRadius: "12px",
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <p style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)" }}>
              Your numbers
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ padding: "16px", background: "var(--bg)", borderRadius: "8px", border: "1px solid var(--border)" }}>
                <p style={{ fontSize: "12px", color: "var(--muted)", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>
                  Monthly backlog toil cost
                </p>
                <p style={{ fontSize: "36px", fontWeight: 800, color: "var(--red)", lineHeight: 1.1 }}>
                  {fmt(monthlyToil)}<span style={{ fontSize: "16px", fontWeight: 400, color: "var(--muted)" }}>/mo</span>
                </p>
              </div>

              <div style={{ padding: "16px", background: "var(--bg)", borderRadius: "8px", border: "1px solid var(--border)" }}>
                <p style={{ fontSize: "12px", color: "var(--muted)", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>
                  AgentFlow Growth plan
                </p>
                <p style={{ fontSize: "36px", fontWeight: 800, color: "var(--green)", lineHeight: 1.1 }}>
                  {fmt(AGENTFLOW_COST)}<span style={{ fontSize: "16px", fontWeight: 400, color: "var(--muted)" }}>/mo</span>
                </p>
              </div>

              <div style={{ padding: "16px", background: "rgba(99,102,241,0.08)", borderRadius: "8px", border: "1px solid rgba(99,102,241,0.3)" }}>
                <p style={{ fontSize: "12px", color: "var(--muted)", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>
                  ROI multiple
                </p>
                <p style={{ fontSize: "48px", fontWeight: 800, color: "var(--accent)", lineHeight: 1 }}>
                  {roiMultiple}×
                </p>
                <p style={{ fontSize: "13px", color: "var(--muted)", marginTop: "6px" }}>
                  Your team spends {fmt(monthlyToil)}/mo on backlog.{" "}
                  AgentFlow handles it for {fmt(AGENTFLOW_COST)}.
                </p>
              </div>
            </div>

            <Link
              href="/register"
              className="btn btn-primary"
              style={{ width: "100%", textAlign: "center", marginTop: "4px" }}
            >
              Start your 14-day free trial
            </Link>
            <p style={{ fontSize: "12px", color: "var(--muted)", textAlign: "center", marginTop: "-8px" }}>
              No credit card required · See it work on your first ticket
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
