import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/themes-providers";
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import { ModelProvider } from "@/components/providers/model-provider";

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
    <html lang="en" suppressContentEditableWarning>
      <body className={inter.className}>
        <ConvexClientProvider>
        <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        storageKey="jotion-theme-2"
        >
          <ModelProvider/>
          {children}</ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}