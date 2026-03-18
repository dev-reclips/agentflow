# ADR 0001: Monorepo structure with Turborepo

**Date:** 2026-03-18
**Status:** Accepted

## Context

We need a foundation that can ship fast pre-PMF while keeping packages decoupled enough to scale later. The product has at minimum three concerns: API server, web frontend, and agent SDK.

## Decision

Use a pnpm monorepo with Turborepo for task orchestration.

Packages:
- `@agentflow/api` — Express REST API with PostgreSQL/Drizzle
- `@agentflow/web` — Next.js frontend
- `@agentflow/sdk` — typed client SDK shared between web and external consumers

**Tech stack rationale:**
- **TypeScript everywhere** — single language reduces context switching, strong types catch bugs early
- **Express** over Fastify/Hono — team familiarity, vast ecosystem, sufficient performance for MVP
- **Drizzle ORM** — type-safe queries without heavy ORM magic; SQL-first mindset
- **PostgreSQL** — proven, JSONB for flexible metadata when needed
- **Next.js App Router** — server components reduce client JS; easy deploy on Vercel
- **Vitest** — fast, ESM-native, compatible with pnpm workspaces

## Trade-offs

- Monorepo adds setup overhead upfront, saves cross-package refactoring cost later
- Express is not the fastest runtime — acceptable for MVP scale, revisit if latency becomes an issue
- Drizzle requires manual migration management — acceptable; keeps us close to SQL

## Alternatives considered

- Separate repos: rejected — too much coordination overhead for a two-person team
- Prisma: rejected — migration model is less transparent; Drizzle's push/generate is simpler at this stage
- NestJS: rejected — too much ceremony for MVP velocity
