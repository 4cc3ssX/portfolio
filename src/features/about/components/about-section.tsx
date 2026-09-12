import { AboutContent } from "./about-content";
import type { UserView } from "@/types/content";

interface AboutSectionProps {
  user: UserView;
}

export function AboutSection({ user }: AboutSectionProps) {
  const socials = user.links
    .filter((link) => link.type === "social")
    .map(({ id, name, uri }) => ({ id, name, uri }));

  return (
    <AboutContent
      socials={socials}
      heading={user.about.heading}
      body={user.about.body}
      slogan={user.slogan}
      quickFacts={user.about.quickFacts}
    />
  );
}
