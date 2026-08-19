import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Runs before test files so DATABASE_URL is set before db/client.ts lazy pool init
    setupFiles: ["./src/test-setup.ts"],
  },
});
