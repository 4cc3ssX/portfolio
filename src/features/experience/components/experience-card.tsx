import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import { ArrowUpRight } from "lucide-react";
import { MotionWrapper } from "@/features/shared";

interface Company {
  name: string;
  uri: string | null;
  image: {
    uri: string;
  } | null;
}

interface ExperienceCardProps {
  id: string;
  position: string;
  company: Company;
  startedAt: string | Date;
  endedAt: string | Date | null;
  isActive: boolean;
  description: string | string[] | null;
}

export function ExperienceCard({
  position,
  company,
  startedAt,
  endedAt,
  isActive,
  description,
}: ExperienceCardProps) {
  return (
    <MotionWrapper
      whileHover={{ x: 4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative"
    >
      {/* Timeline Dot */}
      <div className="absolute left-0 top-6 z-10 h-2 w-2 -translate-x-1/2 border border-white/40 bg-background transition-colors duration-300 group-hover:border-white/80 group-hover:bg-white/20 md:left-8" />

      {/* Content Card */}
      <div className="ml-6 md:ml-16">
        <div className="border border-white/[0.06] bg-white/[0.01] p-6 transition-all duration-300 group-hover:border-white/[0.12] group-hover:bg-white/[0.03]">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              {company.image?.uri && (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/[0.08] bg-white/[0.02]">
                  <Image
                    src={company.image.uri}
                    alt={company.name}
                    width={24}
                    height={24}
                    className="h-6 w-6 object-contain"
                  />
                </div>
              )}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-medium tracking-tight">{position}</h3>
                  {isActive && (
                    <span className="inline-flex items-center border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-emerald-400">
                      Current
                    </span>
                  )}
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <Link
                    href={company.uri || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {company.name}
                    <ArrowUpRight className="h-3 w-3 opacity-50" />
                  </Link>
                  <span className="text-muted-foreground/30">•</span>
                  <span className="text-xs text-muted-foreground/60">
                    {dayjs(startedAt).format("MMM YYYY")} —{" "}
                    {isActive ? "Present" : dayjs(endedAt).format("MMM YYYY")}
                  </span>
                </div>
                {description && (
                  <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground/70">
                    {Array.isArray(description)
                      ? description.join(" ")
                      : description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MotionWrapper>
  );
}
