import { ProjectWithLinkAndTagsWithGithubData } from "@/actions/projects";
import { ProjectList } from "./_components/project-list";

interface Props {
  data: ProjectWithLinkAndTagsWithGithubData[];
}

export default function Projects({ data }: Props) {
  return (
    <div id="projects" className="flex pt-14 min-h-dvh">
      <div className="flex-1 flex flex-col justify-start md:justify-center items-center">
        <ProjectList projects={data} />
      </div>
    </div>
  );
}
