import { db } from "@/shared/db";
import { links, LinkSelect, LinkType } from "@/shared/db/schema";
import { users, UserWithLinks } from "@/shared/db/schema/users";
import { and, eq, ilike, or, sql } from "drizzle-orm";

const populateLinks = sql<Omit<LinkSelect, "userId">[]>`ARRAY_AGG(
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
    .leftJoin(
      links,
      and(
        eq(links.userId, users.id),
        or(eq(links.type, LinkType.SOCIAL), ilike(links.name, "resume"))
      )
    )
    .groupBy(users.id)
    .limit(1)
    .orderBy();

  if (!result[0]) {
    throw new Error("User not found");
  }

  return result[0];
};
