"use client";

import dynamic from "next/dynamic";
import { SectionDivider } from "@/components/ui/section";
import type { UserWithLinksAndAvatar } from "@/features/users/types/users";
import { ExperienceWithCompany } from "@/features/experience/types/experiences";
import { SkillWithTag } from "@/features/skills/types/skills";
import { ProjectWithLinkAndTagsWithGithubData } from "@/features/projects/actions/projects";

const ExperienceSection = dynamic(
  () =>
    import("@/features/experience/components/experience-section").then(
      (mod) => mod.ExperienceSection
    ),
  { ssr: false }
);

const SkillsSection = dynamic(
  () =>
    import("@/features/skills/components/skills-section").then(
      (mod) => mod.SkillsSection
    ),
  { ssr: false }
);

const ProjectsSection = dynamic(
  () =>
    import("@/features/projects/components/projects-section").then(
      (mod) => mod.ProjectsSection
    ),
  { ssr: false }
);

const ContactSection = dynamic(
  () =>
    import("@/features/contact/components/contact-section").then(
      (mod) => mod.ContactSection
    ),
  { ssr: false }
);

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
      <ExperienceSection experiences={experiences} />
      <SectionDivider />
      <SkillsSection skills={skills} />
      <SectionDivider />
      <ProjectsSection projects={projects} />
      <SectionDivider />
      <ContactSection user={user} />
    </>
  );
}
