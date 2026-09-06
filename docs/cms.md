# Payload CMS

The site's content lives in Payload, served from the same Next.js app at
`/admin`. Everything on the public site — posts, projects, experiences,
technologies, and the home page copy — is editable there.

## Local development

```bash
supabase start                 # local Postgres on :54322
bun run db:ensure-schema       # creates the `payload` schema
bun run payload:migrate        # applies src/migrations
bun run export:legacy          # dumps the old Supabase tables (needs prod DATABASE_URL)
bun run seed                   # imports data/legacy/*.json through the Local API
bun dev
```

`.env.development.local` points at the local Docker Supabase and takes
precedence over `.env.local` in development, so a local run can never reach
production. It is gitignored; create it with:

```
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres
DATABASE_URL_DIRECT=postgresql://postgres:postgres@127.0.0.1:54322/postgres
PAYLOAD_SECRET=<any 32+ chars>
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
PAYLOAD_PREVIEW_SECRET=<any>
CRON_SECRET=<any>
SEED_ADMIN_EMAIL=hello@ryamjs.dev
SEED_ADMIN_PASSWORD=<choose one>
```

Payload's CLI needs Node 22 (`.nvmrc`); Node 26 cannot load the config.
`bun` cannot run the seed either — Lexical's circular ESM breaks it — so use
`node --import tsx scripts/seed.ts`.

## Schema isolation

Payload's tables live in a dedicated **`payload` Postgres schema**. Four
collections (`users`, `projects`, `companies`, `experiences`) share a name with
a legacy table in `public`, and the legacy tables keep serving production until
cutover. `schemaName: 'payload'` in the adapter keeps them apart; Payload emits
schema-qualified DDL but does not create the schema, so `bun run payload:migrate`
runs `scripts/ensure-schema.ts` first.

`push` is explicitly `false`. It defaults to **on in development**, which would
auto-sync schema against whatever `DATABASE_URL` points at.

## Blog content is markdown

`posts.content` stores raw markdown, not Lexical. The existing MDX pipeline
(`remark-gfm`, `rehype-pretty-code`, and the `recma-mdx-html-override` that
routes raw `<img>` tags through the MDX component map) renders it unchanged.

That matters for GIFs: every cover is an animated Giphy embed written as

```html
<img src="…giphy.gif" alt="…" data-source="https://giphy.com/gifs/…" data-priority="true" />
```

Markdown's `![]()` cannot carry `data-source` or `data-priority`, so the
**Insert GIF** button in the editor writes this exact shape.

Animated images must bypass the Next image optimizer — sharp resizes by reading
frame one, turning an animation into a still. `isAnimatedSrc()`
(`src/utils/images.ts`) drives the `unoptimized` prop everywhere an image URL
comes from content.

## Publishing

- Drafts are private: unauthenticated reads are filtered to `_status=published`.
- **Preview** requires both `PAYLOAD_PREVIEW_SECRET` and a valid Payload session.
- Setting `publishedAt` to a future date on a draft queues a `publishPost` job
  that publishes it at that moment.
- `refreshGithubStars` syncs star/fork counts hourly onto `projects`, so the
  `/projects` page never calls the GitHub API during a render.
- Both job endpoints require `Authorization: Bearer $CRON_SECRET`.

## Deleting

`posts`, `projects`, `media` and `experiences` use soft delete. A delete moves
the document to `/admin/collections/<slug>/trash`, where it can be restored or
permanently removed. The frontend queries with `trash: false`.

## Known issues

- **Next 16 answers `notFound()` with HTTP 200** and the not-found body instead
  of a 404. Reproducible on a bare page with no custom `not-found.tsx`, and on
  the deployed site before this migration, so it is not caused by the two root
  layouts. Unknown and unpublished slugs are marked `robots: noindex, nofollow`,
  which is what actually keeps them out of the search index while the status
  code is wrong. Revisit when Next fixes it.
- `reactCompiler` is off. It has not been validated against Payload's admin
  bundle; re-enable once `/admin` is confirmed clean.
