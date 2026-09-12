import { readFile } from "node:fs/promises";
import { join } from "node:path";

const DIR = join(process.cwd(), "data", "legacy");

export interface LegacyImage {
  id: string; name: string; uri: string;
  thumbnail_uri: string | null; blur_hash: string; metadata: unknown;
}
export interface LegacyLink {
  id: string; name: string; type: "social" | "project" | "external" | null;
  uri: string; user_id: string | null;
}
export interface LegacyTag { id: string; name: string; term: string }
export interface LegacySkill { id: string; tag_id: string; min: number; max: number }
export interface LegacyCompany {
  id: string; name: string; image_id: string | null; link_id: string | null;
}
export interface LegacyExperience {
  id: string; company_id: string; position: string; description: string[];
  started_at: string; ended_at: string | null; is_active: boolean;
}
export interface LegacyProject {
  id: string; name: string; description: string; link_id: string | null;
  is_active: boolean; started_at: string; ended_at: string | null;
}
export interface LegacyProjectTag { project_id: string; tag_id: string }
export interface LegacyBlog {
  id: string; title: string; slug: string; description: string; content: string;
  cover_id: string | null; published: boolean; author_id: string | null;
  published_at: string | null; created_at: string; reading_time: number;
}
export interface LegacyUser {
  id: string; name: string; nickname: string; email: string; title: string | null;
  avatar_id: string | null; slogan: string; message: string;
}

const load = async <T>(table: string): Promise<T[]> =>
  JSON.parse(await readFile(join(DIR, `${table}.json`), "utf8")) as T[];

export const loadLegacy = async () => ({
  images: await load<LegacyImage>("images"),
  links: await load<LegacyLink>("links"),
  tags: await load<LegacyTag>("tags"),
  skills: await load<LegacySkill>("skills"),
  companies: await load<LegacyCompany>("companies"),
  experiences: await load<LegacyExperience>("experiences"),
  projects: await load<LegacyProject>("projects"),
  projectTags: await load<LegacyProjectTag>("project_tags"),
  blogs: await load<LegacyBlog>("blogs"),
  users: await load<LegacyUser>("users"),
});

export type Legacy = Awaited<ReturnType<typeof loadLegacy>>;
