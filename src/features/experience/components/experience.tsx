import { ExperienceWithCompany } from "../types/experiences";
import { ExperienceList } from "./experience-list";

interface Props {
  data: ExperienceWithCompany[];
}

export function Experience({ data }: Props) {
  return (
    <div id="experience" className="flex pt-14 min-h-svh">
      <div className="flex-1 flex flex-col justify-center items-center">
        <ExperienceList experiences={data} />
      </div>
    </div>
  );
}
