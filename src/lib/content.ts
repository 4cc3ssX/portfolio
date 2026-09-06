import "server-only";

import { cache } from "react";
import type {
  ExperienceView,
  PostView,
  ProjectView,
  SeriesLinkView,
  SkillView,
  UserView,
} from "@/types/content";
import {
  getExperiences as findExperiences,
  getFeaturedTechnologies,
  getProjects as findProjects,
} from "./payload/portfolio";
import { getPostBySlug as findPostBySlug, getPosts as findPosts, getSeriesPosts } from "./payload/posts";
import { getNavigation, getSiteSettings } from "./payload/settings";
import {
  toExperienceView,
  toPostView,
  toProjectView,
  toSeriesLinkView,
  toSkillView,
  toUserView,
} from "./payload/view-models";

/**
 * The read API every page uses. Replaces src/features/*\/actions/*, which
 * issued hand-written JSONB_BUILD_OBJECT joins straight against Postgres.
 *
 * Everything here is server-only and wrapped in React `cache()` so a page that
 * needs the same global twice pays for one query.
 */

export const getMe = cache(async (): Promise<UserView> =>
  toUserView(await getSiteSettings())
);

export const getExperiences = cache(async (): Promise<ExperienceView[]> =>
  (await findExperiences()).map(toExperienceView)
);

export const getSkills = cache(async (): Promise<SkillView[]> =>
  (await getFeaturedTechnologies()).map(toSkillView)
);

export const getProjects = cache(async (): Promise<ProjectView[]> =>
  (await findProjects()).map(toProjectView)
);

export const getBlogs = cache(async (): Promise<PostView[]> => {
  const [posts, settings] = await Promise.all([findPosts(), getSiteSettings()]);
  return posts.map((post) => toPostView(post, settings));
});

export const getBlogBySlug = cache(async (slug: string): Promise<PostView | null> => {
  const [post, settings] = await Promise.all([findPostBySlug(slug), getSiteSettings()]);
  return post ? toPostView(post, settings) : null;
});

/** Sibling posts for the series navigation block on a post page. */
export const getSeriesSiblings = cache(async (seriesId: string): Promise<SeriesLinkView[]> =>
  (await getSeriesPosts(seriesId)).map(toSeriesLinkView)
);

export { getNavigation, getSiteSettings };
