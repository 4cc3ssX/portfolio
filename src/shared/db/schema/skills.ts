import { integer, pgTable, serial, timestamp } from "drizzle-orm/pg-core";
import { tags, TagSelect } from "./tags";

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  tagId: integer("tag_id")
    .notNull()
    .references(() => tags.id, {
      onUpdate: "cascade",
      onDelete: "cascade",
    }),
  min: integer("min").notNull(),
  max: integer("max").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export type SkillSelect = typeof skills.$inferSelect;
export type SkillWithTag = Omit<SkillSelect, "tagId"> & {
  tag: TagSelect;
};
