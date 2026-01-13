import { getMe } from "@/features/users/actions/users";
import { getExperiences } from "@/features/experience/actions/experiences";
import { getSkills } from "@/features/skills/actions/skills";
import { getProjects } from "@/features/projects/actions/projects";

import { Hero } from "@/features/landing/components/hero";
import { AboutSection } from "@/features/about/components/about-section";
import { ExperienceSection } from "@/features/experience/components/experience-section";
import { SkillsSection } from "@/features/skills/components/skills-section";
import { ProjectsSection } from "@/features/projects/components/projects-section";
import { ContactSection } from "@/features/contact/components/contact-section";
import { Footer } from "@/components/layout";
import { SectionDivider } from "@/components/ui/section";

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
