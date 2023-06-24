"use client";

import { Header, ContactLinks } from "@/components/interface";
import { IAboutMe, IContact, IExperience, IMe } from "@/types";

// Pages
import About from "../pages/About";
import Experience from "../pages/Experience";
import Landing from "../pages/Landing";
import { useRef } from "react";
import { useInView } from "framer-motion";
import Contact from "../pages/Contact";

interface Props {
  data: IMe;
  about: IAboutMe;
  experience: IExperience[];
  contact: IContact;
}

export default function Main({ data, about, experience, contact }: Props) {
  const landingRef = useRef(null);

  const isLandingInView = useInView(landingRef);
  return (
    <>
      <Header />
      <ContactLinks isLandingInView={isLandingInView} {...data} />
      <div className="w-screen h-screen overflow-y-scroll scroll-smooth snap-y snap-mandatory">
        {/* Landing */}
        <Landing ref={landingRef} {...data} />
        {/* About */}
        <About {...about} />
        {/* Experience */}
        <Experience data={experience} />
        {/* Contact */}
        <Contact {...contact} data={data} />
      </div>
    </>
  );
}
