import { UserWithLinksAndAvatar } from "@/features/users/types/users";
import { AboutContent } from "./_components/about-content";
import { NavigateButton } from "./_components/navigate-button";

interface Props {
  data: UserWithLinksAndAvatar;
}

export default function About({ data }: Props) {
  return (
    <div id="about" className="relative flex pt-14 min-h-svh">
      <div className="flex-1 flex flex-col justify-start sm:justify-center items-center">
        <AboutContent />
      </div>
      <NavigateButton />
    </div>
  );
}
