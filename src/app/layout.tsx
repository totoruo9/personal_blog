import type { Metadata } from "next";
import { Geist, Geist_Mono, Nanum_Gothic, Song_Myung, Nanum_Myeongjo } from "next/font/google"; // 1. Import new fonts
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Configure Korean Fonts
const nanumGothic = Nanum_Gothic({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
  variable: "--font-nanum-gothic",
  display: "swap",
});

const songMyung = Song_Myung({
  weight: ["400"], // Song Myung usually has limited weights (regular)
  subsets: ["latin"],
  variable: "--font-song-myung",
  display: "swap",
});

const nanumMyeongjo = Nanum_Myeongjo({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
  variable: "--font-nanum-myeongjo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TheManageGram",
  description: "Revenue Blog & Design System",
};

import { Providers } from "./providers"; // Add import

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${nanumGothic.variable} ${songMyung.variable} ${nanumMyeongjo.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
