import { skills } from "../schemas/skills";
import { TagSelect } from "@/features/shared/types/tags";

export type SkillSelect = typeof skills.$inferSelect;
export type SkillWithTag = Omit<SkillSelect, "tagId"> & {
  tag: TagSelect;
};
