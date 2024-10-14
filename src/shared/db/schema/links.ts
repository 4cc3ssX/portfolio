import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { enumToPgEnum } from "@/utils/pg";

export enum LinkType {
  SOCIAL = "social",
  PROJECT = "project",
  EXTERNAL = "external",
}

const typeEnum = pgEnum("type", enumToPgEnum(LinkType));

export const links = pgTable("links", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: typeEnum("type").default(LinkType.EXTERNAL),
  uri: text("uri").notNull(),
  userId: integer("user_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export type LinkSelect = typeof links.$inferSelect;
export type LinkWithoutUser = Omit<LinkSelect, "userId">;
