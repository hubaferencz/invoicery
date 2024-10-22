import Link from "next/link";
import React from "react";

type Props = {};

export default function SignIn({}: Props) {
  return (
    <Link
      href={"/sign-in"}
      className={` antialiased border-[1.5px] text-center border-white rounded-xl font-medium text-white w-full whitespace-nowrap`}
    >
      <div className="hover:bg-black hover:bg-opacity-10 rounded-xl px-6 py-[14px] transition-all duration-300">
        Sign in
      </div>
    </Link>
  );
}
