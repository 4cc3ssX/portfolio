import Link from "next/link";
import { FadeIn } from "@/components/ui/animated-text";
import { Icon, IconName } from "@/components/svgs";
import { cn } from "@/lib/utils";

interface SocialLink {
  id: string;
  name: string;
  uri: string;
}

interface AboutSocialLinksProps {
  links: SocialLink[];
}

export function AboutSocialLinks({ links }: AboutSocialLinksProps) {
  return (
    <FadeIn delay={0.2}>
      <div className="mt-10">
        <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Connect
        </p>
        <div className="flex gap-2">
          {links.map((link) => {
            const shouldUseStrokeColor = ["x"].includes(
              link.name.toLowerCase()
            );

            return (
              <Link
                key={link.id}
                href={link.uri}
                target="_blank"
                rel="noopener noreferrer"
                title={link.name}
                className="group relative flex h-10 w-10 items-center justify-center border border-white/[0.08] bg-white/[0.02] transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]"
              >
                <Icon
                  name={link.name.toLowerCase() as IconName}
                  className={cn(
                    "size-4 transition-transform duration-300 group-hover:scale-110",
                    shouldUseStrokeColor
                      ? "stroke-foreground/70 group-hover:stroke-foreground"
                      : "fill-foreground/70 group-hover:fill-foreground"
                  )}
                />
                <span className="sr-only">{link.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </FadeIn>
  );
}
