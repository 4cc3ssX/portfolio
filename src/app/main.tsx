"use client";

import { ContactLinks } from "@/components/interface";
import About from "./_pages/About";
import Contact from "./_pages/Contact";
import Experience from "./_pages/Experience";
import Landing from "./_pages/Landing";
import Projects from "./_pages/Projects";
import {
  ExperienceWithCompany,
  ProjectWithLinkAndTags,
  UserWithLinks,
} from "@/shared/db/schema";
import { useEffect } from "react";
import { toast } from "sonner";
import { useNavigation } from "@/shared/hooks/use-navigation";

interface Props {
  me: UserWithLinks;
  experiences: ExperienceWithCompany[];
  projects: ProjectWithLinkAndTags[];
}

const INTRODUCTION_TIMEOUT = 8000; // 8s
const INTRODUCTION_DURATION = 20000; // 20s

export default function Main({ me, experiences, projects }: Props) {
  const { navigate } = useNavigation();

  const introduce = () => {
    toast("Let's Connect", {
      id: "intro-message",
      description:
        "Ready to chat? Reach out and let's bring your ideas to life!",
      action: {
        label: "Let's talk",
        onClick: () => navigate("contact"),
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
      <div className="w-screen h-dvh overflow-x-hidden overflow-y-scroll scroll-smooth">
        <Landing data={me} />

        <About data={me} />

        <Experience data={experiences} />

        <Projects data={projects} />

        <Contact user={me} />
      </div>
    </main>
  );
}
