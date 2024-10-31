import Image from "next/image";
import React from "react";

type Props = {};

export default function RegisterAssignment({}: Props) {
  return (
    <div className="w-full select-none cursor-pointer  border border-[#FFEBD5] hover:border-[#FF8800] hover:border-opacity-30 transition-all p-5 h-24 hidden md:flex rounded-[9px] items-center justify-start bg-[#FFEBD5]">
      <div className="items-center justify-start gap-4 flex">
        <div className=" w-10 h-10 rounded-full bg-[#FF8800] flex items-center justify-center">
          <Image src={"/icons/write.svg"} width={20} height={20} alt="check" />
        </div>
        <div className="flex flex-col items-start justify-center gap-1">
          <h2
            className="leading-normal text-xl font-medium"
            style={{ letterSpacing: "0.20px" }}
          >
            Register assignment
          </h2>
        </div>
      </div>
    </div>
  );
}
