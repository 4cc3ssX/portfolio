"use client";

import { SkillWithTag } from "@/shared/db/schema/skills";
import { Circle } from "lucide-react";

export interface SkillCardProps {
  skill: SkillWithTag;
}

export const SkillCard = ({ skill }: SkillCardProps) => {
  return (
    <div className="relative px-px">
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-600/70 to-background rounded-xl -z-10" />
      <div className="w-full h-full flex flex-col justify-between gap-y-4 p-4 bg-gradient-to-br from-secondary to-background backdrop-blur-lg md:backdrop-blur-sm rounded-xl">
        <p className="text-sm text-muted-foreground">{skill.tag.name}</p>
        <div className="flex flex-row items-center gap-x-1">
          {Array(skill.max)
            .fill(0)
            .map((_, index) => (
              <Circle
                key={`skill-rating-${index}`}
                className={skill.min > index ? "fill-primary" : "fill-muted"}
                size={8}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
