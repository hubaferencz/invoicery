import Link from "next/link";
import React from "react";
import { Asap } from "next/font/google";

const asap = Asap({ subsets: ["latin"] });

type Props = { link: string; text: string };

export default function Cta({ link, text }: Props) {
  return (
    <Link
      href={link}
      aria-label={text}
      className={`${asap.className} antialiased bg-[#04567D] rounded-xl font-medium text-white w-full text-center md:text-start md:w-min whitespace-nowrap shadow-md hover:shadow-lg transition-shadow duration-300`}
    >
      <div
        className="rounded-xl px-6 py-[14px] transition-colors duration-300 hover:bg-black hover:bg-opacity-10 focus:bg-black focus:bg-opacity-10"
        style={{
          letterSpacing: "0.32px",
        }}
      >
        {text}
      </div>
    </Link>
  );
}
