"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { AnalyticsEvent, sendEvent } from "@/shared/firebase";
import { INTRODUCTION_DURATION, INTRODUCTION_TIMEOUT } from "@/constants/toast";
import { openURL } from "@/utils";
import { UserWithLinksAndAvatar } from "@/features/users/types/users";

interface Props {
  me: UserWithLinksAndAvatar;
}

export function IntroductionToast({ me }: Props) {
  useEffect(() => {
    const introduce = () => {
      const calLink = me.links.find((link) => link.name.match(/^cal/i));

      toast("Let's Connect", {
        id: "intro-message",
        description:
          "Ready to chat? Reach out and let's bring your ideas to life!",
        action: {
          label: "Let's talk",
          onClick: () => {
            if (calLink) {
              openURL(calLink.uri, true);
            }

            sendEvent(AnalyticsEvent.LETS_TALK);
          },
        },
        duration: INTRODUCTION_DURATION,
      });
    };

    const introTimeout = setTimeout(() => {
      introduce();
    }, INTRODUCTION_TIMEOUT);

    return () => {
      clearTimeout(introTimeout);
    };
  }, [me]);

  return null;
}
