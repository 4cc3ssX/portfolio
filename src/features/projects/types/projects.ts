import { projects } from "../schemas/projects";

export type ProjectSelect = typeof projects.$inferSelect;
export type ProjectWithLinkAndTags = Omit<ProjectSelect, "linkId"> & {
  link: string;
  tags: string[];
};
