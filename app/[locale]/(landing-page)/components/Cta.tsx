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
      className={`${asap.className} antialiased transition-all bg-secondary-500 rounded-xl font-medium text-white w-min whitespace-nowrap shadow-md duration-300 hover:shadow-lg focus:shadow-lg`}
      style={{
        letterSpacing: "0.32px",
      }}
    >
      <div className="hover:bg-black hover:bg-opacity-10 focus:bg-black focus:bg-opacity-10 rounded-xl px-6 py-[14px] transition-all">
        {text}
      </div>
    </Link>
  );
}
