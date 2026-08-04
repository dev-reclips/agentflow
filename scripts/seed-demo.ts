/**
 * Seed a repeatable demo environment for sales calls.
 * Usage:  npx tsx scripts/seed-demo.ts [--reset]
 *
 * --reset  drops all existing demo data before re-seeding.
 *
 * Requires DEMO_PASSWORD in .env (or environment).
 */
import "dotenv/config";
import { seedDemo, resetDemo } from "../packages/api/src/services/demo-seed.js";

const password = process.env.DEMO_PASSWORD;
if (!password) {
  console.error("Error: DEMO_PASSWORD env var is required.");
  process.exit(1);
}

const shouldReset = process.argv.includes("--reset");
const run = shouldReset ? resetDemo : seedDemo;

run(password)
  .then(() => {
    console.log(shouldReset ? "✓ Demo environment reset." : "✓ Demo environment seeded.");
    console.log("  Login: demo@agentflow.ai / $DEMO_PASSWORD");
    console.log("  Shortcut: /demo");
  })
  .catch((err: unknown) => {
    console.error("Seed failed:", err);
    process.exit(1);
  })
  .finally(() => process.exit(0));
