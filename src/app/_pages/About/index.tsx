"use client";

import { motion } from "framer-motion";

import { UserWithLinks } from "@/shared/db/schema";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "@/components/interface";
import { useNavigation } from "@/shared/hooks/use-navigation";

interface Props {
  data: UserWithLinks;
}

export default function About({ data }: Props) {
  const { navigate } = useNavigation();
  return (
    <div id="about" className="relative flex pt-14 min-h-dvh">
      <div className="flex-1 flex flex-col justify-start sm:justify-center items-center">
        <motion.div
          initial={{ y: 20, opacity: 0, filter: "blur(5px)" }}
          whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
          className="flex-1 md:flex-none flex flex-col gap-y-3 w-full sm:w-3/4 md:w-4/6 lg:w-7/12 xl:w-1/2 h-auto md:min-h-[75%] px-6"
        >
          <div className="flex flex-col gap-y-1">
            <h1 className="font-medium text-2xl sm:text-3xl">About</h1>
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-md whitespace-pre-line hyphens-auto">
              I&apos;m Ryam, a full-stack web and mobile app developer with a
              passion for building scalable, high-performance applications. I
              specialize in <span className="text-blue-500">React</span>,{" "}
              <span className="text-blue-500">React Native</span>, and{" "}
              <span className="text-blue-500">TypeScript</span> on the frontend,
              delivering responsive, user-friendly interfaces. On the backend, I
              leverage <span className="text-blue-500">NestJS</span>,{" "}
              <span className="text-blue-500">MongoDB</span>, and event-driven
              architectures to create systems optimized for real-time
              communication and high efficiency. My experience extends to
              integrating <span className="text-blue-500">Socket.io</span> for
              real-time interactions and managing complex queues using{" "}
              <span className="text-blue-500">BullMQ</span> and{" "}
              <span className="text-blue-500">Kafka</span> to handle demanding
              workflows.
            </p>
            <p className="text-md whitespace-pre-line hyphens-auto">
              In addition to my technical expertise, I focus on creating
              seamless user experiences while ensuring scalability and
              reliability in large-scale systems. I&apos;m adept at optimizing
              application performance and handling data-intensive processes,
              making sure the systems I build are robust and future-proof.
              Whether it&apos;s mobile or web, frontend or backend, I&apos;m
              always eager to push the boundaries of technology and create
              solutions that truly make an impact.
            </p>
          </div>
        </motion.div>
      </div>
      <motion.div className="absolute inset-x-0 -bottom-10 md:bottom-10 flex flex-col items-center justify-center z-10">
        <Button
          variant="outline"
          size="icon"
          className="size-12 bg-background/50 backdrop-blur-lg md:backdrop-blur-sm rounded-full"
          onClick={() => navigate("experience")}
        >
          <ArrowDown />
          <span className="sr-only">Navigate to experience</span>
        </Button>
      </motion.div>
    </div>
  );
}
