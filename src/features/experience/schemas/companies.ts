import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { links } from "@/features/users/schemas/links";
import { images } from "@/features/shared/schemas/images";

export const companies = pgTable("companies", {
  id: uuid("id").primaryKey().defaultRandom(),
  imageId: uuid("image_id").references(() => images.id, {
    onUpdate: "cascade",
    onDelete: "restrict",
  }),
  name: text("name").notNull(),
  linkId: uuid("link_id").references(() => links.id, {
    onUpdate: "cascade",
    onDelete: "cascade",
  }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
