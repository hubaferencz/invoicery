import React from "react";
import SearchBanner from "../components/SearchBanner";
import Link from "next/link";

type Props = {};

export default function CustomersPage({}: Props) {
  return (
    <div className="flex flex-col w-full h-screen">
      <SearchBanner placeholders={["Customer name", "VAT number", "E-mail"]} />
      <div className="flex flex-col w-full flex-1 overflow-y-scroll">
        {/* Header */}
        <div className="flex w-full bg-white border-b border-[#F2F2F2] p-6">
          <h2 className="text-[#808080] font-semibold text-base">
            4 results were found for "Name Surname"
          </h2>
        </div>
        {/* List */}
        <ul className="flex flex-col gap-2 ">
          {/* List items */}
          <li className="p-6 flex items-center justify-between gap-6 bg-white">
            <div className="flex items-center gap-6">
              <div className="text-sm rounded-full text-black font-medium border-[#E3E3E3] border w-7 h-7 flex items-center justify-center">
                <span>1</span>
              </div>
              <span className="text-sm text-[#808080] font-medium">
                Name Surname
              </span>
              <div className="w-px h-12 bg-[#EBEBEB]"></div>
            </div>
            <Link
              href={"/admin/search/customers/customer"}
              className="h-full rounded hover:bg-neutral-100 transition-all text-black border border-[#808080] px-6 flex items-center justify-center"
            >
              <span>Open customer</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
