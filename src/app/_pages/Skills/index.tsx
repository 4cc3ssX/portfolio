"use client";

import { motion } from "framer-motion";

import { SkillWithTag } from "@/shared/db/schema/skills";
import { SkillCard } from "./_components/skill-card";

interface Props {
  data: SkillWithTag[];
}

export default function Skills({ data }: Props) {
  return (
    <div id="skills" className="flex pt-14 min-h-dvh">
      <div className="flex-1 flex flex-col justify-center items-center">
        <motion.div
          initial={{ y: 20, opacity: 0, filter: "blur(5px)" }}
          whileInView={{ y: 0, opacity: 1, filter: "blur(0)" }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
          className="flex-1 md:flex-none flex flex-col gap-y-3 w-full sm:w-3/4 md:w-4/6 lg:w-7/12 xl:w-1/2 px-6"
        >
          <p className="font-medium text-2xl sm:text-3xl">Skills</p>

          <div className="mt-2 flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {data.map((skill, index, items) => (
              <SkillCard
                key={`skill-${skill.tag.name}-${skill.id}`}
                index={index}
                total={items.length}
                skill={skill}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
