import { db } from "@/shared/db";
import { links, projects, projectTags, tags } from "@/shared/db/schema";
import { desc, eq, sql } from "drizzle-orm";

export const getProjects = async () => {
  const result = await db
    .select({
      id: projects.id,
      name: projects.name,
      description: projects.description,
      link: links.uri,
      tags: sql<string[]>`array_agg(${tags.name})`.as("tags"),
      createdAt: projects.createdAt,
      updatedAt: projects.updatedAt,
    })
    .from(projects)
    .leftJoin(projectTags, eq(projectTags.projectId, projects.id))
    .leftJoin(tags, eq(tags.id, projectTags.tagId))
    .leftJoin(links, eq(links.id, projects.linkId))
    .groupBy(projects.id, links.uri)
    .orderBy(desc(projects.createdAt));

  return result;
};
