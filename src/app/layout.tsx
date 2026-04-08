import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Erasmus AI Society x Claude Hackathon",
  description:
    "Live onboarding and event guide for the Erasmus AI Society x Claude hackathon, powered by Anthropic.",
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
