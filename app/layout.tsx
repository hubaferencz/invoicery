import type { Metadata } from "next";
import "./globals.css";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "INVOICERY",
  description: "INVOICERY",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased  bg-primary-800`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
