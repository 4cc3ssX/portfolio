"use server";

import { db } from "@/shared/db";
import { blogs } from "../schemas/blogs";
import { BlogSelect, BlogWithAuthor } from "../types/blogs";
import { users } from "@/features/users/schemas/users";
import { images } from "@/features/shared/schemas/images";
import { ImageSelect } from "@/features/shared/types/images";
import { eq } from "drizzle-orm";
import { cache } from "react";

export const getBlogs = cache(async (): Promise<BlogSelect[]> => {
  try {
    const data = await db
      .select()
      .from(blogs)
      .where(eq(blogs.published, true))
      .orderBy(blogs.createdAt);

    return data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
});

export const getBlogBySlug = cache(
  async (slug: string): Promise<BlogWithAuthor | null> => {
    try {
      const data = await db
        .select({
          id: blogs.id,
          title: blogs.title,
          slug: blogs.slug,
          description: blogs.description,
          content: blogs.content,
          published: blogs.published,
          createdAt: blogs.createdAt,
          updatedAt: blogs.updatedAt,
          coverId: blogs.coverId,
          authorId: blogs.authorId,
        })
        .from(blogs)
        .where(eq(blogs.slug, slug))
        .limit(1);

      if (!data[0]) return null;

      const blog = data[0];

      // Fetch cover image if exists
      let cover: ImageSelect | null = null;
      if (blog.coverId) {
        const coverData = await db
          .select()
          .from(images)
          .where(eq(images.id, blog.coverId))
          .limit(1);
        cover = coverData[0] || null;
      }

      // Fetch author with avatar if exists
      let author: BlogWithAuthor["author"] = null;
      if (blog.authorId) {
        const authorData = await db
          .select({
            id: users.id,
            name: users.name,
            email: users.email,
            avatarId: users.avatarId,
          })
          .from(users)
          .where(eq(users.id, blog.authorId))
          .limit(1);

        if (authorData[0]) {
          let avatar: ImageSelect | null = null;
          if (authorData[0].avatarId) {
            const avatarData = await db
              .select()
              .from(images)
              .where(eq(images.id, authorData[0].avatarId))
              .limit(1);
            avatar = avatarData[0] || null;
          }

          author = {
            id: authorData[0].id,
            name: authorData[0].name,
            email: authorData[0].email,
            avatar,
          };
        }
      }

      const { coverId: _, authorId: __, ...blogWithoutIds } = blog;

      return {
        ...blogWithoutIds,
        cover,
        author,
      };
    } catch (error) {
      console.error("Error fetching blog:", error);
      return null;
    }
  }
);

export const getBlogById = cache(
  async (id: string): Promise<BlogSelect | null> => {
    try {
      const data = await db
        .select()
        .from(blogs)
        .where(eq(blogs.id, id))
        .limit(1);

      return data[0] || null;
    } catch (error) {
      console.error("Error fetching blog:", error);
      return null;
    }
  }
);
