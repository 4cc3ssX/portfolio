import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/sonner";
import { Metadata } from "next";
import { configs } from "@/shared/configs/site";

import "./globals.css";
import { Header, ThemeProvider } from "@/components/interface";

export const metadata: Metadata = {
  metadataBase: new URL(configs.url),
  title: {
    default: configs.title,
    template: `%s | ${configs.name}`,
  },
  description: configs.description,
  keywords: configs.keywords,
  openGraph: {
    type: "website",
    locale: configs.openGraph.locale,
    url: configs.url,
    title: configs.title,
    description: configs.description,
    siteName: configs.openGraph.siteName,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${configs.name} - Software Engineer`,
      },
    ],
  },
  icons: {
    icon: "/images/favicon.ico",
    apple: "/images/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://vercel.live" />
        <link rel="dns-prefetch" href="https://vercel.live" />
      </head>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Header />
          {children}
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
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
