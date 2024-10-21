import Link from "next/link";
import React from "react";
import { Asap } from "next/font/google";

const asap = Asap({ subsets: ["latin"] });

type Props = { link: string; text: string };

export default function HeroCta({ link, text }: Props) {
  return (
    <Link
      href={link}
      className={`${asap.className} antialiased bg-secondary-500 rounded-xl font-medium text-white w-full sm:w-min whitespace-nowrap shadow-[0px_2px_8px_0px_rgba(153,153,153,0.20)]`}
    >
      <div className="hover:bg-black hover:bg-opacity-10 rounded-xl px-6 py-[14px] transition-all duration-300">
        {text}
      </div>
    </Link>
  );
}
