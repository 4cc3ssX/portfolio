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

interface Props {
  me: UserWithLinks;
  experiences: ExperienceWithCompany[];
  projects: ProjectWithLinkAndTags[];
}

export default function Main({ me, experiences, projects }: Props) {
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
