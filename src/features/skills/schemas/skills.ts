import { integer, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { tags } from "@/features/shared/schemas/tags";

export const skills = pgTable("skills", {
  id: uuid("id").primaryKey().defaultRandom(),
  tagId: uuid("tag_id")
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
    .defaultNow()
    .$onUpdate(() => new Date()),
});
