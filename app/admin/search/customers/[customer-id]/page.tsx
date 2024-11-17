import Image from "next/image";
import Link from "next/link";
import React from "react";
import CustomerForms from "./CustomerForms";


export default function CustomerPage() {
  return (
    <div>
      <div className="flex whitespace-nowrap min-h-full gap-4 items-center p-2 md:p-6 justify-start bg-white border-b border-[#F2F2F2]">
        <Link
          href={""}
          className="flex items-center justify-center gap-1 select-none"
        >
          <Image src={"/back.svg"} width={20} height={20} alt="" />
          <h2 className="text-sm font-normal">Back</h2>
        </Link>
        <div className="w-[1px] h-7 bg-[#EBEBEB]"></div>
        <h2 className="text-base font-semibold text-[#808080]">Name Surname</h2>
      </div>
      <div className="p-2 md:p-6 flex flex-col gap-6 bg-white">
        <h2 className=" text-xl font-medium text-black">Customer 💼</h2>

        <CustomerForms />
      </div>

    </div>
  );
}
