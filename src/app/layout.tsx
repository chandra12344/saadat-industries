import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LayoutShell from "@/components/LayoutShell";
import ToasterProvider from "@/components/ToasterProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SAADAT INDUSTRIES - Manufacturer of Conveyor System Components",
  description:
    "SAADAT INDUSTRIES is a leading manufacturer of conveyor system components including idler rollers, drum pulleys, conveyor belts, and readymade conveyor systems based in Panvel, Maharashtra, India.",
  keywords: [
    "conveyor belts",
    "idler rollers",
    "drum pulleys",
    "conveyor systems",
    "industrial manufacturer",
    "Panvel",
    "Maharashtra",
    "Make in India",
  ],
  authors: [{ name: "SAADAT INDUSTRIES" }],
  openGraph: {
    title: "SAADAT INDUSTRIES - Manufacturer of Conveyor System Components",
    description:
      "Leading manufacturer of idler rollers, drum pulleys, conveyor belts, and readymade conveyor systems.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <LayoutShell>{children}</LayoutShell>
        <ToasterProvider />
      </body>
    </html>
  );
}
