import { SkillWithTag } from "@/shared/db/schema/skills";
import { SkillGrid } from "./_components/skill-grid";

interface Props {
  data: SkillWithTag[];
}

export default function Skills({ data }: Props) {
  return (
    <div id="skills" className="flex pt-14 min-h-dvh">
      <div className="flex-1 flex flex-col justify-center items-center">
        <SkillGrid skills={data} />
      </div>
    </div>
  );
}
