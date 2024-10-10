import { db } from "@/shared/db";
import {
  links,
  projects,
  projectTags,
  ProjectWithLinkAndTags,
  tags,
} from "@/shared/db/schema";
import { desc, eq, sql } from "drizzle-orm";

export const getProjects = async (): Promise<ProjectWithLinkAndTags[]> => {
  const result = await db
    .select({
      id: projects.id,
      name: projects.name,
      description: projects.description,
      link: links.uri,
      tags: sql<string[]>`ARRAY_AGG(${tags.name})`.as("tags"),
      isActive: projects.isActive,
      startedAt: projects.startedAt,
      endedAt: projects.endedAt,
      createdAt: projects.createdAt,
      updatedAt: projects.updatedAt,
    })
    .from(projects)
    .innerJoin(links, eq(links.id, projects.linkId))
    .leftJoin(projectTags, eq(projectTags.projectId, projects.id))
    .leftJoin(tags, eq(tags.id, projectTags.tagId))
    .groupBy(projects.id, links.id)
    .orderBy(desc(projects.startedAt));

  return result;
};
