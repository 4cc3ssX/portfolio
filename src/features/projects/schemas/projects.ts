import {
  boolean,
  date,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { links } from "@/features/users/schemas/links";

// Re-export project-tags
export { projectTags } from "./project-tags";

export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  linkId: uuid("link_id").references(() => links.id, {
    onUpdate: "cascade",
    onDelete: "cascade",
  }),
  isActive: boolean("is_active").notNull(),
  startedAt: date("started_at").notNull(),
  endedAt: date("ended_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
