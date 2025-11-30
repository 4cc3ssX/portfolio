import { ReactNode } from "react";
import { Background } from "@/features/shared/components/background";

interface BlogLayoutProps {
  children: ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Background />
      {children}
    </div>
  );
}
