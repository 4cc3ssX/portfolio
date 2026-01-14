import { UserWithLinksAndAvatar } from "@/features/users/types/users";
import { LinkType } from "@/features/users/schemas/links";
import { AboutContent } from "./about-content";

interface AboutSectionProps {
  user: UserWithLinksAndAvatar;
}

export function AboutSection({ user }: AboutSectionProps) {
  const socials = user.links
    .filter((link) => link.type === LinkType.SOCIAL)
    .map(({ id, name, uri }) => ({ id, name, uri }));

  return <AboutContent socials={socials} />;
}
