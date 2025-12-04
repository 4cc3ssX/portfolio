import {
  boolean,
  date,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { companies } from "./companies";

// Re-export companies for external use
export { companies };

export const experiences = pgTable("experiences", {
  id: uuid("id").primaryKey().defaultRandom(),
  companyId: uuid("company_id")
    .notNull()
    .references(() => companies.id, {
      onUpdate: "cascade",
      onDelete: "restrict",
    }),
  position: text("position").notNull(),
  description: text("description").array().notNull(),
  startedAt: date("started_at").notNull(),
  endedAt: date("ended_at").defaultNow(),
  isActive: boolean("is_active").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
