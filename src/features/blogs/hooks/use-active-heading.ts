import { useEffect, useState, useCallback } from "react";

interface Heading {
  id: string;
  title: string;
  level: number;
}

export function useActiveHeading(headings: Heading[]) {
  const [activeId, setActiveId] = useState<string>("");

  const findClosestHeading = useCallback(
    (headingElements: HTMLElement[], activationPoint: number) => {
      let closestHeading = null as HTMLElement | null;
      let closestDistance = Infinity;

      headingElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Calculate the vertical center of the heading element
        const elementMiddle = rect.top + rect.height / 2;
        // Calculate distance from heading center to our activation point (20% from top)
        const distanceFromActivation = Math.abs(
          elementMiddle - activationPoint
        );

        // Only consider headings that are above the activation point
        // This ensures we track headings as they pass the 20% mark from the top
        if (
          rect.top <= activationPoint &&
          distanceFromActivation < closestDistance
        ) {
          closestDistance = distanceFromActivation;
          closestHeading = el;
        }
      });

      return closestHeading;
    },
    []
  );

  const handleScroll = useCallback(() => {
    // Get heading elements from the DOM
    const headingElements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((el): el is HTMLElement => el !== null);

    if (!headingElements.length) return;

    // Set activation point at 20% from top of viewport instead of middle (50%)
    // This allows headings to activate earlier as you scroll, providing better UX
    // since users typically read content starting from the top portion of the screen
    const activationPoint = window.innerHeight * 0.2;

    // When near bottom of page, activate the last heading to ensure it gets highlighted
    // even if user can't scroll it to the middle of the screen
    const isNearBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 100;

    if (isNearBottom) {
      const lastHeading = headingElements[headingElements.length - 1];
      setActiveId(lastHeading.id);
      return;
    }

    // Find the heading closest to the activation point for natural reading flow
    const closestHeading = findClosestHeading(headingElements, activationPoint);

    if (closestHeading) {
      setActiveId(closestHeading.id);
    } else {
      // Clear active state when scrolled above all headings
      setActiveId("");
    }
  }, [headings, findClosestHeading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial check on mount
    const timer = setTimeout(handleScroll, 0);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, [handleScroll]);

  return activeId;
}
