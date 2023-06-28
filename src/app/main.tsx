"use client";
import { Poppins } from "next/font/google";

import { Header, ContactLinks } from "@/components/interface";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Experience from "./pages/Experience";
import Landing from "./pages/Landing";
import { IAboutMe, IContact, IExperience, IMe, IProject } from "@/types";
import Projects from "./pages/Projects";

const poppins = Poppins({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  style: "normal",
  variable: "--font-Poppins",
});

interface Props {
  intro: IMe;
  about: IAboutMe;
  experience: IExperience[];
  projects: IProject[];
  contact: IContact;
}

export default function Main({
  intro,
  about,
  experience,
  projects,
  contact,
}: Props) {
  return (
    <main className={poppins.variable}>
      <Header {...intro} />
      <ContactLinks {...intro} />
      <div className="w-screen h-screen overflow-x-hidden overflow-y-scroll scroll-smooth">
        {/* Landing */}
        <Landing {...intro} />
        {/* About */}
        <About {...about} />
        {/* Experience */}
        <Experience data={experience} />
        {/* Projects */}
        <Projects data={projects} />
        {/* Contact */}
        <Contact {...contact} data={intro} />
      </div>
    </main>
  );
}
