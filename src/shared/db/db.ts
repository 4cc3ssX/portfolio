import "server-only";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { dbConfigs } from "@/shared/configs/db";

// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres({
  host: dbConfigs.host,
  port: dbConfigs.port,
  user: dbConfigs.user,
  password: dbConfigs.password,
  database: dbConfigs.name,

  prepare: false,
});

export const db = drizzle(client);
