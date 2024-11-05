import ChevronIcon from "@/app/components/ChevronIcon";
import Image from "next/image";
import React from "react";

type Assignment = {
  name: string;
};

type Props = {
  title: string;
  linkText: string;
  count: number;
  assignments: Assignment[];
};

export default function Item({ title, linkText, count, assignments }: Props) {
  return (
    <div className="col-span-1 w-full flex flex-col gap-2">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-sm whitespace-nowrap text-[#878484]">{title}</h2>
        <h2 className="text-sm whitespace-nowrap text-[#04567D]">
          {linkText} ( {count} )
        </h2>
      </div>
      <div className="flex flex-col bg-[#F4F4F4] rounded-sm overflow-clip">
        {assignments.map((assignment, index) => (
          <React.Fragment key={index}>
            <div className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-black hover:bg-opacity-5 transition-all">
              <span className="text-black text-sm whitespace-nowrap">{assignment.name}</span>
              <button
                className={`w-4 h-4 aspect-square rounded-full flex items-center justify-center `}
              >
                
                <ChevronIcon width="16" height="16" className="-rotate-90"/>
              </button>
            </div>
            {index < assignments.length - 1 && (
              <div className="border-b border-[#EBEBEB] w-full"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
