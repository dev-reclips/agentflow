import { createHash } from "crypto";
import { jwtVerify } from "jose";
import type { Request, Response, NextFunction } from "express";
import { eq } from "drizzle-orm";
import { db } from "../db/client.js";
import { apiKeys } from "../db/schema.js";
import { AppError } from "./error.js";

const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET ?? "dev-secret-change-in-prod");

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

    // Accept JWT session tokens (from dashboard login) in addition to API keys
    if (raw.split(".").length === 3) {
      try {
        const { payload } = await jwtVerify(raw, jwtSecret);
        if (typeof payload.companyId === "string") {
          req.companyId = payload.companyId;
          if (typeof payload.sub === "string") req.userId = payload.sub;
          return next();
        }
      } catch {
        // Not a valid JWT — fall through to API key lookup
      }
    }

    const keyHash = hashApiKey(raw);
    const row = await db.query.apiKeys.findFirst({
      where: eq(apiKeys.keyHash, keyHash),
    });
    if (!row) throw new AppError(401, "Invalid API key");
    req.companyId = row.companyId;
    next();
  } catch (err) {
    next(err);
  }
}
