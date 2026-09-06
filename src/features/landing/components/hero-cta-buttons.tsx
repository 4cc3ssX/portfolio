import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MotionWrapper } from "@/features/shared";

interface HeroCTAButtonsProps {
  resumeLink?: string | null;
  primaryLabel?: string | null;
  primaryHref?: string | null;
  secondaryLabel?: string | null;
}

export function HeroCTAButtons({
  resumeLink,
  primaryLabel,
  primaryHref,
  secondaryLabel,
}: HeroCTAButtonsProps) {
  return (
    <MotionWrapper
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
      className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
    >
      <Button
        asChild
        size="lg"
        className="group relative overflow-hidden bg-foreground px-8 py-6 text-background transition-all hover:bg-foreground/90"
      >
        <Link href={primaryHref || "/projects"}>
          <span className="relative z-10 flex items-center gap-2 text-sm font-medium uppercase tracking-wider">
            {primaryLabel || "View Work"}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </Link>
      </Button>
      {resumeLink && (
        <Button
          asChild
          variant="outline"
          size="lg"
          className="group border-white/[0.1] bg-transparent px-8 py-6 transition-all hover:border-white/20 hover:bg-white/[0.02]"
        >
          <Link href={resumeLink} target="_blank" rel="noopener noreferrer">
            <span className="text-sm font-medium uppercase tracking-wider">
              {secondaryLabel || "Resume"}
            </span>
          </Link>
        </Button>
      )}
    </MotionWrapper>
  );
}
