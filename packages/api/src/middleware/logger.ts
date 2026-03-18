import type { Request, Response, NextFunction } from "express";
import pino from "pino";

export const log = pino({
  transport:
    process.env.NODE_ENV !== "production"
      ? { target: "pino-pretty", options: { colorize: true } }
      : undefined,
});

export function logger(req: Request, _res: Response, next: NextFunction): void {
  log.info({ method: req.method, url: req.url }, "request");
  next();
}
