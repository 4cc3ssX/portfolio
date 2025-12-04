"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown } from "@/components/interface";
import { useNavigation } from "@/shared/hooks/use-navigation";

export function NavigateButton() {
  const { navigate } = useNavigation();
  
  return (
    <div className="absolute inset-x-0 bottom-0 md:bottom-10 flex flex-col items-center justify-center z-10">
      <Button
        variant="outline"
        size="icon"
        className="size-12 bg-background/50 backdrop-blur-lg md:backdrop-blur-sm rounded-full"
        onClick={() => navigate("experience")}
      >
        <ArrowDown />
        <span className="sr-only">Navigate to experience</span>
      </Button>
    </div>
  );
}
