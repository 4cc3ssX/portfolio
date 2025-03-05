import { db } from "@/shared/db";
import { links, LinkWithoutUser } from "@/shared/db/schema";
import { users, UserWithLinks } from "@/shared/db/schema/users";
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

export const getMe = async (): Promise<UserWithLinks> => {
  const result = await db
    .select({
      id: users.id,
      name: users.name,
      nickname: users.nickname,
      email: users.email,
      slogan: users.slogan,
      message: users.message,
      links: populateLinks.as("links"),
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    })
    .from(users)
    .leftJoin(links, eq(links.userId, users.id))
    .groupBy(users.id)
    .limit(1)
    .orderBy();

  if (!result[0]) {
    throw new Error("User not found");
  }

  return result[0];
};
