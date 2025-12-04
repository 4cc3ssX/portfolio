import { users } from "../schemas/users";
import { LinkWithoutUser } from "./links";
import { ImageSelect } from "@/features/shared/types/images";

export type UserSelect = typeof users.$inferSelect;
export type UserWithLinks = UserSelect & {
  links: LinkWithoutUser[];
};

export type UserWithLinksAndAvatar = Omit<UserSelect, "avatarId"> & {
  avatar: ImageSelect | null;
  links: LinkWithoutUser[];
};
