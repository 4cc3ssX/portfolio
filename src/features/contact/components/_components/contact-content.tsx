import MotionWrapper from "@/features/shared/components/motion-wrapper";
import { Button } from "@/components/ui/button";

interface Props {
  email: string;
}

export function ContactContent({ email }: Props) {
  return (
    <MotionWrapper className="flex-1 flex flex-col justify-center gap-y-3 w-full sm:w-3/4 lg:w-7/12 px-5 md:px-6">
      <div className="flex flex-col items-center gap-1.5">
        <div>
          <p className="font-medium text-center text-2xl sm:text-3xl">
            What&apos;s Next?
          </p>
        </div>
        <div className="w-10 h-0.5 rounded-full bg-blue-500 shadow-lg shadow-blue-500" />
      </div>
      <div className="flex-none flex flex-col items-center">
        <p className="text-base leading-8 tracking-wide hyphens-auto text-center">
          Feel free to reach out with any questions, project ideas, or just to
          say hello. I value connections and will respond as promptly as I can.
        </p>
      </div>
      <div className="h-44 flex flex-col justify-center items-center">
        <Button
          variant="outline"
          size="lg"
          className="rounded-xl"
          title={email}
          asChild
        >
          <a
            href={`mailto:${email}?subject=${encodeURIComponent(
              "Collaboration Opportunity: Let's Create Something Amazing!"
            )}`}
          >
            Say Hi!
          </a>
        </Button>
      </div>
    </MotionWrapper>
  );
}
