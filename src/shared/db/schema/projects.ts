import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { linksTable } from "./links";

export const projectsTable = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  linkId: integer("link_id")
    .notNull()
    .references(() => linksTable.id, {
      onUpdate: "cascade",
      onDelete: "cascade",
    }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export type ProjectSelect = typeof projectsTable.$inferSelect;
