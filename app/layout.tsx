import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IdeaHub",
  description: "The connected workspace where better, faster work happens.",
  icons: {
    icon:[
      {
        media: "(prefers-color-scheme:light)",
        url:"/notes.png",
        href:"/notes.png"
      },
      {
        media: "(prefers-color-scheme:dark)",
        url:"/notes.png",
        href:"/notes.png"
      },
    ]

  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}