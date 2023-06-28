
import "./globals.css";

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
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="manifest.json" />

      <body>{children}</body>
    </html>
  );
}
