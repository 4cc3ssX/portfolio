"use client";

import { ContactLinks } from "@/components/interface";
import About from "./_pages/About";
import Contact from "./_pages/Contact";
import Experience from "./_pages/Experience";
import Landing from "./_pages/Landing";
import Projects from "./_pages/Projects";
import { ExperienceWithCompany, UserWithLinks } from "@/shared/db/schema";
import { useEffect } from "react";
import { toast } from "sonner";
import Skills from "./_pages/Skills";
import { SkillWithTag } from "@/shared/db/schema/skills";
import { ProjectWithLinkAndTagsWithGithubData } from "@/actions/projects";
import { AnalyticsEvent, sendEvent } from "@/shared/firebase";
import { INTRODUCTION_DURATION, INTRODUCTION_TIMEOUT } from "@/constants/toast";
import { Particles } from "@/components/ui/particles";
import { openURL } from "@/utils";

interface Props {
  me: UserWithLinks;
  experiences: ExperienceWithCompany[];
  projects: ProjectWithLinkAndTagsWithGithubData[];
  skills: SkillWithTag[];
}

export default function Main({ me, experiences, projects, skills }: Props) {
  const introduce = () => {
    const calLink = me.links.find((link) => link.name.match(/^cal/i));

    toast("Let's Connect", {
      id: "intro-message",
      description:
        "Ready to chat? Reach out and let's bring your ideas to life!",
      action: {
        label: "Let's talk",
        onClick: () => {
          if (calLink) {
            openURL(calLink.uri, true);
          }

          sendEvent(AnalyticsEvent.LETS_TALK);
        },
      },
      duration: INTRODUCTION_DURATION,
    });
  };

  useEffect(() => {
    const introTimeout = setTimeout(() => {
      introduce();
    }, INTRODUCTION_TIMEOUT);

    return () => {
      introTimeout && clearTimeout(introTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="font-sans">
      <ContactLinks data={me} />
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        size={0.2}
        refresh
      />
      <div className="w-screen h-dvh overflow-x-hidden overflow-y-scroll scroll-smooth">
        <Landing data={me} />

        <About data={me} />

        <Experience data={experiences} />

        <Projects data={projects} />

        <Skills data={skills} />

        <Contact user={me} />
      </div>
    </main>
  );
}
