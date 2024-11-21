import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <div className=" bg-primary-600 w-full max-h-16 h-full flex items-center justify-between px-6 py-4 gap-20">
      <Link href={"/en-US"} target="_blank">
        <Image src={"/logo.svg"} width={30} height={30} alt="logo" />
      </Link>
      <div className="flex items-center justify-center gap-6">
        <Link
          href={"/admin"}
          className="flex items-center justify-center w-10 h-10 rounded-lg bg-transparent hover:bg-primary-700"
        >
          <Image src={"/search.svg"} width={19} height={19} alt="logo" />
        </Link>
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-transparent hover:bg-primary-700">
          <Image src={"/leave.svg"} width={19} height={19} alt="logo" />
        </div>
      </div>
    </div>
  );
}
