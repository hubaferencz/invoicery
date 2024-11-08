import React from "react";
import ChevronIcon from "@/app/components/ChevronIcon";

type Assignment = {
  name: string;
};

type Props = {
  title: string;
  assignments: Assignment[];
};

export default function PopupTable({ title, assignments }: Props) {
  return (
    <div className="flex flex-col items-start justify-start gap-4">
      <div className="block lg:hidden bg-white p-4 w-full">
      <h2
        className="leading-normal text-xl font-medium py-0.5"
        style={{ letterSpacing: "0.20px" }}
      >
        {title}
      </h2></div>

      <div className="bg-white max-w-[778px] p-4 lg:p-6 w-full mx-auto lg:mx-0 flex flex-col gap-6 lg:rounded-sm">
        <h2
          className="leading-normal text-xl font-medium py-0.5 hidden lg:block"
          style={{ letterSpacing: "0.20px" }}
        >
          {title}
        </h2>
        <div className="col-span-1 w-full flex flex-col gap-2">
          {/* Wrapper for assignments to display all items */}
          <div className="flex flex-col bg-[#F4F4F4] rounded-sm overflow-clip">
            {/* Display all items without slicing */}
            {assignments.map((assignment, index) => (
              <React.Fragment key={index}>
                <div
                  className={`px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-black hover:bg-opacity-5 transition-all ${
                    index < assignments.length - 1
                      ? "border-b border-[#EBEBEB]"
                      : ""
                  }`}
                >
                  <span className="text-black text-sm whitespace-nowrap">
                    {assignment.name}
                  </span>
                  <button className="w-4 h-4 aspect-square rounded-full flex items-center justify-center">
                    <ChevronIcon
                      width="16"
                      height="16"
                      className="-rotate-90"
                    />
                  </button>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
