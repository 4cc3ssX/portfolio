"use client";

import { Suspense, lazy } from "react";
import { SectionDivider } from "@/components/ui/section";
import type { UserWithLinksAndAvatar } from "@/features/users/types/users";
import { ExperienceWithCompany } from "@/features/experience/types/experiences";
import { SkillWithTag } from "@/features/skills/types/skills";
import { ProjectWithLinkAndTagsWithGithubData } from "@/features/projects/actions/projects";

// Use lazy loading with Suspense for better loading experience
const ExperienceSection = lazy(() =>
  import("@/features/experience/components/experience-section").then(
    (mod) => ({ default: mod.ExperienceSection })
  )
);

const SkillsSection = lazy(() =>
  import("@/features/skills/components/skills-section").then(
    (mod) => ({ default: mod.SkillsSection })
  )
);

const ProjectsSection = lazy(() =>
  import("@/features/projects/components/projects-section").then(
    (mod) => ({ default: mod.ProjectsSection })
  )
);

const ContactSection = lazy(() =>
  import("@/features/contact/components/contact-section").then(
    (mod) => ({ default: mod.ContactSection })
  )
);

// Skeleton that matches section dimensions to prevent CLS
function SectionSkeleton() {
  return (
    <div className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="mb-12 md:mb-16">
          <div className="mb-3 h-3 w-16 animate-pulse rounded bg-muted/20" />
          <div className="h-8 w-48 animate-pulse rounded bg-muted/20" />
        </div>
        <div className="h-64 animate-pulse rounded bg-muted/10" />
      </div>
    </div>
  );
}

interface SectionsWrapperProps {
  user: UserWithLinksAndAvatar;
  experiences: ExperienceWithCompany[];
  skills: SkillWithTag[];
  projects: ProjectWithLinkAndTagsWithGithubData[];
}

export function SectionsWrapper({
  user,
  experiences,
  skills,
  projects,
}: SectionsWrapperProps) {
  return (
    <>
      <Suspense fallback={<SectionSkeleton />}>
        <ExperienceSection experiences={experiences} />
      </Suspense>
      <SectionDivider />
      <Suspense fallback={<SectionSkeleton />}>
        <SkillsSection skills={skills} />
      </Suspense>
      <SectionDivider />
      <Suspense fallback={<SectionSkeleton />}>
        <ProjectsSection projects={projects} />
      </Suspense>
      <SectionDivider />
      <Suspense fallback={<SectionSkeleton />}>
        <ContactSection user={user} />
      </Suspense>
    </>
  );
}
