"use client";

import { Button } from "@/components/ui/button";
import { UserWithLinks } from "@/shared/db/schema";
import { openURL } from "@/utils";
import { motion } from "framer-motion";
import { useCallback } from "react";

interface Props {
  user: UserWithLinks;
}

export default function Contact({ user }: Props) {
  const sayHi = useCallback(() => {
    openURL(
      `mailto:${user.email}?subject=${encodeURIComponent(
        "Collaboration Opportunity: Let's Create Something Amazing!"
      )}`,
      true
    );
  }, [user.email]);

  return (
    <div id="contact" className="relative flex pt-14 min-h-dvh">
      <div className="absolute left-0 right-0 bottom-8">
        <p className="text-xs text-hint text-center">
          Designed & Built by{" "}
          <span className="font-medium">{user.nickname} 🚀</span>
        </p>
      </div>
      <div className="flex flex-1 flex-col justify-center items-center">
        <motion.div
          initial={{ y: 20, opacity: 0, filter: "blur(5px)" }}
          whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
          className="flex-1 flex flex-col gap-y-3 w-full sm:w-3/4 lg:w-7/12 px-6 justify-center"
        >
          <div className="flex flex-col items-center gap-1.5">
            <div>
              <p className="font-medium text-center text-xl sm:text-2xl">
                What&apos;s Next?
              </p>
            </div>
            <div className="w-12 h-1 rounded-full bg-primary shadow-primary" />
          </div>
          <div className="flex-none flex flex-col items-center">
            <p className="text-base leading-8 tracking-wide hyphens-auto text-center">
              Feel free to reach out with any questions, project ideas, or just
              to say hello. I value connections and will respond as promptly as
              I can.
            </p>
          </div>
          <div className="h-44 flex flex-col justify-center items-center">
            <Button
              variant="outline"
              size="lg"
              className="rounded-xl"
              title={user.email}
              onClick={sayHi}
            >
              Say Hi!
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
