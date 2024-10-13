"use client";

import { Icon, IconName } from "@/components/svgs";
import { SkillWithTag } from "@/shared/db/schema/skills";
import { motion } from "framer-motion";
import { Squircle } from "lucide-react";

export interface SkillCardProps {
  index: number;
  total: number;
  skill: SkillWithTag;
}

export const SkillCard = ({ skill }: SkillCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0.7 }}
      whileHover={{ opacity: 1, scale: 1.05 }}
      className="relative h-24 px-px"
    >
      <div className="absolute -inset-0 bg-gradient-to-br from-neutral-600/70 to-background rounded-xl -z-10" />
      <Icon
        name={skill.tag.term as IconName}
        className="absolute bottom-2 right-2 size-6 z-10 fill-secondary/80"
      />
      <div className="w-full h-full flex flex-col justify-between gap-y-4 p-4 bg-gradient-to-br from-secondary to-background backdrop-blur-lg md:backdrop-blur-sm rounded-xl">
        <p className="text-sm text-primary">{skill.tag.name}</p>
        <div className="flex flex-row items-center gap-x-1">
          {Array(skill.max)
            .fill(0)
            .map((_, index) => (
              <Squircle
                key={`skill-rating-${index}`}
                className={skill.min > index ? "fill-primary" : "fill-muted"}
                size={8}
              />
            ))}
        </div>
      </div>
    </motion.div>
  );
};
