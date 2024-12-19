import {
  boolean,
  date,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { companies, CompanyWithImageAndLink } from "./companies";

export const experiences = pgTable("experiences", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id")
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
    .$onUpdate(() => new Date()),
});

export type ExperienceSelect = typeof experiences.$inferSelect;
export type ExperienceWithCompany = Omit<ExperienceSelect, "companyId"> & {
  company: CompanyWithImageAndLink;
};
