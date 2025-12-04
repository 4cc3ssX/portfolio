import { getMe } from "@/features/users/actions/users";
import Main from "@/features/shared/components/main";
import { getExperiences } from "@/features/experience/actions/experiences";
import { getSkills } from "@/features/skills/actions/skills";

export const revalidate = 60;

export default async function Home() {
  const me = await getMe();
  const experiences = await getExperiences();
  const skills = await getSkills();

  return (
    <Main
      me={me}
      experiences={experiences}
      skills={skills}
    />
  );
}
