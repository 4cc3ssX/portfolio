"use client";

import { Button } from "@/components/ui/button";
import { AnalyticsEvent, sendEvent } from "@/shared/firebase";
import { openURL } from "@/utils";

interface Props {
  email: string;
}

export function ContactButton({ email }: Props) {
  const sayHi = () => {
    openURL(
      `mailto:${email}?subject=${encodeURIComponent(
        "Collaboration Opportunity: Let's Create Something Amazing!"
      )}`,
      true
    );

    sendEvent(AnalyticsEvent.SAY_HI);
  };

  return (
    <Button
      variant="outline"
      size="lg"
      className="rounded-xl"
      title={email}
      onClick={sayHi}
    >
      Say Hi!
    </Button>
  );
}
