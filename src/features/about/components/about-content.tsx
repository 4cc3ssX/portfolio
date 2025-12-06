import MotionWrapper from "@/features/shared/components/motion-wrapper";
import { UserWithLinksAndAvatar } from "@/features/users/types/users";
import { LinkType } from "@/features/users/schemas/links";
import Link from "next/link";
import { Icon, IconName } from "@/components/svgs";
import { cn } from "@/lib/utils";

interface Props {
  data: UserWithLinksAndAvatar;
}

export function AboutContent({ data }: Props) {
  const socials = data.links.filter((link) => link.type === LinkType.SOCIAL);

  return (
    <MotionWrapper className="flex-1 md:flex-none flex flex-col gap-y-3 w-full sm:w-3/4 md:w-4/6 lg:w-7/12 xl:w-1/2 h-auto md:min-h-[75%] px-5 md:px-6">
      <div className="flex flex-col gap-y-1">
        <h1 className="font-bold text-2xl sm:text-3xl">About</h1>
      </div>
      <div className="flex flex-col gap-5">
        <p className="first-letter:text-7xl first-letter:font-bold first-letter:mr-2 first-letter:float-left leading-relaxed tracking-wide text-md whitespace-pre-line hyphens-auto text-justify">
          I am a dynamic software engineer with{" "}
          <span className="text-blue-500">5 years of experience</span> building
          scalable, event-driven systems. Specializing in{" "}
          <span className="text-blue-500">NestJS</span>,{" "}
          <span className="text-blue-500">Next.js</span>,{" "}
          <span className="text-blue-500">MongoDB</span>, and{" "}
          <span className="text-blue-500">AWS</span>, I excel at breaking down
          complex challenges and delivering clean, reliable, and high-impact
          solutions. My expertise extends to architecting distributed workflows
          with message brokers like <span className="text-blue-500">Kafka</span>{" "}
          and <span className="text-blue-500">BullMQ</span>, and automating
          processes with <span className="text-blue-500">n8n</span> to boost
          system efficiency and resilience.
        </p>
        <p className="text-md whitespace-pre-line hyphens-auto text-justify">
          With proven success leading backend migrations and optimizing
          performance for high-traffic applications, I ship seamless web and
          mobile experiences using <span className="text-blue-500">React</span>,{" "}
          <span className="text-blue-500">React Native</span>, and{" "}
          <span className="text-blue-500">TypeScript</span>. As an active
          open-source contributor, I&apos;m passionate about clean architecture,
          exceptional user experience, and modern full-stack engineering.
          Collaborative, adaptable, and driven by solving real problems with
          precision and innovation, I continue to push the boundaries of
          what&apos;s possible in software engineering.
        </p>
        <div className="flex flex-col gap-3">
          <p className="font-medium text-foreground">Find me on:</p>
          <div className="flex items-center gap-4">
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
                        ? "stroke-muted-foreground"
                        : "fill-muted-foreground"
                    )}
                  />
                  <span className="sr-only">Open {link.name} in new tab</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </MotionWrapper>
  );
}
