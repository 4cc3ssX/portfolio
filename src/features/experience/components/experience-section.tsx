"use client";

import { ExperienceWithCompany } from "@/features/experience/types/experiences";
import { ExperienceContent } from "./experience-content";

interface ExperienceSectionProps {
  experiences: ExperienceWithCompany[];
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return <ExperienceContent experiences={experiences} />;
}
