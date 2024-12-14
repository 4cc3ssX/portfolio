import { dbConfigs } from "@/shared/configs/db";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/shared/db/schema/*",
  out: "./supabase/migrations",
  dialect: "postgresql",
  dbCredentials: {
    host: dbConfigs.host,
    port: dbConfigs.port,
    user: dbConfigs.user,
    password: dbConfigs.password,
    database: dbConfigs.name,
  },
  migrations: {
    prefix: "supabase",
  },
  verbose: true,
  strict: true,
});
