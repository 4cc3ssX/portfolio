"use client";

import { motion } from "framer-motion";
import { openURL } from "@/utils";
import { UserWithLinks } from "@/shared/db/schema";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { GlobeRef } from "@/components/interface";
import { useNavigation } from "@/shared/hooks/use-navigation";
import { AnalyticsEvent, sendEvent } from "@/shared/firebase";

const Globe = dynamic(() => import("@/components/interface/globe"), {
  ssr: false,
});

interface Props {
  data: UserWithLinks;
}

const LOCATE_POSITION: [number, number] = [13.7563, 100.5018];

const Landing = ({ data }: Props) => {
  const { navigate } = useNavigation();
  const globeRef = useRef<GlobeRef>(null);
  const resumeLink = data.links.find((link) => link.name.match(/resume/i));

  const handleLetsGetStarted = () => {
    navigate("about");

    sendEvent(AnalyticsEvent.LETS_GET_STARTED);
  };

  const handleDownloadResume = (link: string) => {
    sendEvent(AnalyticsEvent.DOWNLOAD_RESUME);
    openURL(link, true);
  };

  const handleLocatePosition = () => {
    sendEvent(AnalyticsEvent.LOCATE_POSITION);

    globeRef.current?.locateToPosition(LOCATE_POSITION[0], LOCATE_POSITION[1]);
  };

  return (
    <div id="landing" className="relative flex pt-14 min-h-dvh">
      <Globe
        globeRef={globeRef}
        markers={[{ location: LOCATE_POSITION, size: 0.08 }]}
        className="absolute top-10 lg:top-20 -right-1/2 md:-right-1/4 lg:right-0"
      />
      <div className="flex flex-1 flex-col justify-center items-center">
        <motion.div
          initial={{
            y: 20,
            filter: "blur(8px)",
            opacity: 0,
          }}
          animate={{
            y: 0,
            filter: "blur(0px)",
            opacity: 1,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="flex flex-col gap-y-4 w-full md:w-4/6 lg:w-7/12 px-5 md:px-6"
        >
          <div className="flex flex-col gap-y-3">
            <p className="text-sm md:text-base">
              Hi, I&apos;m {data.nickname}!
            </p>
            <p className="font-bold text-4xl md:text-5xl">{data.slogan}</p>
            <p className="text-sm md:text-base">
              I&apos;m a full-stack software engineer based in{" "}
              <span
                className="text-blue-500 cursor-pointer after:content-['_↗']"
                onClick={handleLocatePosition}
              >
                Bangkok
              </span>
              , who loves at breaking things, building cutting-edge, accessible
              and well-optimized apps.
            </p>
          </div>
          <div className="mt-6 sm:mt-1 flex flex-row gap-x-2">
            <Button className="rounded-full" onClick={handleLetsGetStarted}>
              Let&apos;s Get Started 👋🏻
            </Button>
            {resumeLink ? (
              <Button
                variant="link"
                onClick={() => handleDownloadResume(resumeLink.uri)}
              >
                Download Resume
              </Button>
            ) : null}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;
