import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";
import { Header, ThemeProvider } from "@/components/interface";

export const metadata = {
  title: "Ryam",
  description: "A Software Engineer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="icon" href="/images/favicon.ico" sizes="any" />
      <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
      <link rel="manifest" href="manifest.webmanifest" />

      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Header />
          {children}
          <SpeedInsights />
          <Analytics />
          <Toaster
            toastOptions={{
              className:
                "bg-background/50 backdrop-blur-lg md:backdrop-blur-sm",
            }}
            position="bottom-center"
            duration={5000}
            richColors
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
