import { UserWithLinksAndAvatar } from "@/features/users/types/users";
import { AboutContent } from "./about-content";
import { NavigateButton } from "./navigate-button";

interface Props {
  data: UserWithLinksAndAvatar;
}

export function About({ data }: Props) {
  return (
    <div id="about" className="relative flex pt-14 min-h-svh">
      <div className="flex-1 flex flex-col justify-start sm:justify-center items-center">
        <AboutContent data={data} />
      </div>
      <NavigateButton />
    </div>
  );
}
