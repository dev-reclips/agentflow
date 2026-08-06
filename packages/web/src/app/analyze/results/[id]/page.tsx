import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import AnalyzeClient, { type AnalysisResult } from "../../AnalyzeClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

interface ResultData {
  id: string;
  repo: string;
  result: AnalysisResult;
  createdAt: string;
}

async function getResult(id: string): Promise<ResultData | null> {
  try {
    const res = await fetch(`${API_URL}/analyze/results/${id}`, {
      next: { revalidate: 300 },
    });
    if (res.status === 404 || res.status === 410) return null;
    if (!res.ok) return null;
    return res.json() as Promise<ResultData>;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const data = await getResult(id);
  if (!data) {
    return { title: "Analysis Not Found — AgentFlow" };
  }
  const { result } = data;
  const desc = `${result.repo} has ${result.totalOpen} open issues. AgentFlow can handle ${result.totalMatchingIssues} of them, saving ~${Math.round(result.totalHours)}h/mo ($${Math.round(result.totalCost).toLocaleString()}).`;
  return {
    title: `${result.repo} Backlog Analysis — AgentFlow`,
    description: desc,
    openGraph: {
      title: `${result.repo} Backlog Analysis`,
      description: desc,
      url: `https://agentflow.ai/analyze/results/${id}`,
      siteName: "AgentFlow",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${result.repo} Backlog Analysis`,
      description: desc,
      images: ["/og-image.png"],
    },
  };
}

export default async function ResultPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getResult(id);

  if (!data) {
    notFound();
  }

  return (
    <>
      <nav className="nav">
        <div className="container nav-inner">
          <Link href="/" className="nav-logo" style={{ textDecoration: "none" }}>
            AgentFlow
          </Link>
          <div className="nav-links">
            <Link href="/login" className="btn btn-secondary" style={{ padding: "8px 16px", fontSize: "14px" }}>
              Log in
            </Link>
            <Link href="/register" className="btn btn-primary" style={{ padding: "8px 16px", fontSize: "14px" }}>
              Get started
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <section className="hero" style={{ paddingBottom: "48px" }}>
          <div className="container">
            <div className="hero-badge">Shared Analysis</div>
            <h1 className="hero-title" style={{ fontSize: "clamp(28px, 4vw, 52px)" }}>
              GitHub <span>Backlog Analysis</span>
            </h1>
            <p className="hero-sub">
              Shared analysis for{" "}
              <span style={{ fontFamily: "var(--mono)" }}>{data.result.repo}</span>.{" "}
              <Link href="/analyze" style={{ color: "var(--accent)" }}>Analyze your own repo →</Link>
            </p>
          </div>
        </section>

        <section style={{ paddingBottom: "96px" }}>
          <div className="container">
            <AnalyzeClient initialResult={data.result} initialResultId={data.id} />
          </div>
        </section>
      </main>
    </>
  );
}
