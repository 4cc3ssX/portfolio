import { dbConfigs } from "@/shared/configs/db";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/shared/db/schema/*",
  out: "./supabase/migrations",
  dialect: "postgresql",
  dbCredentials: {
    host: dbConfigs.getHost(),
    port: dbConfigs.getPort(),
    user: dbConfigs.getUser(),
    password: dbConfigs.getPassword(),
    database: dbConfigs.getName(),
  },
  migrations: {
    prefix: "supabase",
  },
  verbose: true,
  strict: true,
});
