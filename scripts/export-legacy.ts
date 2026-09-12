/**
 * Phase 0 — read-only dump of the legacy Drizzle/Supabase schema.
 *
 * Output feeds scripts/seed.ts and doubles as the rollback snapshot.
 * Run: bun run export:legacy
 */
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { Client } from "pg";

const TABLES = [
  "users",
  "images",
  "links",
  "tags",
  "skills",
  "companies",
  "experiences",
  "projects",
  "project_tags",
  "blogs",
] as const;

const OUT_DIR = join(process.cwd(), "data", "legacy");

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL is not set");

  const client = new Client({ connectionString });
  await client.connect();

  await mkdir(OUT_DIR, { recursive: true });

  const counts: Record<string, number> = {};

  for (const table of TABLES) {
    // Ordering by created_at keeps diffs stable between runs.
    const { rows } = await client.query(
      `SELECT * FROM public.${table} ORDER BY created_at ASC, id ASC`
    );
    await writeFile(
      join(OUT_DIR, `${table}.json`),
      `${JSON.stringify(rows, null, 2)}\n`
    );
    counts[table] = rows.length;
    console.info(`  ${table.padEnd(13)} ${rows.length}`);
  }

  await writeFile(
    join(OUT_DIR, "_manifest.json"),
    `${JSON.stringify({ exportedAt: new Date().toISOString(), counts }, null, 2)}\n`
  );

  await client.end();
  console.info(`\nWrote ${TABLES.length} tables to data/legacy/`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
