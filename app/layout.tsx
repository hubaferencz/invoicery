import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Hero from "./(hero)/Hero";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "INVOICERY",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Navbar />
        <Hero />
        {children}
      </body>
    </html>
  );
}
