import { ExperienceWithCompany } from "@/shared/db/schema";
import { openURL } from "@/utils";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { BsBoxArrowUpRight } from "react-icons/bs";

export interface ExperienceCardProps {
  experience: ExperienceWithCompany;
}

export const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  return (
    <div className="flex flex-row items-center gap-x-3 py-2.5">
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
      <div className="flex-[2] flex flex-col gap-y-1">
        <div className="flex flex-row items-center gap-x-2">
          <Link
            aria-disabled={!experience.company.uri}
            href={experience.company.uri ?? "#"}
            target="_blank"
            className="font-medium text-lg hover:underline underline-offset-2"
          >
            {experience.company.name}
          </Link>
          {experience.company.uri ? (
            <button
              title={`${experience.company.name}`}
              onClick={() => openURL(experience.company.uri!, true)}
            >
              <BsBoxArrowUpRight />
            </button>
          ) : null}
        </div>
        <p className="text-sm text-muted-foreground">{experience.position}</p>
      </div>
      <div className="flex flex-row items-center justify-start gap-2">
        <p className="text-sm text-muted-foreground text-left">
          {dayjs(experience.startedAt).format("MMM YYYY")}
          {" - "}
          <span
            className={`${
              experience.isActive ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {experience.isActive
              ? "Present"
              : dayjs(experience.endedAt).format("MMM YYYY")}
          </span>
        </p>
      </div>
    </div>
  );
};
