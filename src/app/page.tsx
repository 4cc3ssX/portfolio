import { getMe } from "@/features/users/actions/users";
import { getExperiences } from "@/features/experience/actions/experiences";
import { getSkills } from "@/features/skills/actions/skills";
import { getProjects } from "@/features/projects/actions/projects";

import { Hero } from "@/features/landing/components/hero";
import { SectionDivider } from "@/components/ui/section";
import { AboutSection } from "@/features/about/components";
import { Footer } from "@/components/layout";
import dynamic from "next/dynamic";

const SectionsWrapper = dynamic(() =>
  import("@/features/landing/components/sections-wrapper").then(
    (mod) => mod.SectionsWrapper
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
      <SectionsWrapper
        user={me}
        experiences={experiences}
        skills={skills}
        projects={projects}
      />
      <Footer user={me} />
    </main>
  );
}
