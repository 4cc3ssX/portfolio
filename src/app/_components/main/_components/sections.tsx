import dynamic from "next/dynamic";
import Landing from "../../landing";
import { ExperienceWithCompany, UserWithLinks } from "@/shared/db/schema";
import { SkillWithTag } from "@/shared/db/schema/skills";
import { ProjectWithLinkAndTagsWithGithubData } from "@/actions/projects";

const About = dynamic(() => import("../../about"));
const Experience = dynamic(() => import("../../experience"));
const Projects = dynamic(() => import("../../projects"));
const Skills = dynamic(() => import("../../skills"));
const Contact = dynamic(() => import("../../contact"));

interface Props {
  me: UserWithLinks;
  experiences: ExperienceWithCompany[];
  projects: ProjectWithLinkAndTagsWithGithubData[];
  skills: SkillWithTag[];
}

export function Sections({ me, experiences, projects, skills }: Props) {
  return (
    <div className="w-screen h-dvh overflow-x-hidden overflow-y-scroll scroll-smooth">
      <Landing data={me} />
      <About data={me} />
      <Experience data={experiences} />
      <Projects data={projects} />
      <Skills data={skills} />
      <Contact user={me} />
    </div>
  );
}
