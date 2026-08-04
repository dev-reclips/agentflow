import { type Router as IRouter, Router } from "express";
import type { Request, Response, NextFunction } from "express";
import { AppError } from "../middleware/error.js";
import { resetDemo } from "../services/demo-seed.js";

export const adminRouter: IRouter = Router();

function requireAdminKey(req: Request, _res: Response, next: NextFunction): void {
  const adminKey = process.env.ADMIN_API_KEY;
  if (!adminKey) { next(new AppError(503, "Admin API not configured")); return; }

  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ") || header.slice(7) !== adminKey) {
    next(new AppError(401, "Unauthorized"));
    return;
  }
  next();
}

adminRouter.post("/demo/reset", requireAdminKey, async (_req, res, next) => {
  try {
    const password = process.env.DEMO_PASSWORD;
    if (!password) throw new AppError(503, "DEMO_PASSWORD not configured");
    await resetDemo(password);
    res.json({ ok: true, message: "Demo environment reset." });
  } catch (err) {
    next(err);
  }
});
