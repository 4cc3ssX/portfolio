import path from "node:path";
import { fileURLToPath } from "node:url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Categories } from "@/collections/Categories";
import { Companies } from "@/collections/Companies";
import { Experiences } from "@/collections/Experiences";
import { Media } from "@/collections/Media";
import { Posts } from "@/collections/Posts";
import { Projects } from "@/collections/Projects";
import { Series } from "@/collections/Series";
import { Technologies } from "@/collections/Technologies";
import { Users } from "@/collections/Users";
import { Navigation } from "@/globals/Navigation";
import { SiteSettings } from "@/globals/SiteSettings";
import { publishPostTask } from "@/jobs/publish-post";
import { refreshGithubStarsTask } from "@/jobs/refresh-github-stars";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const isVercelBlobConfigured = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

/** Set by the `payload:migrate` and `seed` scripts. See the pool comment. */
const useDirectConnection = process.env.PAYLOAD_DIRECT_CONNECTION === "true";

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      titleSuffix: " — Ryam CMS",
    },
  },

  collections: [
    Posts,
    Categories,
    Series,
    Projects,
    Technologies,
    Experiences,
    Companies,
    Media,
    Users,
  ],
  globals: [SiteSettings, Navigation],

  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },

  db: postgresAdapter({
    pool: {
      // Runtime traffic goes through the transaction pooler (:6543); only DDL
      // and bulk seeding use the session pooler (:5432) via
      // DATABASE_URL_DIRECT.
      //
      // The flag matters: both variables are set in production, so a plain
      // `DIRECT || URL` fallback would silently route *every* request through
      // the session pooler, which allows far fewer concurrent connections and
      // would exhaust them under serverless concurrency.
      //
      // No `prepare` option exists on this adapter (drizzle's node-postgres
      // driver does not use prepared statements unless asked), so pgbouncer
      // compatibility comes from `?pgbouncer=true` on the connection string.
      connectionString: useDirectConnection
        ? (process.env.DATABASE_URL_DIRECT ?? process.env.DATABASE_URL)
        : process.env.DATABASE_URL,
    },
    // Keeps every Payload table out of `public`, where the legacy Drizzle
    // schema still lives and still serves production during the migration.
    schemaName: "payload",
    // Default is ON in development, which would auto-sync schema against
    // whatever DATABASE_URL points at. Migrations only.
    push: false,
    idType: "uuid",
    allowIDOnCreate: true,
    migrationDir: path.resolve(dirname, "migrations"),
  }),

  jobs: {
    tasks: [publishPostTask, refreshGithubStarsTask],
    access: {
      // Guards /api/payload-jobs/run and /handle-schedules, which are otherwise
      // open to anyone who can reach the deployment.
      run: ({ req }) => {
        if (req.user) return true;
        const secret = process.env.CRON_SECRET;
        if (!secret) return false;
        const auth = req.headers.get("authorization");
        return auth === `Bearer ${secret}`;
      },
    },
  },

  // No SEO plugin: `seoField()` already gives posts and projects their
  // title/description/image overrides without a second competing `seo` group.
  plugins: [
    ...(isVercelBlobConfigured
      ? [
          vercelBlobStorage({
            collections: { media: true },
            token: process.env.BLOB_READ_WRITE_TOKEN as string,
            // Vercel caps server request bodies well below what a large GIF
            // needs; client uploads go browser -> Blob directly.
            clientUploads: true,
          }),
        ]
      : []),
  ],

  sharp,
  telemetry: false,
});
