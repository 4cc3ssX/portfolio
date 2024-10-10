import { integer, pgTable, serial, timestamp } from "drizzle-orm/pg-core";
import { projects } from "./projects";
import { tags } from "./tags";

export const projectTags = pgTable("project_tags", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id")
    .notNull()
    .references(() => projects.id, {
      onUpdate: "cascade",
      onDelete: "cascade",
    }),
  tagId: integer("tag_id")
    .notNull()
    .references(() => tags.id, {
      onUpdate: "cascade",
      onDelete: "cascade",
    }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});
