"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initPostHog, capture } from "@/lib/posthog";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    initPostHog();
  }, []);

  useEffect(() => {
    capture("$pageview", {
      $current_url: typeof window !== "undefined" ? window.location.href : "",
    });
  }, [pathname]);

  return <>{children}</>;
}
