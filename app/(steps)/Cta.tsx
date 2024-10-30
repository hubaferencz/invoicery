import Link from "next/link";
import React from "react";
import { Asap } from "next/font/google";

const asap = Asap({ subsets: ["latin"] });

type Props = { link: string; text: string };

export default function Cta({ link, text }: Props) {
  return (
    <Link
      href={link}
      className={`${asap.className} antialiased bg-secondary-500 rounded-xl font-bold mx-auto text-white w-min whitespace-nowrap`}
      style={{
        boxShadow: "0px 2px 8px 0px rgba(153, 153, 153, 0.20)",
        letterSpacing: "0.32px",
      }}
      role="button" // Ensures screen readers interpret this as a button
      aria-label={text} // Provides a clear, descriptive label for screen readers
    >
      <div className="hover:bg-black hover:bg-opacity-10 rounded-xl px-6 py-[14px] transition-all duration-300">
        {text}
      </div>
    </Link>
  );
}
