import { Nav } from "@/components/nav";
import { TooltipProvider } from "@/components/ui/tooltip";
import { OnchainProvider } from "@/providers/onchain";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alexandria.gg",
  description: "Alexandria.gg - Microlearning for the masses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Toaster />
          <TooltipProvider>
            <OnchainProvider>
              <Nav />
              {children}
            </OnchainProvider>
          </TooltipProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
