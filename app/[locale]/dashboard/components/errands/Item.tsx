// import React from "react";
// import ChevronIcon from "@/app/[locale]/components/ChevronIcon";

// type Assignment = {
//   name: string;
// };

// type Props = {
//   title: string;
//   linkText: string;
//   count: number; // Count is passed dynamically
//   assignments: Assignment[];
//   onSeeAllClick: () => void;
// };

// export default function Item({
//   title,
//   linkText,
//   count,
//   assignments,
//   onSeeAllClick,
// }: Props) {
//   return (
//     <div className="col-span-1 w-full flex flex-col gap-2">
//       <div className="flex items-center justify-between gap-4">
//         <h2 className="text-sm whitespace-nowrap font-medium text-[#878484]">{title}</h2>
//         {count > 2 && (
//           <button
//           type="button"
//             onClick={onSeeAllClick}
//             className="text-sm whitespace-nowrap text-[#04567D]"
//           >
//             {linkText} ({count})
//           </button>
//         )}
//       </div>

//       {/* Wrapper for assignments, showing different amounts based on screen size */}
//       <div className="flex flex-col bg-[#F4F4F4] rounded-sm overflow-clip">
//         {/* Show only one item on small screens, without bottom border for the last item */}
//         {assignments.slice(0, 1).map((assignment, index) => (
//           <React.Fragment key={`sm-${index}`}>
//             <div
//               className={`px-4 py-3 md:hidden flex items-center justify-between cursor-pointer hover:bg-black hover:bg-opacity-5 transition-all ${
//                 index < 1 - 1 ? "border-b border-[#EBEBEB]" : ""
//               }`}
//             >
//               <span className="text-black text-sm whitespace-nowrap">
//                 {assignment.name}
//               </span>
//               <button type="button" className="w-4 h-4 aspect-square rounded-full flex items-center justify-center">
//                 <ChevronIcon width="16" height="16" className="-rotate-90" />
//               </button>
//             </div>
//           </React.Fragment>
//         ))}

//         {/* Show up to two items on medium and larger screens, without bottom border for the last item */}
//         {assignments.slice(0, 2).map((assignment, index) => (
//           <React.Fragment key={`md-${index}`}>
//             <div
//               className={`px-4 py-3 hidden md:flex items-center justify-between cursor-pointer hover:bg-black hover:bg-opacity-5 transition-all ${
//                 index < Math.min(assignments.length, 2) - 1
//                   ? "border-b border-[#EBEBEB]"
//                   : ""
//               }`}
//             >
//               <span className="text-black text-sm whitespace-nowrap">
//                 {assignment.name}
//               </span>
//               <button type="button" className="w-4 h-4 aspect-square rounded-full flex items-center justify-center">
//                 <ChevronIcon width="16" height="16" className="-rotate-90" />
//               </button>
//             </div>
//           </React.Fragment>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import React from "react";
import ChevronIcon from "@/app/[locale]/components/ChevronIcon";

interface Props {
  title: string;
  linkText: string;
  count: number;
  assignments: any[];
  onSeeAllClick: () => void;
  onView: (documentId: string) => void;
}

export default function Item({
  title,
  linkText,
  count,
  assignments,
  onSeeAllClick,
  onView,
}: Props) {
  return (
    <div className="col-span-1 w-full flex flex-col gap-2">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-sm whitespace-nowrap font-medium text-[#878484]">
          {title}
        </h2>
        {count > 2 && (
          <button
            type="button"
            onClick={onSeeAllClick}
            className="text-sm whitespace-nowrap text-[#04567D]"
          >
            {linkText} ({count})
          </button>
        )}
      </div>

      <div className="flex flex-col bg-[#F4F4F4] rounded-sm overflow-clip">
        {assignments.slice(0, 2).map((assignment, index) => (
          <div
            key={assignment.id}
            className={`px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-black hover:bg-opacity-5 transition-all  ${
              index < assignments.length - 1 ? "border-b border-[#EBEBEB]" : ""
            }`}
            onClick={() => {
              onView(assignment.id);
              window.open(assignment.pdf_link, "_blank");
            }}
          >
            <span className="text-black text-sm whitespace-nowrap flex items-start justify-start gap-1">
              <span className="truncate max-w-48">
                {assignment.pdf_link.split("/").pop()}
              </span>
              {!assignment.is_viewed && (
                <div className="w-1.5 h-1.5 aspect-square bg-primary-500 bg-opacity-70 rounded-full"></div>
              )}
            </span>
            <button
              type="button"
              className="w-4 h-4 aspect-square rounded-full flex items-center justify-center"
            >
              <ChevronIcon width="16" height="16" className="-rotate-90" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
