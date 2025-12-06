import { Button } from "@/components/ui/button";
import { UserWithLinksAndAvatar } from "@/features/users/types/users";
import Link from "next/link";

interface Props {
  data: UserWithLinksAndAvatar;
}

export function LandingContent({ data }: Props) {
  const resumeLink = data.links.find((link) => link.name.match(/resume/i));

  return (
    <>
      <div className="flex flex-col gap-y-2">
        <p className="text-sm md:text-base font-medium">
          Hey, I&apos;m {data.nickname}!👋🏻
        </p>
        <p className="font-bold text-3xl sm:text-4xl xl:text-5xl">
          Building scalable systems that drive real-world impact.
        </p>
        <p className="text-sm md:text-base mt-2">
          A full-stack software engineer based in{" "}
          <a
            href="https://www.google.com/maps/place/Bangkok,+Thailand/@13.7465389,100.5365739,12z"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-500 cursor-pointer after:content-['_↗']"
          >
            Bangkok
          </a>
          , specializing in building scalable, event-driven systems with modern
          technologies and clean architecture.
        </p>
      </div>
      <div className="mt-2 sm:mt-1 flex flex-row items-center flex-wrap gap-3 sm:gap-2">
        <Button className="rounded-full" asChild>
          <Link href="#about">Let&apos;s Get Started 👋🏻</Link>
        </Button>
        {resumeLink ? (
          <Button variant="link" asChild>
            <Link
              href={resumeLink.uri}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Resume
            </Link>
          </Button>
        ) : null}
      </div>
    </>
  );
}
