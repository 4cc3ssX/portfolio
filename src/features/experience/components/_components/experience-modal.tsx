"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExperienceWithCompany } from "@/features/experience/schemas/experiences";

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
          <DialogTitle>{experience?.position}</DialogTitle>
          <DialogDescription className="hidden md:block">
            at {experience?.company.name}
          </DialogDescription>
        </DialogHeader>
        <ul role="list" className="space-y-3">
          {experience?.description.map((description, index) => (
            <li
              key={`${experience.company.name}-description-${index}`}
              className="flex items-start gap-3 text-foreground text-left"
            >
              <span
                className="mt-2 min-w-3 h-1 rounded-sm bg-blue-500"
                aria-hidden="true"
              />
              <span>{description}</span>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
};
