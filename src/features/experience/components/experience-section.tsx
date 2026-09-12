"use client";

import { ExperienceContent } from "./experience-content";
import type { ExperienceView } from "@/types/content";

interface ExperienceSectionProps {
  experiences: ExperienceView[];
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return <ExperienceContent experiences={experiences} />;
}
