import { type Router as IRouter, Router } from "express";
import { z } from "zod";
import { randomBytes, scryptSync } from "crypto";
import { eq } from "drizzle-orm";
import { db } from "../db/client.js";
import { companies, users, apiKeys, subscriptions } from "../db/schema.js";
import { hashApiKey } from "../middleware/auth.js";
import { signToken, requireSession } from "../middleware/session.js";
import { AppError } from "../middleware/error.js";
import { sendWelcomeEmail } from "../services/email.js";

export const authRouter: IRouter = Router();

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 100);
}

function hashPassword(raw: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(raw, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(raw: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const check = scryptSync(raw, salt, 64).toString("hex");
  return check === hash;
}

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  companyName: z.string().min(1).max(200).optional(),
});

authRouter.post("/register", async (req, res, next) => {
  try {
    const { email, password, companyName: rawCompanyName } = registerSchema.parse(req.body);

    // Auto-derive company name from email domain if not provided (e.g. "acme.com" → "Acme")
    const emailDomain = email.split("@")[1]?.split(".")[0] ?? "myteam";
    const companyName = rawCompanyName ?? (emailDomain.charAt(0).toUpperCase() + emailDomain.slice(1));

    const existing = await db.query.users.findFirst({ where: eq(users.email, email) });
    if (existing) throw new AppError(409, "Email already in use");

    const baseSlug = slugify(companyName);
    let slug = baseSlug;
    let attempt = 0;
    while (true) {
      const conflict = await db.query.companies.findFirst({ where: eq(companies.slug, slug) });
      if (!conflict) break;
      attempt++;
      slug = `${baseSlug}-${attempt}`;
    }

    const [company] = await db.insert(companies).values({ name: companyName, slug }).returning();
    if (!company) throw new AppError(500, "Failed to create company");

    const passwordHash = hashPassword(password);
    const [user] = await db
      .insert(users)
      .values({ companyId: company.id, email, passwordHash, role: "owner" })
      .returning();
    if (!user) throw new AppError(500, "Failed to create user");

    const rawKey = randomBytes(32).toString("hex");
    const [apiKey] = await db
      .insert(apiKeys)
      .values({ companyId: company.id, keyHash: hashApiKey(rawKey), name: "Default" })
      .returning();
    if (!apiKey) throw new AppError(500, "Failed to create API key");

    // Create free-tier subscription (no Stripe required)
    await db.insert(subscriptions).values({
      companyId: company.id,
      stripeCustomerId: null,
      plan: "free",
      status: "active",
    });

    const token = await signToken({ userId: user.id, companyId: company.id });

    // Fire-and-forget: don't let email failure break registration
    sendWelcomeEmail(company.id, email, company.name).catch((err) => {
      console.error("[email] Failed to send welcome email:", err);
    });

    res.status(201).json({
      token,
      apiKey: rawKey,
      user: { id: user.id, email: user.email, role: user.role },
      company: { id: company.id, name: company.name, slug: company.slug },
    });
  } catch (err) {
    next(err);
  }
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

authRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await db.query.users.findFirst({ where: eq(users.email, email) });
    if (!user || !verifyPassword(password, user.passwordHash)) {
      throw new AppError(401, "Invalid email or password");
    }

    const token = await signToken({ userId: user.id, companyId: user.companyId });
    res.json({
      token,
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
});

authRouter.get("/me", requireSession, async (req, res, next) => {
  try {
    const user = await db.query.users.findFirst({ where: eq(users.id, req.userId) });
    if (!user) throw new AppError(404, "User not found");
    const company = await db.query.companies.findFirst({ where: eq(companies.id, req.companyId) });
    res.json({
      user: { id: user.id, email: user.email, role: user.role },
      company,
    });
  } catch (err) {
    next(err);
  }
});
