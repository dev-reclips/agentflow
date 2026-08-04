import type { Metadata } from "next";
import "./globals.css";
import { PostHogProvider } from "@/components/PostHogProvider";

export const metadata: Metadata = {
  title: "AgentFlow — Your GitHub backlog, on autopilot",
  description: "Deploy AI agents to work your GitHub backlog. Assign an issue, agent writes the code, opens a PR, closes the ticket.",
  openGraph: {
    title: "AgentFlow — Your GitHub backlog, on autopilot",
    description: "Deploy AI agents to work your GitHub backlog. Assign an issue, agent writes the code, opens a PR, closes the ticket.",
    url: "https://agentflow.ai",
    siteName: "AgentFlow",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AgentFlow — Your GitHub backlog, on autopilot" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AgentFlow — Your GitHub backlog, on autopilot",
    description: "Deploy AI agents to work your GitHub backlog. Assign an issue, agent writes the code, opens a PR, closes the ticket.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
