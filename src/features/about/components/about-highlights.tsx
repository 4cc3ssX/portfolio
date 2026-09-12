import { LucideIcon, MapPin, Calendar, Code2, Coffee, Sparkles } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/ui/animated-text";
import type { FactView } from "@/types/content";

interface AboutHighlightsProps {
  highlights: FactView[];
}

/**
 * Facts are editable in the CMS, so the icon is chosen from the label rather
 * than stored — an editor should not have to pick a lucide identifier.
 */
const ICONS: Record<string, LucideIcon> = {
  "based in": MapPin,
  experience: Calendar,
  focus: Code2,
  fuel: Coffee,
};

const iconFor = (label: string): LucideIcon =>
  ICONS[label.trim().toLowerCase()] ?? Sparkles;

export function AboutHighlights({ highlights }: AboutHighlightsProps) {
  return (
    <StaggerContainer className="grid grid-cols-2 gap-3" staggerDelay={0.1}>
      {highlights.map((item) => {
        const ItemIcon = iconFor(item.label);
        return (
        <StaggerItem key={item.label}>
          <div className="group relative h-full border border-white/[0.08] bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.04]">
            {/* Corner accents */}
            <div className="absolute left-0 top-0 h-3 w-px bg-white/20 transition-all duration-300 group-hover:h-5 group-hover:bg-white/40" />
            <div className="absolute left-0 top-0 h-px w-3 bg-white/20 transition-all duration-300 group-hover:w-5 group-hover:bg-white/40" />
            <div className="absolute bottom-0 right-0 h-3 w-px bg-white/20 transition-all duration-300 group-hover:h-5 group-hover:bg-white/40" />
            <div className="absolute bottom-0 right-0 h-px w-3 bg-white/20 transition-all duration-300 group-hover:w-5 group-hover:bg-white/40" />

            <ItemIcon className="h-4 w-4 text-muted-foreground/60 transition-colors duration-300 group-hover:text-foreground/80" />
            <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground/60">
              {item.label}
            </p>
            <p className="mt-1 font-medium tracking-tight">{item.value}</p>
          </div>
        </StaggerItem>
        );
      })}
    </StaggerContainer>
  );
}
