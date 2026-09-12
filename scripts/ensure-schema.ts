/**
 * Creates the `payload` Postgres schema if it is missing.
 *
 * Payload emits schema-qualified DDL but never creates the schema, and its own
 * `payload_migrations` bookkeeping table lives inside it — so this cannot be a
 * migration (the runner needs the table before the first migration runs). It
 * runs as a pre-step of `payload:migrate` instead.
 */
import { Client } from "pg";

const SCHEMA = "payload";

async function main() {
  const connectionString = process.env.DATABASE_URL_DIRECT || process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL_DIRECT or DATABASE_URL must be set");

  const client = new Client({ connectionString });
  await client.connect();

  // Identifier is a hardcoded constant, never user input.
  await client.query(`CREATE SCHEMA IF NOT EXISTS "${SCHEMA}"`);

  const { rows } = await client.query(
    "SELECT count(*)::int AS n FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE'"
  );
  console.info(`schema "${SCHEMA}" ready — public still holds ${rows[0].n} table(s)`);

  await client.end();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
