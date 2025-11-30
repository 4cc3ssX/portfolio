import { users } from "../schemas/users";
import { LinkWithoutUser } from "./links";

export type UserSelect = typeof users.$inferSelect;
export type UserWithLinks = UserSelect & {
  links: LinkWithoutUser[];
};
