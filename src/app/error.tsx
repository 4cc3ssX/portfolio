"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-5">
      <div className="flex flex-col items-center gap-6 text-center max-w-md">
        <div className="flex flex-col gap-2">
          <h1 className="text-6xl font-bold">Oops!</h1>
          <h2 className="text-2xl font-semibold text-muted-foreground">
            Something went wrong
          </h2>
        </div>

        <p className="text-muted-foreground">
          An unexpected error occurred. Don&apos;t worry, it&apos;s not your
          fault.
        </p>

        {process.env.NODE_ENV === "development" && error.message && (
          <div className="w-full p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-sm text-destructive font-mono break-all">
              {error.message}
            </p>
          </div>
        )}

        <Button variant="link" asChild>
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </div>
  );
}
