"use client";
import { Poppins } from "next/font/google";

import { Header, ContactLinks } from "@/components/interface";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Experience from "./pages/Experience";
import Landing from "./pages/Landing";
import { IAboutMe, IContact, IExperience, IMe } from "@/types";

const poppins = Poppins({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  style: "normal",
  variable: "--font-Poppins",
});

interface Props {
  data: IMe;
  about: IAboutMe;
  experience: IExperience[];
  contact: IContact;
}

export default function Main({ data, about, experience, contact }: Props) {
  return (
    <main className={poppins.variable}>
      <Header {...data} />
      <ContactLinks {...data} />
      <div className="w-screen h-screen overflow-y-scroll scroll-smooth snap-y snap-mandatory">
        {/* Landing */}
        <Landing {...data} />
        {/* About */}
        <About {...about} />
        {/* Experience */}
        <Experience data={experience} />
        {/* Contact */}
        <Contact {...contact} data={data} />
      </div>
    </main>
  );
}
