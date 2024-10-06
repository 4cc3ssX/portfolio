import { integer, pgTable, serial, timestamp } from "drizzle-orm/pg-core";
import { projectsTable } from "./projects";
import { tagsTable } from "./tags";

export const projectTagsTable = pgTable("project_tags", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id")
    .notNull()
    .references(() => projectsTable.id, {
      onUpdate: "cascade",
      onDelete: "cascade",
    }),
  tagId: integer("tag_id")
    .notNull()
    .references(() => tagsTable.id, {
      onUpdate: "cascade",
      onDelete: "cascade",
    }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});
