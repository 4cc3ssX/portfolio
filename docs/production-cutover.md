# Production cutover

Nothing here has been run against production. The live site is still served by
the legacy Drizzle tables in `public`, untouched.

## 1. Environment

Add to Vercel (Production + Preview):

| Variable | Notes |
|---|---|
| `PAYLOAD_SECRET` | already in `.env.local`; copy it to Vercel |
| `DATABASE_URL_DIRECT` | Supabase **session** pooler, port **5432** — DDL only |
| `BLOB_READ_WRITE_TOKEN` | create a Vercel Blob store first |
| `NEXT_PUBLIC_SERVER_URL` | `https://ryamjs.dev` |
| `PAYLOAD_PREVIEW_SECRET` | new random value |
| `CRON_SECRET` | new random value; guards `/api/payload-jobs/*` |

`DATABASE_URL` stays on the transaction pooler (`:6543`, `?pgbouncer=true`) for
runtime. DDL must not run through it.

> The adapter has **no `prepare` option** — that was an assumption in the plan
> and does not exist. pgbouncer compatibility comes from `?pgbouncer=true`.

## 2. Migrate

```bash
export DATABASE_URL_DIRECT='<session pooler :5432 url>'
bun run payload:migrate
```

This creates the `payload` schema and 34 tables. It does not touch `public`.
Verify:

```sql
select nspname from pg_namespace where nspname in ('public','payload');
select count(*) from information_schema.tables where table_schema='public';   -- still 10
```

## 3. Seed

```bash
bun run export:legacy            # against production DATABASE_URL
node --import tsx scripts/seed.ts
```

Expected counts: 4 posts, 12 projects, 5 experiences, 6 companies,
25 technologies (21 featured), 10 media, 4 social links, 1 series.

The seed reports any media it could not download — those keep their original
external URL in `legacyUri` and should be re-uploaded by hand in `/admin`.
Locally 1 of 10 (a Giphy cover) fell back this way.

## 4. Deploy

The frontend switches to the `payload` schema on this deploy. There is no
downtime before it: `public` keeps serving until the new build goes live.

Vercel cron (`vercel.json`) — **check the plan tier first**. Hobby allows only
daily granularity and 2 crons, which degrades scheduled publishing to ~daily.

## 5. First login

`/admin` → sign in with `SEED_ADMIN_EMAIL` and the password used for the seed.
Change the password immediately.

## 6. Only after production is confirmed green

```bash
psql "$DATABASE_URL_DIRECT" -f scripts/drop-legacy.sql
```

Never part of a deploy. Keep `data/legacy/*.json` (gitignored, local only) until
you are certain.
