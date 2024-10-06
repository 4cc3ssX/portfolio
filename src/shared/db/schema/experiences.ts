import {
  boolean,
  date,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { companiesTable } from "./companies";

export const experiencesTable = pgTable("experiences", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id")
    .notNull()
    .references(() => companiesTable.id, {
      onUpdate: "cascade",
      onDelete: "restrict",
    }),
  position: text("position").notNull(),
  startAt: date("start_at").notNull(),
  endAt: date("end_at").defaultNow(),
  isActive: boolean("is_active").default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export type ExperienceSelect = typeof experiencesTable.$inferSelect;
