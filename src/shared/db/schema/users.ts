import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { LinkSelect, LinkWithoutUser } from "./links";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nickname: text("nickname").notNull(),
  email: text("email").notNull(),
  slogan: text("slogan").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export type UserSelect = typeof users.$inferSelect;
export type UserWithLinks = UserSelect & {
  links: LinkWithoutUser[];
};
