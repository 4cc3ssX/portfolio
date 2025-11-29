"use client";

import { useState } from "react";
import { ExperienceWithCompany } from "@/shared/db/schema";
import { ExperienceCard } from "./experience-card";
import { ExperienceModal } from "./experience-modal";
import { AnalyticsEvent, sendEvent } from "@/shared/firebase";
import MotionWrapper from "@/app/_components/motion-wrapper";

interface Props {
  experiences: ExperienceWithCompany[];
}

export function ExperienceList({ experiences }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [experience, setExperience] = useState<ExperienceWithCompany>();

  const handleOnClick = (exp: ExperienceWithCompany) => {
    sendEvent(AnalyticsEvent.EXPERIENCE_CLICK, {
      name: exp.company.name,
    });

    setExperience(exp);
    setIsOpen(true);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);

    if (!open) {
      setExperience(undefined);
    }
  };

  return (
    <>
      <MotionWrapper className="flex-1 md:flex-none flex flex-col gap-y-3 w-full sm:w-3/4 md:w-4/6 lg:w-7/12 xl:w-1/2 h-auto md:min-h-[75%] px-5 md:px-6">
        <div className="flex flex-col gap-y-1">
          <h2 className="font-medium text-2xl sm:text-3xl">Experience</h2>
        </div>
        <div className="mt-2 flex flex-col gap-2">
          {experiences.map((exp, index, items) => (
            <ExperienceCard
              key={exp.id}
              index={index}
              total={items.length}
              active={exp.isActive}
              company={exp.company}
              position={exp.position}
              start={exp.startedAt}
              end={exp.endedAt}
              className="px-4 md:px-4 py-2 md:py-2.5"
              onClick={() => handleOnClick(exp)}
            />
          ))}
        </div>
      </MotionWrapper>
      <ExperienceModal
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        experience={experience}
      />
    </>
  );
}
