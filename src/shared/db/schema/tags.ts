import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const tagsTable = pgTable("tags", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export type TagSelect = typeof tagsTable.$inferSelect;
