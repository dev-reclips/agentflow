import { createHash } from "crypto";
import type { Request, Response, NextFunction } from "express";
import { eq } from "drizzle-orm";
import { db } from "../db/client.js";
import { apiKeys } from "../db/schema.js";
import { AppError } from "./error.js";

export function hashApiKey(raw: string): string {
  return createHash("sha256").update(raw).digest("hex");
}

export async function requireApiKey(req: Request, _res: Response, next: NextFunction): Promise<void> {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
      throw new AppError(401, "Missing Authorization header");
    }

    const raw = header.slice(7);
    const keyHash = hashApiKey(raw);

    const row = await db.query.apiKeys.findFirst({
      where: eq(apiKeys.keyHash, keyHash),
    });

    if (!row) {
      throw new AppError(401, "Invalid API key");
    }

    req.companyId = row.companyId;
    next();
  } catch (err) {
    next(err);
  }
}
