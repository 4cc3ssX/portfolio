import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { projects } from "./projects";
import { tags } from "@/features/shared/schemas/tags";

export const projectTags = pgTable("project_tags", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id")
    .notNull()
    .references(() => projects.id, {
      onUpdate: "cascade",
      onDelete: "cascade",
    }),
  tagId: uuid("tag_id")
    .notNull()
    .references(() => tags.id, {
      onUpdate: "cascade",
      onDelete: "cascade",
    }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
