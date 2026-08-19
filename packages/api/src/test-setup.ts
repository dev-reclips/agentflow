// Runs before any test file. Ensures DATABASE_URL is available from .env.test
// when it's not already set (e.g., in local dev without shell env var).
// In CI, DATABASE_URL is set by the workflow env and this is a no-op.
import { readFileSync } from "fs";
import { resolve } from "path";

if (!process.env.DATABASE_URL) {
  try {
    const envPath = resolve(process.cwd(), ".env.test");
    const lines = readFileSync(envPath, "utf-8").split("\n");
    for (const line of lines) {
      const match = line.match(/^([^#=\s][^=]*)=(.*)$/);
      if (match) {
        const key = (match[1] ?? "").trim();
        const val = (match[2] ?? "").trim().replace(/^["']|["']$/g, "");
        if (!process.env[key]) process.env[key] = val;
      }
    }
  } catch {
    // .env.test not found — rely on process.env from CI or shell
  }
}
