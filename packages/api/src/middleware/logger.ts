import type { Request, Response, NextFunction } from "express";
import pino from "pino";

const isDev = process.env.NODE_ENV !== "production";
export const log = isDev
  ? pino({ transport: { target: "pino-pretty", options: { colorize: true } } })
  : pino();

export function logger(req: Request, _res: Response, next: NextFunction): void {
  log.info({ method: req.method, url: req.url }, "request");
  next();
}
