import { type Router as IRouter, Router } from "express";
import { z } from "zod";
import { randomBytes } from "crypto";
import { eq } from "drizzle-orm";
import { db } from "../db/client.js";
import { companies, apiKeys } from "../db/schema.js";
import { hashApiKey } from "../middleware/auth.js";
import { AppError } from "../middleware/error.js";

export const companiesRouter: IRouter = Router();

const createCompanySchema = z.object({
  name: z.string().min(1).max(200),
  slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/),
});

companiesRouter.get("/me", async (req, res, next) => {
  try {
    const company = await db.query.companies.findFirst({
      where: eq(companies.id, req.companyId),
    });
    if (!company) throw new AppError(404, "Company not found");
    res.json(company);
  } catch (err) {
    next(err);
  }
});

companiesRouter.post("/", async (req, res, next) => {
  try {
    const body = createCompanySchema.parse(req.body);
    const [company] = await db.insert(companies).values(body).returning();
    res.status(201).json(company);
  } catch (err) {
    next(err);
  }
});

export const apiKeysRouter: IRouter = Router();

const createApiKeySchema = z.object({
  name: z.string().min(1).max(200),
});

apiKeysRouter.get("/", async (req, res, next) => {
  try {
    const rows = await db.query.apiKeys.findMany({
      where: eq(apiKeys.companyId, req.companyId),
      orderBy: (t, { desc }) => [desc(t.createdAt)],
    });
    // Never return keyHash — clients don't need it
    res.json(rows.map(({ keyHash: _kh, ...rest }) => rest));
  } catch (err) {
    next(err);
  }
});

apiKeysRouter.post("/", async (req, res, next) => {
  try {
    const { name } = createApiKeySchema.parse(req.body);
    const rawKey = randomBytes(32).toString("hex");
    const keyHash = hashApiKey(rawKey);
    const [row] = await db
      .insert(apiKeys)
      .values({ companyId: req.companyId, keyHash, name })
      .returning();
    if (!row) throw new AppError(500, "Failed to create API key");
    // Return rawKey exactly once — it cannot be retrieved again
    res.status(201).json({ id: row.id, name: row.name, createdAt: row.createdAt, key: rawKey });
  } catch (err) {
    next(err);
  }
});

apiKeysRouter.delete("/:id", async (req, res, next) => {
  try {
    const [deleted] = await db
      .delete(apiKeys)
      .where(eq(apiKeys.id, req.params.id!))
      .returning();
    if (!deleted || deleted.companyId !== req.companyId) {
      throw new AppError(404, "API key not found");
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});
