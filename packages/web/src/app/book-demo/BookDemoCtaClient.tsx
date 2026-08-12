"use client";
import { useEffect, useState } from "react";

const BASE_MAILTO = "mailto:dev@reclips.ai";

export function BookDemoCtaClient() {
  const [repo, setRepo] = useState("");

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("repo") ?? "";
    if (param && /^[^/\s]+\/[^/\s]+$/.test(param.trim())) setRepo(param.trim());
  }, []);

  const subject = repo
    ? `AgentFlow Demo Request — ${repo}`
    : "AgentFlow Demo Request";
  const body = repo
    ? `Hi, I analyzed ${repo} with AgentFlow's free tool and would love to see a live demo on that repo. Best time for me: [time slot].`
    : `Hi, I'd like to see a demo of AgentFlow for [Company Name]. Best time for me: [time slot].`;
  const mailto = `${BASE_MAILTO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 16 }}>
      {repo && (
        <p style={{ fontSize: 15, color: "var(--accent)", fontWeight: 500, margin: 0 }}>
          We'll run a live agent on{" "}
          <span style={{ fontFamily: "var(--mono)", fontWeight: 700 }}>{repo}</span>{" "}
          during the demo.
        </p>
      )}
      <a href={mailto} className="btn btn-primary btn-lg">
        Email to book →
      </a>
      <p style={{ fontSize: 14, color: "var(--muted)" }}>
        Opens your email client with subject and body pre-filled. Reply within one business day.
      </p>
    </div>
  );
}
