import { db } from "@/shared/db";
import { links } from "../schemas/links";
import { LinkWithoutUser } from "../types/links";
import { UserWithLinksAndAvatar } from "../types/users";
import { users } from "../schemas/users";
import { images } from "@/features/shared/schemas/images";
import { ImageSelect } from "@/features/shared/types/images";
import { eq, sql } from "drizzle-orm";

const populateLinks = sql<LinkWithoutUser[]>`ARRAY_AGG(
  JSONB_BUILD_OBJECT(
    'id', ${links.id},
    'name', ${links.name},
    'type', ${links.type},
    'uri', ${links.uri},
    'created_at', ${links.createdAt},
    'updated_at', ${links.updatedAt}
  )
)`;

export const getMe = async (): Promise<UserWithLinksAndAvatar> => {
  const result = await db
    .select({
      id: users.id,
      name: users.name,
      nickname: users.nickname,
      email: users.email,
      slogan: users.slogan,
      message: users.message,
      avatar: sql<ImageSelect | null>`CASE WHEN ${images.id} IS NOT NULL THEN JSONB_BUILD_OBJECT(
        'id', ${images.id},
        'name', ${images.name},
        'uri', ${images.uri},
        'thumbnailUri', ${images.thumbnailUri},
        'blurHash', ${images.blurHash},
        'metadata', ${images.metadata},
        'createdAt', ${images.createdAt},
        'updatedAt', ${images.updatedAt}
      ) ELSE NULL END`,
      links: populateLinks.as("links"),
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    })
    .from(users)
    .leftJoin(links, eq(links.userId, users.id))
    .leftJoin(images, eq(users.avatarId, images.id))
    .groupBy(users.id, images.id)
    .limit(1)
    .orderBy();

  if (!result[0]) {
    throw new Error("User not found");
  }

  return result[0];
};
