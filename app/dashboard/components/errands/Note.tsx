import Image from "next/image";
import React from "react";

type Props = {};

export default function Note({}: Props) {
  return (
    <div className="w-full select-none cursor-pointer  border border-[#CBE3EF] p-3 flex rounded-[9px] items-center justify-start bg-[#EEF5F8]">
      <div className="items-start justify-start gap-3 flex">
        <Image src={"/icons/info.svg"} width={20} height={20} alt="info" />

        <div className="flex flex-col items-start justify-center gap-1">
          <h3
            className=" text-sm font-semibold"
            style={{ letterSpacing: "0.14px" }}
          >
            You have no current cases
          </h3>
          <p
            className=" text-xs leading-normal"
            style={{ letterSpacing: "0.12px" }}
          >
            When we have approved your assignment and verified you, assignments,
            employment contracts, invoices and salaries will be displayed here.
          </p>
        </div>
      </div>
    </div>
  );
}
