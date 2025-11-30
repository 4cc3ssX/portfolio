import { links } from "../schemas/links";

export type LinkSelect = typeof links.$inferSelect;
export type LinkWithoutUser = Omit<LinkSelect, "userId">;
