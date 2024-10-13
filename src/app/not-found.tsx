import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function NotFound() {
  return (
    <div className="h-dvh flex flex-col items-center justify-center gap-4">
      <div className="flex flex-row items-center gap-3">
        <h1 className="text-2xl font-bold">404</h1>
        <Separator orientation="vertical" />
        <h2 className="text-sm font-normal">This page could not be found.</h2>
      </div>
      <Link href="/" className="text-sm">
        Return Home
        <span className="sr-only">Navigate to home</span>
      </Link>
    </div>
  );
}
