import dynamic from "next/dynamic";
import { UserWithLinksAndAvatar } from "@/features/users/types/users";
import { Landing } from "@/features/landing/components";
import { About } from "@/features/about/components";
import { ExperienceWithCompany } from "@/features/experience/types/experiences";
import { SkillWithTag } from "@/features/skills/types/skills";

const Experience = dynamic(() =>
  import("@/features/experience/components").then((mod) => mod.Experience)
);
const Skills = dynamic(() =>
  import("@/features/skills/components").then((mod) => mod.Skills)
);
const Contact = dynamic(() =>
  import("@/features/contact/components").then((mod) => mod.Contact)
);

interface Props {
  me: UserWithLinksAndAvatar;
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
