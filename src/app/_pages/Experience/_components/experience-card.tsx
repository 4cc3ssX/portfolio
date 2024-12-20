import { cn } from "@/lib/utils";
import { CompanyWithImageAndLink } from "@/shared/db/schema";
import { openURL } from "@/utils";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { isNil } from "lodash-es";

export interface ExperienceCardProps
  extends React.ComponentProps<typeof motion.div> {
  index?: number;
  total?: number;
  active: boolean;
  company: CompanyWithImageAndLink;
  position?: string;
  start: string;
  end: string | null;
  className?: string;
}

export const ExperienceCard = ({
  index,
  total,
  active,
  company,
  position,
  start,
  end,
  className,
  ...rest
}: ExperienceCardProps) => {
  const isValidValues = !isNil(index) && !isNil(total);

  const opacity = isValidValues ? 1 - index / (total * 1.5) : 1;
  const scale = isValidValues ? 1 - index / (total * 10) : 1;
  return (
    <motion.div
      layout
      layoutId={`experience-${company.id}`}
      exit={{ opacity: 0 }}
      transition={{
        default: { ease: "linear" },
        layout: {
          duration: 0.3,
          ease: "easeInOut",
        },
      }}
      whileHover={{
        opacity: 1,
        scale: index && index > 0 ? scale + 0.02 : 1,
      }}
      style={{ opacity, scale }}
      className="relative p-px cursor-pointer"
      {...rest}
    >
      {isValidValues && active ? (
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-600/70 to-background rounded-xl -z-10" />
      ) : null}
      <div
        className={cn(
          "flex flex-row items-center gap-x-3",
          className,
          isValidValues &&
            active &&
            "bg-gradient-to-br from-secondary to-background backdrop-blur-lg md:backdrop-blur-sm rounded-xl"
        )}
      >
        <div className="hidden md:block border border-muted rounded-full p-0.5">
          <Image
            placeholder={company.image.blurHash as any}
            src={company.image.uri}
            alt={`${company.name} logo`}
            width={32}
            height={32}
            className="object-center rounded-full"
          />
        </div>
        <div className="flex-[2] flex flex-col gap-y-0.5">
          <div className="flex flex-row items-center gap-x-1.5">
            {company.uri ? (
              <Link
                href={company.uri ?? "#"}
                target="_blank"
                className="font-medium text-lg hover:underline underline-offset-2"
              >
                {company.name}
                <span className="sr-only">Open {company.name} in new tab</span>
              </Link>
            ) : (
              <p className="font-medium text-lg cursor-not-allowed">
                {company.name}
              </p>
            )}
            {company.uri ? (
              <button
                title={`${company.name}`}
                onClick={() => openURL(company.uri!, true)}
              >
                <ExternalLink size={18} />
              </button>
            ) : null}
          </div>
          {position ? (
            <p className="text-sm text-muted-foreground">{position}</p>
          ) : null}
        </div>
        <div className="flex flex-row items-center justify-end flex-wrap gap-1.5">
          <p className="text-xs md:text-sm text-muted-foreground text-left">
            {dayjs(start).format("MMM YYYY")}
          </p>
          <span className="w-2 h-px bg-muted-foreground" />
          <p
            className={`text-xs md:text-sm ${
              active ? "text-primary" : "text-muted-foreground"
            } text-right`}
          >
            {active && !end ? "Present" : dayjs(end).format("MMM YYYY")}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
