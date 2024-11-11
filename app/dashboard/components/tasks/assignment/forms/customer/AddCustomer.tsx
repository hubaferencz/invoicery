import ChevronIcon from "@/app/components/ChevronIcon";
import Image from "next/image";
import React from "react";

type Props = {};

export default function AddCustomer({}: Props) {
  return (
    <div className="bg-white lg:bg-[#F4F4F4] w-full min-w-full rounded p-4 lg:p-6 flex lg:flex-col items-center justify-between lg:justify-center gap-2 cursor-pointer">
      <Image
        src={"/assignment/CircularIcon.svg"}
        alt=""
        width={40}
        height={40}
        className="hidden w-10 h-10 rounded-full lg:block"
        style={{ boxShadow: "0px 2px 8px 0px rgba(153, 153, 153, 0.20)" }}
      />
      <span className=" text-sm lg:text-base lg:font-semibold lg:text-[#04567D]">
        Add customer
      </span>
      <ChevronIcon className="block -rotate-90 lg:hidden"/>
    </div>
  );
}
