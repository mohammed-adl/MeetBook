import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { UserInitializer } from "@/components/UserInitializer";
import SplashWrapper from "@/components/SplashWrapper";
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
  title: "Meet Book",
  description: "Book, Meet, and Chat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SplashWrapper>
          <UserInitializer>{children}</UserInitializer>
        </SplashWrapper>
      </body>
    </html>
  );
}
