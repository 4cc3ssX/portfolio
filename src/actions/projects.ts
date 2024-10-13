import { extractRepoAndOwner } from "@/lib/github";
import { db } from "@/shared/db";
import {
  links,
  projects,
  projectTags,
  ProjectWithLinkAndTags,
  tags,
} from "@/shared/db/schema";
import { getRepositoryInfo } from "@/shared/github/actions";
import { desc, eq, sql } from "drizzle-orm";
import { Endpoints } from "@octokit/types";

export interface ProjectWithLinkAndTagsWithGithubData
  extends ProjectWithLinkAndTags {
  github: Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"] | null;
}

async function getGithubData(
  project: ProjectWithLinkAndTags
): Promise<ProjectWithLinkAndTagsWithGithubData> {
  const repoInfo = extractRepoAndOwner(project.link);

  if (!repoInfo?.owner || !repoInfo.repo) {
    return {
      ...project,
      github: null,
    };
  }

  const data = await getRepositoryInfo(repoInfo.owner, repoInfo.repo);

  return {
    ...project,
    github: data,
  };
}

export const getProjects = async (): Promise<
  ProjectWithLinkAndTagsWithGithubData[]
> => {
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

  const data = await Promise.all(
    result.map(async (project) => {
      return getGithubData(project);
    })
  );

  return data;
};
