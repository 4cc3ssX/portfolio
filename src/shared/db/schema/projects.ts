import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { links, LinkSelect } from "./links";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  linkId: integer("link_id")
    .notNull()
    .references(() => links.id, {
      onUpdate: "cascade",
      onDelete: "cascade",
    }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export type ProjectSelect = typeof projects.$inferSelect;
export type ProjectWithLinkAndTags = Omit<ProjectSelect, "linkId"> & {
  link: string;
  tags: string[];
};
