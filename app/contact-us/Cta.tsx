import Link from "next/link";
import React from "react";
import { Asap } from "next/font/google";

const asap = Asap({ subsets: ["latin"] });

type Props = { link: string; text: string };

export default function Cta({ link, text }: Props) {
  return (
    <Link
      href={link}
      className={`${asap.className} antialiased mx-auto bg-[#E7F3F8] rounded-xl font-medium text-[#04567D] text-center md:text-start w-min whitespace-nowrap`}
      style={{
        boxShadow: "0px 2px 8px 0px rgba(153, 153, 153, 0.20)",
        letterSpacing: "0.32px",
      }}
    >
      <div className="hover:bg-black hover:bg-opacity-10 rounded-xl px-6 py-[14px] transition-all duration-300">
        {text}
      </div>
    </Link>
  );
}
