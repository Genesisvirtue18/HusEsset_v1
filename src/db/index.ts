import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

function createMissingDbError() {
  return new Error(
    "DATABASE_URL is required to use admin features and form submissions. Add it to .env.local to enable the database.",
  );
}

function createMissingDbProxy(): any {
  const proxy: any = new Proxy(() => proxy, {
    get(_target, prop) {
      if (prop === "then") {
        return (_resolve: unknown, reject: (reason: unknown) => void) => {
          reject(createMissingDbError());
        };
      }

      return proxy;
    },
    apply() {
      return proxy;
    },
  });

  return proxy;
}

export const pool = databaseUrl
  ? globalForDb.__arenaNextJsPostgresqlPool ??
    new Pool({
      connectionString: databaseUrl,
    })
  : (null as unknown as Pool);

if (databaseUrl && process.env.NODE_ENV !== "production") {
  globalForDb.__arenaNextJsPostgresqlPool = pool;
}

export const db = databaseUrl ? drizzle(pool) : createMissingDbProxy();
