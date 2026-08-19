import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // .env.test provides DATABASE_URL for local test runs.
    // CI sets it directly via environment variable.
    envFile: ".env.test",
  },
});
