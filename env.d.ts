declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_CONTACT_EMAIL: string;
      NEXT_PUBLIC_SERVER_URL: string;

      NEXT_PUBLIC_FIREBASE_API_KEY: string;
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: string;
      NEXT_PUBLIC_FIREBASE_PROJECT_ID: string;
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: string;
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string;
      NEXT_PUBLIC_FIREBASE_APP_ID: string;

      DATABASE_URL: string;
      /** Session pooler (:5432). Migrations only — DDL must avoid pgbouncer. */
      DATABASE_URL_DIRECT?: string;

      PAYLOAD_SECRET: string;
      PAYLOAD_PREVIEW_SECRET: string;
      CRON_SECRET: string;
      BLOB_READ_WRITE_TOKEN?: string;

      SEED_ADMIN_EMAIL?: string;
      SEED_ADMIN_PASSWORD?: string;

      GITHUB_TOKEN?: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
