/**
 * Multi-tenant isolation tests.
 *
 * These are integration tests that require a real Postgres database.
 * Set DATABASE_URL in your environment before running.
 *
 * They create two companies, seed an API key for each, then verify that
 * company A cannot read or mutate company B's data.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { randomBytes } from "crypto";
import { db } from "../../db/client.js";
import { companies, apiKeys, issues, agents } from "../../db/schema.js";
import { hashApiKey } from "../../middleware/auth.js";
import app from "../../index.js";
import { eq, inArray } from "drizzle-orm";

const companyAId = randomBytes(8).toString("hex");
const companyBId = randomBytes(8).toString("hex");
let keyA: string;
let keyB: string;
let companyADbId: string;
let companyBDbId: string;

beforeAll(async () => {
  // Create two test companies
  const [cA] = await db
    .insert(companies)
    .values({ name: `Test Co A ${companyAId}`, slug: `test-a-${companyAId}` })
    .returning();
  const [cB] = await db
    .insert(companies)
    .values({ name: `Test Co B ${companyBId}`, slug: `test-b-${companyBId}` })
    .returning();

  companyADbId = cA!.id;
  companyBDbId = cB!.id;

  // Create API keys for each company
  keyA = randomBytes(32).toString("hex");
  keyB = randomBytes(32).toString("hex");

  await db.insert(apiKeys).values([
    { companyId: companyADbId, keyHash: hashApiKey(keyA), name: "test-key-a" },
    { companyId: companyBDbId, keyHash: hashApiKey(keyB), name: "test-key-b" },
  ]);
});

afterAll(async () => {
  // Clean up in dependency order
  await db.delete(issues).where(inArray(issues.companyId, [companyADbId, companyBDbId]));
  await db.delete(agents).where(inArray(agents.companyId, [companyADbId, companyBDbId]));
  await db.delete(apiKeys).where(inArray(apiKeys.companyId, [companyADbId, companyBDbId]));
  await db.delete(companies).where(inArray(companies.id, [companyADbId, companyBDbId]));
});

describe("multi-tenant isolation", () => {
  it("company A can create and read its own issues", async () => {
    const create = await request(app)
      .post("/api/v1/issues")
      .set("Authorization", `Bearer ${keyA}`)
      .send({ title: "Issue for A", priority: "low" });

    expect(create.status).toBe(201);
    expect(create.body.companyId).toBe(companyADbId);

    const list = await request(app)
      .get("/api/v1/issues")
      .set("Authorization", `Bearer ${keyA}`);

    expect(list.status).toBe(200);
    expect(list.body.some((i: { id: string }) => i.id === create.body.id)).toBe(true);
  });

  it("company B cannot see company A issues", async () => {
    // Create an issue for A
    const create = await request(app)
      .post("/api/v1/issues")
      .set("Authorization", `Bearer ${keyA}`)
      .send({ title: "Secret issue for A", priority: "low" });
    expect(create.status).toBe(201);
    const issueId = create.body.id as string;

    // B listing should not include A's issue
    const list = await request(app)
      .get("/api/v1/issues")
      .set("Authorization", `Bearer ${keyB}`);

    expect(list.body.some((i: { id: string }) => i.id === issueId)).toBe(false);

    // B direct fetch should 404
    const get = await request(app)
      .get(`/api/v1/issues/${issueId}`)
      .set("Authorization", `Bearer ${keyB}`);

    expect(get.status).toBe(404);
  });

  it("company B cannot patch company A issues", async () => {
    const create = await request(app)
      .post("/api/v1/issues")
      .set("Authorization", `Bearer ${keyA}`)
      .send({ title: "A's private issue", priority: "high" });
    expect(create.status).toBe(201);

    const patch = await request(app)
      .patch(`/api/v1/issues/${create.body.id}`)
      .set("Authorization", `Bearer ${keyB}`)
      .send({ status: "done" });

    expect(patch.status).toBe(404);
  });

  it("invalid API key is rejected with 401", async () => {
    const res = await request(app)
      .get("/api/v1/issues")
      .set("Authorization", "Bearer invalid-key-that-does-not-exist");

    expect(res.status).toBe(401);
  });
});
