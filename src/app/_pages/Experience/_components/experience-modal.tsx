"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExperienceWithCompany } from "@/shared/db/schema";
import { ExperienceCard } from "./experience-card";

export interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  experience: ExperienceWithCompany | undefined;
}

export const ExperienceModal = ({
  isOpen,
  onOpenChange,
  experience,
}: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Experience</DialogTitle>
          <DialogDescription className="hidden md:block">
            {experience?.position} at {experience?.company.name}
          </DialogDescription>
        </DialogHeader>
        {experience ? (
          <ExperienceCard
            active={experience.isActive}
            company={experience.company}
            position={experience.position}
            start={experience.startedAt}
            end={experience.endedAt}
            className=""
          />
        ) : null}
        <ul role="list" className="list-inside list-disc marker:text-blue-500 space-y-1">
          {experience?.description.map((description, index) => (
            <li key={`${experience.company.name}-description-${index}`} className="text-foreground text-left">
              {description}
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
};
