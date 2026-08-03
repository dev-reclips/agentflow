import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgentFlow — AI-native software delivery",
  description: "Autonomous AI agents that plan, code, and ship software end-to-end.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
