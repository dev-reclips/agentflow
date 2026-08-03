/**
 * Seeds a default company + API key for local development.
 * Run once after the migration: npx tsx src/db/seed.ts
 */
import "dotenv/config";
import { randomBytes } from "crypto";
import { db } from "./client.js";
import { companies, apiKeys } from "./schema.js";
import { hashApiKey } from "../middleware/auth.js";

const DEFAULT_COMPANY_ID = "00000000-0000-0000-0000-000000000001";

async function seed() {
  const [company] = await db
    .insert(companies)
    .values({ id: DEFAULT_COMPANY_ID, name: "Default", slug: "default" })
    .onConflictDoNothing()
    .returning();

  if (company) {
    console.log("Created default company:", company.id);
  } else {
    console.log("Default company already exists, skipping.");
  }

  const rawKey = randomBytes(32).toString("hex");
  const keyHash = hashApiKey(rawKey);
  await db
    .insert(apiKeys)
    .values({ companyId: DEFAULT_COMPANY_ID, keyHash, name: "dev-key" })
    .onConflictDoNothing();

  console.log("Dev API key (save this — shown once):", rawKey);
}

seed().catch(console.error).finally(() => process.exit());
