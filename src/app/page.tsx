import { getMe } from "@/actions/users";
import Main from "./main";
import { getProjects } from "@/actions/projects";
import { getExperiences } from "@/actions/experiences";
import { getSkills } from "@/actions/skills";

export default async function Home() {
  const me = await getMe();
  const projects = await getProjects();
  const experiences = await getExperiences();
  const skills = await getSkills();

  return (
    <Main me={me} projects={projects} experiences={experiences} skills={skills} />
  );
}

export const revalidate = 60;
