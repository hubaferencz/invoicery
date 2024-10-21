import Link from "next/link";
import React from "react";
import { Asap } from "next/font/google";

const asap = Asap({ subsets: ["latin"] });

type Props = { link: string; text: string };

export default function HeroCta({ link, text }: Props) {
  return (
    <Link
      href={link}
      className={`${asap.className} antialiased bg-secondary-500 px-8 py-4 rounded-xl font-medium text-white w-full sm:w-min whitespace-nowrap`}
    >
      {text}
    </Link>
  );
}
