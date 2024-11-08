import React from "react";
import ChevronIcon from "@/app/components/ChevronIcon";

type Assignment = {
  name: string;
};

type Props = {
  title: string;
  linkText: string;
  count: number; // Count is passed dynamically
  assignments: Assignment[];
  onSeeAllClick: () => void;
};

export default function Item({
  title,
  linkText,
  count,
  assignments,
  onSeeAllClick,
}: Props) {
  return (
    <div className="col-span-1 w-full flex flex-col gap-2">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-sm whitespace-nowrap text-[#878484]">{title}</h2>
        {count > 2 && (
          <button
            onClick={onSeeAllClick}
            className="text-sm whitespace-nowrap text-[#04567D]"
          >
            {linkText} ({count})
          </button>
        )}
      </div>

      {/* Wrapper for assignments, showing different amounts based on screen size */}
      <div className="flex flex-col bg-[#F4F4F4] rounded-sm overflow-clip">
        {/* Show only one item on small screens, without bottom border for the last item */}
        {assignments.slice(0, 1).map((assignment, index) => (
          <React.Fragment key={`sm-${index}`}>
            <div
              className={`px-4 py-3 md:hidden flex items-center justify-between cursor-pointer hover:bg-black hover:bg-opacity-5 transition-all ${
                index < 1 - 1 ? "border-b border-[#EBEBEB]" : ""
              }`}
            >
              <span className="text-black text-sm whitespace-nowrap">
                {assignment.name}
              </span>
              <button className="w-4 h-4 aspect-square rounded-full flex items-center justify-center">
                <ChevronIcon width="16" height="16" className="-rotate-90" />
              </button>
            </div>
          </React.Fragment>
        ))}

        {/* Show up to two items on medium and larger screens, without bottom border for the last item */}
        {assignments.slice(0, 2).map((assignment, index) => (
          <React.Fragment key={`md-${index}`}>
            <div
              className={`px-4 py-3 hidden md:flex items-center justify-between cursor-pointer hover:bg-black hover:bg-opacity-5 transition-all ${
                index < Math.min(assignments.length, 2) - 1
                  ? "border-b border-[#EBEBEB]"
                  : ""
              }`}
            >
              <span className="text-black text-sm whitespace-nowrap">
                {assignment.name}
              </span>
              <button className="w-4 h-4 aspect-square rounded-full flex items-center justify-center">
                <ChevronIcon width="16" height="16" className="-rotate-90" />
              </button>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
