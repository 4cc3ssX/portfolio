import MotionWrapper from "@/features/shared/components/motion-wrapper";
import { SkillCard } from "./skill-card";
import { SkillWithTag } from "../types/skills";

interface Props {
  skills: SkillWithTag[];
}

export function SkillGrid({ skills }: Props) {
  return (
    <MotionWrapper className="flex-1 md:flex-none flex flex-col gap-y-3 w-full sm:w-3/4 md:w-4/6 lg:w-7/12 xl:w-1/2 px-5 md:px-6">
      <h2 className="font-bold text-2xl sm:text-3xl">Skills</h2>

      <div className="mt-2 flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {skills.map((skill, index, items) => (
          <SkillCard
            key={`skill-${skill.tag.name}-${skill.id}`}
            index={index}
            total={items.length}
            skill={skill}
          />
        ))}
      </div>
    </MotionWrapper>
  );
}
