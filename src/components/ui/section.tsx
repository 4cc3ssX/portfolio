import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  container?: boolean;
}

export function Section({
  children,
  className,
  id,
  container = true,
}: SectionProps) {
  return (
    <section id={id} className={cn("relative py-24 md:py-32", className)}>
      {container ? (
        <div className="mx-auto max-w-6xl px-6 md:px-8">{children}</div>
      ) : (
        children
      )}
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  description?: string;
  label?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  title,
  description,
  label,
  className,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {label && (
        <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/60">
          {label}
        </p>
      )}
      <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
        <span className="bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
          {title}
        </span>
      </h2>
      {description && (
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground/70">
          {description}
        </p>
      )}
    </div>
  );
}

interface SectionDividerProps {
  className?: string;
}

export function SectionDivider({ className }: SectionDividerProps) {
  return (
    <div className={cn("mx-auto max-w-6xl px-6 md:px-8", className)}>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}
