import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const zodiak = localFont({
  // src: "../assets/fonts/Zodiak-Variable.ttf",
  src: "../assets/fonts/Sentient-Variable.ttf",
  display: "swap",
  variable: "--font-zodiak",
});

export const metadata: Metadata = {
  title: "Joshua Knauber",
  description: "Portfolio for Joshua Knauber",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${GeistSans.className} ${zodiak.variable}`}>
        {children}
      </body>
    </html>
  );
}
