import Link from "next/link";
import { Icon, IconName } from "@/components/svgs";
import { cn } from "@/lib/utils";
import { UserWithLinksAndAvatar } from "@/features/users/types/users";
import { LinkType } from "@/features/users/schemas/links";

interface FooterProps {
  user: UserWithLinksAndAvatar;
}

export function Footer({ user }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const socials = user.links.filter((link) => link.type === LinkType.SOCIAL);

  return (
    <footer className="border-t border-white/[0.04] py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:flex-row sm:gap-4 md:px-8">
        <p className="text-xs text-muted-foreground/40">
          Designed &amp; Built by {user.nickname} © {currentYear}
        </p>

        {/* Social Links */}
        <div className="flex items-center gap-3">
          {socials.map((link) => {
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
                className="group"
              >
                <Icon
                  name={link.name.toLowerCase() as IconName}
                  className={cn(
                    "size-4 transition-colors duration-200",
                    shouldUseStrokeColor
                      ? "stroke-muted-foreground/40 group-hover:stroke-foreground"
                      : "fill-muted-foreground/40 group-hover:fill-foreground"
                  )}
                />
                <span className="sr-only">{link.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
