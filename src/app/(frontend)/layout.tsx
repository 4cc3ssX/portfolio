import "./globals.css";

import dynamic from "next/dynamic";
import { Metadata } from "next";
import { configs } from "@/shared/configs/site";
import { Inter, JetBrains_Mono } from "next/font/google";

import { ThemeProvider } from "@/components/interface";
import { Navbar } from "@/components/layout";

const Toaster = dynamic(() =>
  import("@/components/ui/sonner").then((mod) => mod.Toaster)
);
const SpeedInsights = dynamic(() =>
  import("@vercel/speed-insights/next").then((mod) => mod.SpeedInsights)
);
const Analytics = dynamic(() =>
  import("@vercel/analytics/react").then((mod) => mod.Analytics)
);

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

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
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Toaster
            toastOptions={{
              className: "bg-card border-border",
            }}
            position="bottom-right"
            duration={3000}
          />
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
