import { ContactLinks } from "@/components/interface";
import { ExperienceWithCompany } from "@/features/experience/schemas/experiences";
import { SkillWithTag } from "@/features/skills/schemas/skills";
import { UserWithLinks } from "@/features/users/schemas/users";
import { IntroductionToast } from "./introduction-toast";
import { Background } from "./background";
import { Sections } from "./sections";

interface Props {
  me: UserWithLinks;
  experiences: ExperienceWithCompany[];
  skills: SkillWithTag[];
}

export default function Main({ me, experiences, skills }: Props) {
  return (
    <main className="font-sans">
      <IntroductionToast me={me} />
      <ContactLinks data={me} />
      <Background />
      <Sections me={me} experiences={experiences} skills={skills} />
    </main>
  );
}
