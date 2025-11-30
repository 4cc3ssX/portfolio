import { UserWithLinks } from "@/shared/db/schema";
import MotionWrapper from "@/app/_components/motion-wrapper";
import { LandingContent } from "./_components/landing-content";

interface Props {
  data: UserWithLinks;
}

export default function Landing({ data }: Props) {
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
