import { useEffect } from "react";
import { useMotionValue } from "motion/react";

interface UseScrollProgressOptions {
  elementId: string;
}

export function useScrollProgress({ elementId }: UseScrollProgressOptions) {
  const scaleY = useMotionValue(0);

  useEffect(() => {
    const updateProgress = () => {
      const element = document.getElementById(elementId);
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const elementHeight = element.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(
        0,
        Math.min(1, scrolled / (elementHeight - windowHeight))
      );
      scaleY.set(progress);
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementId]);

  return scaleY;
}
