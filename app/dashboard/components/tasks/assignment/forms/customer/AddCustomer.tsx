import Image from "next/image";
import React from "react";

type Props = {};

export default function AddCustomer({}: Props) {
  return (
    <div className="bg-[#F4F4F4] w-full min-w-full rounded p-6 flex flex-col items-center justify-center gap-2 cursor-pointer">
      <Image
        src={"/assignment/CircularIcon.svg"}
        alt=""
        width={40}
        height={40}
        className="w-10 h-10 rounded-full"
        style={{ boxShadow: "0px 2px 8px 0px rgba(153, 153, 153, 0.20)" }}
      />
      <span className="text-base font-semibold text-[#04567D]">
        Add customer
      </span>
    </div>
  );
}
