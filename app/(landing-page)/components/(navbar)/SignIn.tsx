import Link from "next/link";
import React from "react";

type Props = {};

export default function SignIn({}: Props) {
  return (
    <Link
      href={"/sign-in"}
      aria-label="Sign in" // Improves screen reader accessibility
      className="antialiased border-[1.5px] text-center border-white rounded-xl font-medium text-white w-full sm:w-min whitespace-nowrap"
    >
      <button
        className="hover:bg-black hover:bg-opacity-10 rounded-xl px-6 py-[14px] transition-all duration-300"
        style={{ width: "100%" }} // Ensures full-width clickability inside Link
      >
        Sign in
      </button>
    </Link>
  );
}
