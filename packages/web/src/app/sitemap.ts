import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://agentflow.ai";
  return [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/book-demo`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/pricing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/docs`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/security`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/blog/github-backlog-automation`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/blog/engineering-backlog-cost`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/blog/ai-agents-github-integration`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/blog/ai-code-review-automation`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/blog/github-issue-automation`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/blog/automate-github-issues`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/blog/reduce-engineering-backlog`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/blog/ai-agents-vs-copilots`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/blog/how-we-built-agentflow`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/lp/trigger-dev`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/lp/mintlify`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/lp/loops`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/lp/resend`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/lp/cal`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];
}
