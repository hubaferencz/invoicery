"use client";
import Image from "next/image";
import React from "react";

type Props = {};

export default function Search({}: Props) {
  return (
    <form
      onClick={(e) => e.currentTarget.querySelector("input")!.focus()}
      className="flex items-center border rounded-xl text-black p-4 bg-white w-full justify-start gap-2"
    >
      <Image src={"/icons/search.svg"} width={20} height={20} alt="search" />
      <input
        type="text"
        placeholder="Search"
        className="flex-1 border-none outline-none font-medium placeholder:font-semibold placeholder:text-[#878484] text-lg"
      />
    </form>
  );
}
