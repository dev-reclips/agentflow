import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://agentflow.ai";
  return [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/pricing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/security`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog/github-backlog-automation`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/blog/engineering-backlog-cost`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
  ];
}
