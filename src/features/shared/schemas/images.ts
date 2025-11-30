import { json, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const images = pgTable("images", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  uri: text("uri").notNull(),
  thumbnailUri: text("thumbnail_uri").notNull(),
  blurHash: text("blur_hash").notNull(),
  metadata: json("metadata"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
