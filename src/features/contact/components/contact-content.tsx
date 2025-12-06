import MotionWrapper from "@/features/shared/components/motion-wrapper";
import { Button } from "@/components/ui/button";
import { UserWithLinksAndAvatar } from "@/features/users/types/users";
import { LinkType } from "@/features/users/schemas/links";
import Link from "next/link";
import { Icon, IconName } from "@/components/svgs";
import { cn } from "@/lib/utils";

interface Props {
  user: UserWithLinksAndAvatar;
}

export function ContactContent({ user }: Props) {
  const socials = user.links.filter((link) => link.type === LinkType.SOCIAL);

  return (
    <MotionWrapper className="flex-1 flex flex-col justify-center gap-y-3 w-full sm:w-3/4 lg:w-7/12 px-5 md:px-6">
      <div className="flex flex-col items-center gap-1.5">
        <div>
          <p className="font-semibold text-center text-3xl sm:text-3xl">
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
      <div className="h-44 flex flex-col justify-center items-center gap-6">
        <Button
          variant="outline"
          size="lg"
          className="rounded-xl"
          title={user.email}
          asChild
        >
          <a
            href={`mailto:${user.email}?subject=${encodeURIComponent(
              "Collaboration Opportunity: Let's Create Something Amazing!"
            )}`}
          >
            Say Hi!
          </a>
        </Button>
        <div className="flex items-center gap-4 mt-2">
          {socials.map((link) => {
            const shouldUseStrokeColor = ["x"].includes(
              link.name.toLowerCase()
            );

            return (
              <Link
                key={link.id}
                href={link.uri}
                target="_blank"
                rel="noopener noreferrer"
                title={link.name}
                className="text-foreground hover:text-blue-500 transition-colors"
              >
                <Icon
                  name={link.name.toLowerCase() as IconName}
                  className={cn(
                    "size-5",
                    shouldUseStrokeColor
                      ? "stroke-foreground"
                      : "fill-foreground"
                  )}
                />
                <span className="sr-only">Open {link.name} in new tab</span>
              </Link>
            );
          })}
        </div>
      </div>
    </MotionWrapper>
  );
}
