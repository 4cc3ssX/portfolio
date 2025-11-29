import { Button } from "@/components/ui/button";
import { UserWithLinks } from "@/shared/db/schema";
import Link from "next/link";

interface Props {
  data: UserWithLinks;
}

export function LandingContent({ data }: Props) {
  const resumeLink = data.links.find((link) => link.name.match(/resume/i));

  return (
    <>
      <div className="flex flex-col gap-y-3">
        <p className="text-sm md:text-base">Hi, I&apos;m {data.nickname}!</p>
        <p className="font-bold text-4xl md:text-5xl">
          Building scalable systems that drive real-world impact.
        </p>
        <p className="text-sm md:text-base">
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
      <div className="mt-4 sm:mt-1 flex flex-row items-center flex-wrap gap-3 sm:gap-2">
        <Button className="rounded-full" asChild>
          <Link href="#about">Let&apos;s Get Started 👋🏻</Link>
        </Button>
        {resumeLink ? (
          <Button variant="link" asChild>
            <a href={resumeLink.uri} target="_blank" rel="noopener noreferrer">
              Download Resume
            </a>
          </Button>
        ) : null}
      </div>
    </>
  );
}
