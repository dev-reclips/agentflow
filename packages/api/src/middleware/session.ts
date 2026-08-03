import { SignJWT, jwtVerify } from "jose";
import type { Request, Response, NextFunction } from "express";
import { AppError } from "./error.js";

const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? "dev-secret-change-in-prod");

export async function signToken(payload: { userId: string; companyId: string }): Promise<string> {
  return new SignJWT({ companyId: payload.companyId })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.userId)
    .setExpirationTime("7d")
    .sign(secret);
}

export async function requireSession(req: Request, _res: Response, next: NextFunction): Promise<void> {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) throw new AppError(401, "Missing Authorization header");
    const token = header.slice(7);
    const { payload } = await jwtVerify(token, secret);
    if (typeof payload.sub !== "string" || typeof payload.companyId !== "string") {
      throw new AppError(401, "Invalid token payload");
    }
    req.userId = payload.sub;
    req.companyId = payload.companyId;
    next();
  } catch (err) {
    if (err instanceof AppError) return next(err);
    next(new AppError(401, "Invalid or expired token"));
  }
}
