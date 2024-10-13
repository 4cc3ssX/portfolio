import { cn } from "@/lib/utils";
import { ExperienceWithCompany } from "@/shared/db/schema";
import { openURL } from "@/utils";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface ExperienceCardProps {
  index: number;
  total: number;
  experience: ExperienceWithCompany;
}

export const ExperienceCard = ({
  index,
  total,
  experience,
}: ExperienceCardProps) => {
  const opacity = 1 - index / (total * 1.5);
  const scale = 1 - index / (total * 8);
  return (
    <motion.div
      whileHover={{ opacity: 1, scale: index > 0 ? scale + 0.02 : undefined }}
      style={{ opacity, scale }}
      className="relative p-px"
    >
      {experience.isActive && (
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-600/70 to-background rounded-xl -z-10" />
      )}
      <div
        className={cn(
          "flex flex-row items-center gap-x-3 px-3 py-1.5 md:px-4 md:py-2.5",
          experience.isActive &&
            "bg-gradient-to-br from-secondary to-background backdrop-blur-lg md:backdrop-blur-sm rounded-xl"
        )}
      >
        <div className="hidden md:block border border-muted rounded-full p-0.5">
          <Image
            placeholder={experience.company.image.blurHash as any}
            src={experience.company.image.uri}
            alt={`${experience.company.name} logo`}
            width={32}
            height={32}
            className="object-center rounded-full"
          />
        </div>
        <div className="flex-[2] flex flex-col gap-y-0.5">
          <div className="flex flex-row items-center gap-x-2">
            {experience.company.uri ? (
              <Link
                href={experience.company.uri ?? "#"}
                target="_blank"
                className="font-medium text-lg hover:underline underline-offset-2"
              >
                {experience.company.name}
              </Link>
            ) : (
              <p className="font-medium text-lg cursor-not-allowed">
                {experience.company.name}
              </p>
            )}
            {experience.company.uri ? (
              <button
                title={`${experience.company.name}`}
                onClick={() => openURL(experience.company.uri!, true)}
              >
                <ExternalLink size={18} />
              </button>
            ) : null}
          </div>
          <p className="text-sm text-muted-foreground">{experience.position}</p>
        </div>
        <div className="flex flex-row items-center justify-end flex-wrap gap-1.5">
          <p className="text-xs md:text-sm text-muted-foreground text-left">
            {dayjs(experience.startedAt).format("MMM YYYY")}
          </p>
          <div className="w-2 h-px bg-muted-foreground" />
          <p
            className={`text-xs md:text-sm ${
              experience.isActive ? "text-primary" : "text-muted-foreground"
            } text-right`}
          >
            {experience.isActive
              ? "Present"
              : dayjs(experience.endedAt).format("MMM YYYY")}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
