"use server";

import { db } from "@/shared/db";
import { blogs } from "../schemas/blogs";
import { BlogSelect, BlogWithAuthor, BlogWithCover } from "../types/blogs";
import { users } from "@/features/users/schemas/users";
import { images } from "@/features/shared/schemas/images";
import { ImageSelect } from "@/features/shared/types/images";
import { eq, sql } from "drizzle-orm";
import { cache } from "react";

const populateCover = sql<ImageSelect | null>`JSONB_BUILD_OBJECT(
    'id', ${images.id},
    'name', ${images.name},
    'uri', ${images.uri},
    'thumbnail_uri', ${images.thumbnailUri},
    'blur_hash', ${images.blurHash},
    'metadata', ${images.metadata},
    'created_at', ${images.createdAt},
    'updated_at', ${images.updatedAt}
)`;

const populateAvatar = sql<ImageSelect | null>`JSONB_BUILD_OBJECT(
    'id', avatar_img.id,
    'name', avatar_img.name,
    'uri', avatar_img.uri,
    'thumbnail_uri', avatar_img.thumbnail_uri,
    'blur_hash', avatar_img.blur_hash,
    'metadata', avatar_img.metadata,
    'created_at', avatar_img.created_at,
    'updated_at', avatar_img.updated_at
)`;

const populateAuthor = sql<BlogWithAuthor["author"]>`JSONB_BUILD_OBJECT(
    'id', ${users.id},
    'name', ${users.name},
    'email', ${users.email},
    'avatar', ${populateAvatar}
)`;

export const getBlogs = cache(async (): Promise<BlogWithCover[]> => {
  try {
    const data = await db
      .select({
        id: blogs.id,
        title: blogs.title,
        slug: blogs.slug,
        description: blogs.description,
        content: blogs.content,
        published: blogs.published,
        cover: populateCover.as("cover"),
        createdAt: blogs.createdAt,
        updatedAt: blogs.updatedAt,
      })
      .from(blogs)
      .leftJoin(images, eq(blogs.coverId, images.id))
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
      const avatarImg = db.$with("avatar_img").as(
        db.select().from(images)
      );

      const data = await db
        .with(avatarImg)
        .select({
          id: blogs.id,
          title: blogs.title,
          slug: blogs.slug,
          description: blogs.description,
          content: blogs.content,
          published: blogs.published,
          cover: populateCover.as("cover"),
          author: populateAuthor.as("author"),
          createdAt: blogs.createdAt,
          updatedAt: blogs.updatedAt,
        })
        .from(blogs)
        .leftJoin(images, eq(blogs.coverId, images.id))
        .leftJoin(users, eq(blogs.authorId, users.id))
        .leftJoin(avatarImg, eq(users.avatarId, avatarImg.id))
        .where(eq(blogs.slug, slug))
        .limit(1);

      return data[0] || null;
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
