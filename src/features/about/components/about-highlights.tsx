import { LucideIcon, MapPin, Calendar, Code2, Coffee } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/ui/animated-text";

interface Highlight {
  icon: LucideIcon;
  label: string;
  value: string;
}

interface AboutHighlightsProps {
  highlights?: Highlight[];
}

const defaultHighlights: Highlight[] = [
  {
    icon: MapPin,
    label: "Based in",
    value: "Bangkok, Thailand",
  },
  {
    icon: Calendar,
    label: "Experience",
    value: "5+ Years",
  },
  {
    icon: Code2,
    label: "Focus",
    value: "Full Stack",
  },
  {
    icon: Coffee,
    label: "Fuel",
    value: "Coffee & Curiosity",
  },
];

export function AboutHighlights({
  highlights = defaultHighlights,
}: AboutHighlightsProps) {
  return (
    <StaggerContainer className="grid grid-cols-2 gap-3" staggerDelay={0.1}>
      {highlights.map((item) => (
        <StaggerItem key={item.label}>
          <div className="group relative h-full border border-white/[0.08] bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.04]">
            {/* Corner accents */}
            <div className="absolute left-0 top-0 h-3 w-px bg-white/20 transition-all duration-300 group-hover:h-5 group-hover:bg-white/40" />
            <div className="absolute left-0 top-0 h-px w-3 bg-white/20 transition-all duration-300 group-hover:w-5 group-hover:bg-white/40" />
            <div className="absolute bottom-0 right-0 h-3 w-px bg-white/20 transition-all duration-300 group-hover:h-5 group-hover:bg-white/40" />
            <div className="absolute bottom-0 right-0 h-px w-3 bg-white/20 transition-all duration-300 group-hover:w-5 group-hover:bg-white/40" />

            <item.icon className="h-4 w-4 text-muted-foreground/60 transition-colors duration-300 group-hover:text-foreground/80" />
            <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground/60">
              {item.label}
            </p>
            <p className="mt-1 font-medium tracking-tight">{item.value}</p>
          </div>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
