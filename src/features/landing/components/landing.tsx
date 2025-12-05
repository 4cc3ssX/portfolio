import { UserWithLinksAndAvatar } from "@/features/users/types/users";
import MotionWrapper from "@/features/shared/components/motion-wrapper";
import { LandingContent } from "./landing-content";

interface Props {
  data: UserWithLinksAndAvatar;
}

export function Landing({ data }: Props) {
  return (
    <div id="landing" className="relative flex pt-14 min-h-svh">
      <div className="flex flex-1 flex-col justify-center items-center">
        <MotionWrapper className="flex flex-col gap-y-4 w-full md:w-4/6 lg:w-7/12 px-5 sm:px-6">
          <LandingContent data={data} />
        </MotionWrapper>
      </div>
    </div>
  );
}
