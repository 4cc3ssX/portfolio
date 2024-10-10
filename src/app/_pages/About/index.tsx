"use client";

import { motion } from "framer-motion";

import { UserWithLinks } from "@/shared/db/schema";

interface Props {
  data: UserWithLinks;
}

export default function About({ data }: Props) {
  return (
    <div id="about" className="flex pt-14 min-h-dvh">
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
            <p className="font-medium text-xl sm:text-2xl">About</p>
          </div>
          <div>
            <p className="text-base whitespace-pre-line hyphens-auto">
              I&apos;m Ryam, an experienced web and mobile app developer with
              expertise across the full stack. I specialize in building
              high-performance applications using technologies like{" "}
              <span className="text-blue-500 cursor-pointer after:content-['_↗']">
                React
              </span>
              ,{" "}
              <span className="text-blue-500 cursor-pointer after:content-['_↗']">
                React Native
              </span>
              , and{" "}
              <span className="text-blue-500 cursor-pointer after:content-['_↗']">
                TypeScript
              </span>{" "}
              for the frontend, while leveraging{" "}
              <span className="text-blue-500 cursor-pointer after:content-['_↗']">
                NestJS
              </span>
              ,{" "}
              <span className="text-blue-500 cursor-pointer after:content-['_↗']">
                MongoDB
              </span>
              , and event-driven architectures for the backend. My skill set
              also includes working with real-time communication through{" "}
              <span className="text-blue-500 cursor-pointer after:content-['_↗']">
                Socket.io
              </span>
              , managing queues with{" "}
              <span className="text-blue-500 cursor-pointer after:content-['_↗']">
                BullMQ
              </span>{" "}
              and{" "}
              <span className="text-blue-500 cursor-pointer after:content-['_↗']">
                Kafka
              </span>
              , and handling large-scale systems with a focus on scalability,
              efficiency, and seamless user experiences. I&apos;m passionate
              about creating solutions that not only meet technical requirements
              but also deliver exceptional user satisfaction.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
