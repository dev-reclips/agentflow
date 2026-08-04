import { PostHog } from "posthog-node";

let client: PostHog | null = null;

function getClient(): PostHog | null {
  const key = process.env.POSTHOG_KEY;
  if (!key) return null;
  if (!client) {
    client = new PostHog(key, { host: "https://eu.posthog.com" });
  }
  return client;
}

export function captureServer(
  distinctId: string,
  event: string,
  properties?: Record<string, unknown>
) {
  const ph = getClient();
  if (!ph) return;
  if (properties !== undefined) {
    ph.capture({ distinctId, event, properties });
  } else {
    ph.capture({ distinctId, event });
  }
}

export async function shutdownPostHog() {
  await client?.shutdown();
}
