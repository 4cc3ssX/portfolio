"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
          <span className="text-2xl">⚠️</span>
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
          Something went wrong
        </h1>
        <p className="mt-4 max-w-md text-muted-foreground">
          An unexpected error occurred. Don&apos;t worry, it&apos;s not your fault.
        </p>

        {process.env.NODE_ENV === "development" && error.message && (
          <div className="mx-auto mt-6 max-w-md rounded-lg border border-destructive/20 bg-destructive/5 p-4">
            <p className="break-all font-mono text-sm text-destructive">
              {error.message}
            </p>
          </div>
        )}

        <div className="mt-8 flex items-center justify-center gap-4">
          <Button
            onClick={reset}
            variant="outline"
            className="rounded-full"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try again
          </Button>
          <Button asChild variant="ghost" className="rounded-full">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
