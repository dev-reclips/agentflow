import { type Router as IRouter, Router } from "express";
import { z } from "zod";
import { db } from "../db/client.js";
import { demoRequests } from "../db/schema.js";
import { sendDemoConfirmationEmail, sendDemoNotificationEmail } from "../services/email.js";

export const demoRouter: IRouter = Router();

const demoRequestSchema = z.object({
  name: z.string().min(1).max(200),
  workEmail: z.string().email(),
  company: z.string().min(1).max(200),
  role: z.string().min(1).max(200),
  teamSize: z.string().min(1).max(50),
  painPoint: z.string().max(2000).optional(),
});

demoRouter.post("/request", async (req, res, next) => {
  try {
    const data = demoRequestSchema.parse(req.body);

    const insert = { ...data, painPoint: data.painPoint ?? null };
    const [row] = await db.insert(demoRequests).values(insert).returning();
    if (!row) throw new Error("Failed to save demo request");

    sendDemoConfirmationEmail(data.name, data.workEmail).catch((err) => {
      console.error("[email] Demo confirmation failed:", err);
    });
    sendDemoNotificationEmail({ ...data, painPoint: data.painPoint ?? null }).catch((err) => {
      console.error("[email] Demo notification failed:", err);
    });

    res.status(201).json({ id: row.id });
  } catch (err) {
    next(err);
  }
});
