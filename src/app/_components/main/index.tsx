import { ContactLinks } from "@/components/interface";
import { ExperienceWithCompany, UserWithLinks } from "@/shared/db/schema";
import { SkillWithTag } from "@/shared/db/schema/skills";
import { ProjectWithLinkAndTagsWithGithubData } from "@/actions/projects";
import { IntroductionToast, BackgroundParticles, Sections } from "./_components";

interface Props {
  me: UserWithLinks;
  experiences: ExperienceWithCompany[];
  projects: ProjectWithLinkAndTagsWithGithubData[];
  skills: SkillWithTag[];
}

export default function Main({ me, experiences, projects, skills }: Props) {
  return (
    <main className="font-sans">
      <IntroductionToast me={me} />
      <ContactLinks data={me} />
      <BackgroundParticles />
      <Sections me={me} experiences={experiences} projects={projects} skills={skills} />
    </main>
  );
}
