import { getMe } from "@/actions/users";
import Main from "./main";
import { getProjects } from "@/actions/projects";
import { getExperiences } from "@/actions/experiences";

export default async function Home() {
  const me = await getMe();
  const projects = await getProjects();
  const experiences = await getExperiences();

  return <Main me={me} projects={projects} experiences={experiences} />;
}

export const revalidate = 60;
