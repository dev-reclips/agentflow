import type { Request, Response, NextFunction } from "express";
import { AppError } from "./error.js";

/**
 * Simple API key auth. Keys are stored in env as comma-separated list.
 * Replace with proper JWT/DB-backed auth for multi-tenant use.
 */
export function requireApiKey(req: Request, _res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    throw new AppError(401, "Missing Authorization header");
  }

  const token = header.slice(7);
  const validKeys = (process.env.API_KEYS ?? "").split(",").filter(Boolean);

  if (validKeys.length > 0 && !validKeys.includes(token)) {
    throw new AppError(401, "Invalid API key");
  }

  next();
}
