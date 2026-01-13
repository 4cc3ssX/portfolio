import dynamic from "next/dynamic";
import { getMe } from "@/features/users/actions/users";
import { getExperiences } from "@/features/experience/actions/experiences";
import { getSkills } from "@/features/skills/actions/skills";
import { getProjects } from "@/features/projects/actions/projects";

import { Hero } from "@/features/landing/components/hero";
import { Footer } from "@/components/layout";
import { SectionDivider } from "@/components/ui/section";

const AboutSection = dynamic(() =>
  import("@/features/about/components/about-section").then(
    (mod) => mod.AboutSection
  )
);
const ExperienceSection = dynamic(() =>
  import("@/features/experience/components/experience-section").then(
    (mod) => mod.ExperienceSection
  )
);
const SkillsSection = dynamic(() =>
  import("@/features/skills/components/skills-section").then(
    (mod) => mod.SkillsSection
  )
);
const ProjectsSection = dynamic(() =>
  import("@/features/projects/components/projects-section").then(
    (mod) => mod.ProjectsSection
  )
);
const ContactSection = dynamic(() =>
  import("@/features/contact/components/contact-section").then(
    (mod) => mod.ContactSection
  )
);

export const revalidate = 600;

export default async function Home() {
  const [me, experiences, skills, projects] = await Promise.all([
    getMe(),
    getExperiences(),
    getSkills(),
    getProjects(),
  ]);

  return (
    <main className="relative">
      <Hero user={me} />
      <SectionDivider />
      <AboutSection user={me} />
      <SectionDivider />
      <ExperienceSection experiences={experiences} />
      <SectionDivider />
      <SkillsSection skills={skills} />
      <SectionDivider />
      <ProjectsSection projects={projects} />
      <SectionDivider />
      <ContactSection user={me} />
      <Footer user={me} />
    </main>
  );
}
