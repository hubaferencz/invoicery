import Image from "next/image";
import React from "react";

type Props = {};

export default function VerifyYourself({}: Props) {
  return (
    <div className="w-full px-3 py-4 border border-[#F2F2F2] hover:border-[#d4d4d4] transition-all select-none cursor-pointer h-24 flex rounded-[9px] items-center justify-between bg-[#F2F2F2]">
      <div className="items-center justify-start gap-4 flex">
        <div className=" w-10 h-10 rounded-full bg-[#4E8A77] flex items-center justify-center">
          <Image src={"/icons/check.svg"} width={20} height={20} alt="check" />
        </div>
        <div className="flex flex-col items-start justify-center gap-1">
          <h2
            className="leading-normal font-semibold"
            style={{ letterSpacing: "0.16px" }}
          >
            Verify yourself
          </h2>
          <p
            className="font-normal leading-normal text-xs text-[#5E5C5C]"
            style={{ letterSpacing: "0.12px" }}
          >
            We need more information about you.
          </p>
        </div>
      </div>
      <div className=" w-10 h-10 flex items-center justify-center">
        <Image src={"/icons/right.svg"} width={20} height={20} alt="check" />
      </div>
    </div>
  );
}
