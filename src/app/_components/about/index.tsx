import { UserWithLinks } from "@/shared/db/schema";
import { AboutContent } from "./_components/about-content";
import { NavigateButton } from "./_components/navigate-button";

interface Props {
  data: UserWithLinks;
}

export default function About({ data }: Props) {
  return (
    <div id="about" className="relative flex pt-14 min-h-dvh">
      <div className="flex-1 flex flex-col justify-start sm:justify-center items-center">
        <AboutContent />
      </div>
      <NavigateButton />
    </div>
  );
}
