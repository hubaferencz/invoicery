import type { Metadata } from "next";
import "./globals.css";

import { Inter } from "next/font/google";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";


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
        {children}
        <Footer />
      </body>
    </html>
  );
}
