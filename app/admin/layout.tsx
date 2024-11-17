import type { Metadata } from "next";
import Navbar from "./Navbar";

import { Asap } from "next/font/google";

const asap = Asap({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "ADMIN | INVOICERY",
  description: "INVOICERY",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={`${asap.className} bg-[#FAFAFA] min-h-screen`}>
      <Navbar />
      {children}
    </main>
  );
}
