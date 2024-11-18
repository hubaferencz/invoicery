import type { Metadata } from "next";

import { Asap } from "next/font/google";

const asap = Asap({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "INVOICERY",
  description: " ",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className={`${asap.className} antialiased`}>{children}</main>;
}
