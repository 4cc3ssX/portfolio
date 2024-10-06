import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { links } from "./links";

export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
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

export type CompanySelect = typeof companies.$inferSelect;
export type CompanyWithLink = Omit<CompanySelect, "linkId"> & {
  uri: string | null;
};
