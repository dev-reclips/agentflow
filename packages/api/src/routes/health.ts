import { type Router as IRouter, Router } from "express";

export const healthRouter: IRouter = Router();

healthRouter.get("/", (_req, res) => {
  res.json({ status: "ok", ts: new Date().toISOString() });
});
