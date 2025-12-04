import { blogs } from "../schemas/blogs";
import { ImageSelect } from "@/features/shared/types/images";

export type BlogSelect = typeof blogs.$inferSelect;
export type BlogInsert = typeof blogs.$inferInsert;

export type BlogWithCover = Omit<BlogSelect, "coverId" | "authorId"> & {
  cover: ImageSelect | null;
};

export type BlogWithAuthorAndCover = Omit<BlogSelect, "coverId" | "authorId"> & {
  cover: ImageSelect | null;
  author: {
    id: string;
    name: string;
    email: string;
    avatar: ImageSelect | null;
  } | null;
};
