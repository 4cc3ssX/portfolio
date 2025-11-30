import dynamic from "next/dynamic";
import { ExperienceWithCompany } from "@/features/experience/schemas/experiences";
import { SkillWithTag } from "@/features/skills/schemas/skills";
import { UserWithLinks } from "@/features/users/schemas/users";
import Landing from "@/features/landing/components";
import About from "@/features/about/components";

const Experience = dynamic(() => import("@/features/experience/components"));
const Skills = dynamic(() => import("@/features/skills/components"));
const Contact = dynamic(() => import("@/features/contact/components"));

interface Props {
  me: UserWithLinks;
  experiences: ExperienceWithCompany[];
  skills: SkillWithTag[];
}

export function Sections({ me, experiences, skills }: Props) {
  return (
    <div className="w-screen h-svh overflow-x-hidden overflow-y-scroll scroll-smooth">
      <Landing data={me} />
      <About data={me} />
      <Experience data={experiences} />
      <Skills data={skills} />
      <Contact user={me} />
    </div>
  );
}
