import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { images } from "@/features/shared/schemas/images";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  nickname: text("nickname").notNull(),
  email: text("email").notNull(),
  avatarId: uuid("avatar_id").references(() => images.id, {
    onUpdate: "cascade",
    onDelete: "restrict",
  }),
  slogan: text("slogan").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
