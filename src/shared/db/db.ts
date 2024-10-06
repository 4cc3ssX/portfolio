import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { dbConfigs } from "@/shared/configs/db";

// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres({
  host: dbConfigs.getHost(),
  port: dbConfigs.getPort(),
  user: dbConfigs.getUser(),
  password: dbConfigs.getPassword(),
  database: dbConfigs.getName(),

  prepare: false,
});

export const db = drizzle(client);
