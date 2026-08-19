import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema.js";

const { Pool } = pg;

type Db = ReturnType<typeof drizzle<typeof schema>>;

let _db: Db | undefined;

// Pool is created on first access so process.env.DATABASE_URL is read at query time,
// not at module evaluation time. This matters in ESM test environments where static
// imports are resolved before env vars from dotenv or vitest envFile are applied.
function getDb(): Db {
  if (!_db) {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    _db = drizzle(pool, { schema });
  }
  return _db;
}

export const db = new Proxy({} as Db, {
  get(_, prop) {
    return (getDb() as unknown as Record<string | symbol, unknown>)[prop];
  },
});
