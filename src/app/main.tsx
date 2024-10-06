"use client";

import { Header, ContactLinks } from "@/components/interface";
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
      <Header data={me} />
      {/* <ContactLinks data={me} /> */}
      <div className="w-screen h-screen overflow-x-hidden overflow-y-scroll scroll-smooth">
        {/* Landing */}
        <Landing data={me} />
        {/* About */}
        {/* <About {...about} /> */}
        {/* Experience */}
        <Experience data={experiences} />
        {/* Projects */}
        <Projects data={projects} />
        {/* Contact */}
        {/* <Contact {...contact} data={intro} /> */}
      </div>
    </main>
  );
}
