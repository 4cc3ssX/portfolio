import {
  integer,
  json,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const images = pgTable("tags", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  uri: text("uri").notNull(),
  thumbnailUri: text("thumbnail_uri"),
  blurHash: text("blur_hash"),
  metadata: json("metadata"),
  userId: integer("user_id").references(() => users.id, {
    onUpdate: "cascade",
    onDelete: "cascade",
  }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export type ImageSelect = typeof images.$inferSelect;
