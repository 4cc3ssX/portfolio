"use client";

import React from "react";
import { ExperienceWithCompany } from "@/shared/db/schema";
import { motion } from "framer-motion";
import { ExperienceCard } from "./_components/experience-card";
import { openURL } from "@/utils";
import { AnalyticsEvent, sendEvent } from "@/shared/firebase";

interface Props {
  data: ExperienceWithCompany[];
}

export default function Experience({ data }: Props) {
  const handleExperienceClick = (experience: ExperienceWithCompany) => {
    if (experience.company.uri) {
      openURL(experience.company.uri, true);
    }
    sendEvent(AnalyticsEvent.EXPERIENCE_CLICK, {
      name: experience.company.name,
    });
  };

  return (
    <div id="experience" className="flex pt-14 min-h-dvh">
      <div className="flex-1 flex flex-col justify-center items-center">
        <motion.div
          initial={{ y: 20, opacity: 0, filter: "blur(5px)" }}
          whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
          className="flex-1 md:flex-none flex flex-col gap-y-3 w-full sm:w-3/4 md:w-4/6 lg:w-7/12 xl:w-1/2 h-auto md:min-h-[75%] px-5 md:px-6"
        >
          <div className="flex flex-col gap-y-1">
            <p className="font-medium text-2xl sm:text-3xl">Experience</p>
          </div>
          <div className="mt-2 flex flex-col gap-2">
            {data.map((experience, index, items) => (
              <ExperienceCard
                key={experience.id}
                index={index}
                total={items.length}
                experience={experience}
                onClick={handleExperienceClick}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
