"use client";
import Image from "next/image";
import React, { useState, ChangeEvent } from "react";

type SearchProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  clearSearch: () => void;
};

export default function Search({
  searchTerm,
  setSearchTerm,
  clearSearch,
}: SearchProps) {
  return (
    <form
      onClick={(e) => e.currentTarget.querySelector("input")!.focus()}
      className="flex items-center border rounded-xl text-black p-4 bg-white w-full justify-start gap-2"
    >
      <Image src={"/icons/search.svg"} width={20} height={20} alt="search" />
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchTerm(e.target.value)
        }
        className="flex-1 border-none outline-none font-medium placeholder:font-semibold placeholder:text-[#878484] text-lg"
      />
      {searchTerm && (
        <div className=" rounded-full bg-[#04567D] p-1">
        <Image
          src={"/icons/x.svg"}
          width={20}
          height={20}
          alt="clear search"
          className="cursor-pointer invert"
          onClick={clearSearch} // Use clearSearch function directly
        /></div>
      )}
    </form>
  );
}
