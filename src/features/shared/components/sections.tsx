import dynamic from "next/dynamic";
import { UserWithLinksAndAvatar } from "@/features/users/types/users";
import { ExperienceWithCompany } from "@/features/experience/types/experiences";
import { SkillWithTag } from "@/features/skills/types/skills";
import MotionWrapper from "./motion-wrapper";
import { LandingContent } from "@/features/landing/components/landing-content";
import { AboutContent } from "@/features/about/components/about-content";
import { NavigateButton } from "@/features/about/components/navigate-button";
import { ContactContent } from "@/features/contact/components/contact-content";

const ExperienceList = dynamic(() =>
  import("@/features/experience/components/experience-list").then(
    (mod) => mod.ExperienceList
  )
);
const SkillGrid = dynamic(() =>
  import("@/features/skills/components/skill-grid").then((mod) => mod.SkillGrid)
);

interface Props {
  me: UserWithLinksAndAvatar;
  experiences: ExperienceWithCompany[];
  skills: SkillWithTag[];
}

export function Sections({ me, experiences, skills }: Props) {
  return (
    <div className="w-screen h-svh overflow-x-hidden overflow-y-scroll scroll-smooth">
      {/* Landing */}
      <div id="landing" className="relative flex pt-14 min-h-svh">
        <div className="flex flex-1 flex-col justify-center items-center">
          <MotionWrapper className="flex flex-col gap-y-4 w-full md:w-4/6 lg:w-7/12 px-5 sm:px-6">
            <LandingContent data={me} />
          </MotionWrapper>
        </div>
      </div>

      {/* About */}
      <div id="about" className="relative flex pt-14 min-h-svh">
        <div className="flex-1 flex flex-col justify-start sm:justify-center items-center">
          <AboutContent data={me} />
        </div>
        <NavigateButton />
      </div>

      {/* Experience */}
      <div id="experience" className="flex pt-14 min-h-svh">
        <div className="flex-1 flex flex-col justify-center items-center">
          <ExperienceList experiences={experiences} />
        </div>
      </div>

      {/* Skills */}
      <div id="skills" className="flex pt-14 min-h-svh">
        <div className="flex-1 flex flex-col justify-center items-center">
          <SkillGrid skills={skills} />
        </div>
      </div>

      {/* Contact */}
      <div id="contact" className="relative flex pt-14 min-h-svh">
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="text-xs text-muted-foreground text-center">
            Designed & Built by{" "}
            <span className="font-semibold">{me.nickname} 🚀</span>
          </p>
        </div>
        <div className="flex flex-1 flex-col justify-center items-center">
          <ContactContent user={me} />
        </div>
      </div>
    </div>
  );
}
