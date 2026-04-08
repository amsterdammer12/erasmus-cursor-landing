import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Erasmus AI Society x Claude Hackathon",
  description: "Build real products with AI. No coding experience required. April 9, 2026.",
  openGraph: {
    title: "Erasmus AI Society x Claude Hackathon",
    description: "Build real products with AI. No coding experience required. April 9, 2026.",
    type: "website",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
