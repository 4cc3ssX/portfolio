import { pgTable, text, timestamp, boolean, uuid } from "drizzle-orm/pg-core";
import { users } from "@/features/users/schemas/users";
import { images } from "@/features/shared/schemas/images";

export const blogs = pgTable("blogs", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  content: text("content").notNull(), // MDX content
  coverId: uuid("cover_id").references(() => images.id, {
    onUpdate: "cascade",
    onDelete: "restrict",
  }),
  published: boolean("published").notNull().default(false),
  authorId: uuid("author_id").references(() => users.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
