"use client";

import { IExperience } from "@/types";
import dayjs from "dayjs";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";

interface Props {
  data: IExperience[];
}

export default function Experience({ data }: Props) {
  const sortedData = useMemo(
    () => data.sort((a, b) => b.from - a.from),
    [data]
  );

  const [activeCompany, setActiveCompany] = useState<string>(
    sortedData.at(0)?.company_name as string
  );

  const activeExperience = useMemo(
    () => data.find((d) => d.company_name === activeCompany),
    [activeCompany, data]
  );

  const onChangeTab = (data: IExperience) => {
    setActiveCompany(data.company_name);
  };

  return (
    <div id="experience" className="snap-start flex pt-14 w-screen h-screen">
      <div className="flex-1 flex flex-col justify-start md:justify-center items-center">
        <motion.div
          initial={{ x: 100, opacity: 0.4 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 300,
          }}
          className="flex-1 md:flex-none flex flex-col gap-y-3 w-full sm:w-3/4 md:w-3/4 lg:w-7/12 h-auto md:h-3/4 px-6"
        >
          <div className="flex flex-row items-center gap-2">
            <div>
              <p className="font-sans font-medium text-xl md:text-2xl">
                Experience
              </p>
            </div>
            <div className="w-4 h-1 rounded-full bg-primary shadow-primary" />
          </div>
          <div className="flex-1 flex flex-col md:flex-row items-start">
            <div className="relative flex flex-row md:flex-col justify-center md:justify-start items-start flex-wrap">
              <div className="hidden md:block absolute left-0 inset-y-0 w-0.5 h-full bg-bar -z-10" />
              {sortedData.map((data) => {
                const isActive = data.company_name === activeCompany;
                return (
                  <div
                    key={data.company_name}
                    className="relative flex-none flex flex-col items-center md:items-start w-36 md:w-44 px-1 md:px-5 py-2 cursor-pointer"
                    onClick={() => onChangeTab(data)}
                  >
                    <AnimatePresence initial={false} mode="wait">
                      {isActive ? (
                        <motion.div
                          layoutId="tabIndicator"
                          className="absolute inset-y-0 left-auto right-auto md:inset-0 bg-primary200 w-full border-b-2 md:border-b-0 border-l-0 md:border-l-2  border-primary -z-10"
                        />
                      ) : null}
                    </AnimatePresence>
                    <p className="font-sans text-base text-center md:text-left line-clamp-1">
                      {data.company_name}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="mt-10 md:mt-0 flex-1">
              {activeExperience ? (
                <div className="px-0 md:px-4 flex flex-col gap-2">
                  <div>
                    <p className="font-sans text-lg md:text-xl">
                      {activeExperience?.title}
                    </p>
                    <p className="font-sans text-sm text-hint">
                      {dayjs(activeExperience.from).format("MMM YYYY")}
                      {" - "}
                      {activeExperience.is_current
                        ? "Present"
                        : dayjs(activeExperience.to).format("MMM YYYY")}
                    </p>
                  </div>
                  <div className="flex flex-col gap-y-2">
                    {activeExperience.responsibilities.map(
                      (responsibility, index) => {
                        return (
                          <div
                            key={`resp-${activeExperience.company_name}-${index}`}
                            className="flex flex-row gap-x-2"
                          >
                            <div className="flex-none w-3 h-1 rounded-full bg-primary shadow-primary mt-2" />
                            <div className="flex-1">
                              <p className="font-sans text-sm">
                                {responsibility}
                              </p>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
