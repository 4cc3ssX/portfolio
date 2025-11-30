import { ContactLinks } from "@/components/interface";
import { UserWithLinksAndAvatar } from "@/features/users/types/users";
import { IntroductionToast } from "./introduction-toast";
import { Background } from "./background";
import { Sections } from "./sections";
import { ExperienceWithCompany } from "@/features/experience/types/experiences";
import { SkillWithTag } from "@/features/skills/types/skills";

interface Props {
  me: UserWithLinksAndAvatar;
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
