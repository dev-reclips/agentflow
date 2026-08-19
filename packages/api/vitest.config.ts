import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Load .env.test when present; CI sets DATABASE_URL directly via env, so this is a no-op there.
    envFile: ".env.test",
  },
});
