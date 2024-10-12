import { db } from "@/shared/db";
import { tags, TagSelect } from "@/shared/db/schema";
import { skills, SkillWithTag } from "@/shared/db/schema/skills";
import { desc, eq, sql } from "drizzle-orm";

const populateTag = sql<TagSelect>`JSONB_BUILD_OBJECT(
    'id', ${tags.id},
    'name', ${tags.name},
    'term', ${tags.term},
    'created_at', ${tags.createdAt},
    'updated_at', ${tags.updatedAt}
)`;

export const getSkills = async (): Promise<SkillWithTag[]> => {
  const result = await db
    .select({
      id: skills.id,
      tag: populateTag.as("tag"),
      min: skills.min,
      max: skills.max,
      createdAt: skills.createdAt,
      updatedAt: skills.updatedAt,
    })
    .from(skills)
    .innerJoin(tags, eq(tags.id, skills.tagId))
    .groupBy(skills.id, tags.id)
    .orderBy(desc(skills.min));

  return result;
};
