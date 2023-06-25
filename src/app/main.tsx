"use client";
import { Poppins } from "next/font/google";

import { Header, ContactLinks } from "@/components/interface";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Experience from "./pages/Experience";
import Landing from "./pages/Landing";
import { IAboutMe, IContact, IExperience, IMe } from "@/types";
import {
  useDeferredValue,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useScroll } from "framer-motion";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const clientHeight = useRef<number>(0);

  const [isInView, setIsInView] = useState(false);
  const deferredInView = useDeferredValue(isInView);

  const { scrollY } = useScroll({ container: containerRef });

  scrollY.on("change", (value) => {
    const scrollValue = Math.round(value);
    if (scrollValue >= clientHeight.current) {
      setIsInView(false);
    } else {
      setIsInView(true);
    }
  });

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (container) {
      clientHeight.current = container.clientHeight;

      if (container.scrollTop === 0) {
        console.log("in view");
        setIsInView(true);
      }
    }
  }, []);
  return (
    <main className={poppins.variable}>
      <Header />
      <ContactLinks isInView={deferredInView} {...data} />
      <div
        ref={containerRef}
        className="w-screen h-screen overflow-y-scroll scroll-smooth snap-y snap-mandatory"
      >
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
