import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { links } from "./links";
import { images, ImageSelect } from "./images";

export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  imageId: integer("image_id").references(() => images.id, {
    onUpdate: "cascade",
    onDelete: "restrict",
  }),
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
export type CompanyWithImageAndLink = Omit<
  CompanySelect,
  "linkId" | "imageId"
> & {
  image: ImageSelect;
  uri: string | null;
};
