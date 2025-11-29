import { ExperienceWithCompany } from "@/shared/db/schema";
import { ExperienceList } from "./_components/experience-list";

interface Props {
  data: ExperienceWithCompany[];
}

export default function Experience({ data }: Props) {
  return (
    <div id="experience" className="flex pt-14 min-h-dvh">
      <div className="flex-1 flex flex-col justify-center items-center">
        <ExperienceList experiences={data} />
      </div>
    </div>
  );
}
