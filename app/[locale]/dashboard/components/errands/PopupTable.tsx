// import React from "react";
// import ChevronIcon from "@/app/[locale]/components/ChevronIcon";

// type Assignment = {
//   name: string;
// };

// type Props = {
//   title: string;
//   assignments: Assignment[];
// };

// export default function PopupTable({ title, assignments }: Props) {
//   return (
//     <div className="flex flex-col items-start justify-start gap-4">
//       <div className="block lg:hidden bg-white p-4 w-full">
//       <h2
//         className="leading-normal text-xl font-medium py-0.5"
//         style={{ letterSpacing: "0.20px" }}
//       >
//         {title}
//       </h2></div>

//       <div className="bg-white max-w-[778px] p-4 lg:p-6 w-full mx-auto lg:mx-0 flex flex-col gap-6 lg:rounded-sm">
//         <h2
//           className="leading-normal text-xl font-medium py-0.5 hidden lg:block"
//           style={{ letterSpacing: "0.20px" }}
//         >
//           {title}
//         </h2>
//         <div className="col-span-1 w-full flex flex-col gap-2">
//           {/* Wrapper for assignments to display all items */}
//           <div className="flex flex-col bg-[#F4F4F4] rounded-sm overflow-clip">
//             {/* Display all items without slicing */}
//             {assignments.map((assignment, index) => (
//               <React.Fragment key={index}>
//                 <div
//                   className={`px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-black hover:bg-opacity-5 transition-all ${
//                     index < assignments.length - 1
//                       ? "border-b border-[#EBEBEB]"
//                       : ""
//                   }`}
//                 >
//                   <span className="text-black text-sm whitespace-nowrap">
//                     {assignment.name}
//                   </span>
//                   <button type="button" className="w-4 h-4 aspect-square rounded-full flex items-center justify-center">
//                     <ChevronIcon
//                       width="16"
//                       height="16"
//                       className="-rotate-90"
//                     />
//                   </button>
//                 </div>
//               </React.Fragment>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React from "react";
import ChevronIcon from "@/app/[locale]/components/ChevronIcon";

interface Props {
  title: string;
  assignments: any[];
  onView: (documentId: string) => void; // Callback for marking as viewed
}

export default function PopupTable({ title, assignments, onView }: Props) {
  const handleItemClick = (assignment: any) => {
    // Open the PDF in a new tab
    window.open(assignment.pdf_link, "_blank");

    // Mark as viewed if not already viewed
    if (!assignment.is_viewed) {
      onView(assignment.id);
    }
  };

  return (
    <div className="flex flex-col items-start justify-start gap-4">
      <div className="block lg:hidden bg-white p-4 w-full">
        <h2
          className="leading-normal text-xl font-medium py-0.5"
          style={{ letterSpacing: "0.20px" }}
        >
          {title}
        </h2>
      </div>

      <div className="bg-white max-w-[778px] p-4 lg:p-6 w-full mx-auto lg:mx-0 flex flex-col gap-6 lg:rounded-sm">
        <h2
          className="leading-normal text-xl font-medium py-0.5 hidden lg:block"
          style={{ letterSpacing: "0.20px" }}
        >
          {title}
        </h2>
        <div className="col-span-1 w-full flex flex-col gap-2">
          <div className="flex flex-col bg-[#F4F4F4] rounded-sm overflow-clip">
            {assignments.map((assignment, index) => (
              <div
                key={assignment.id}
                className={`px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-black hover:bg-opacity-5 transition-all  ${
                  index < assignments.length - 1
                    ? "border-b border-[#EBEBEB]"
                    : ""
                }`}
                onClick={() => handleItemClick(assignment)}
              >
                <span className="text-black text-sm whitespace-nowrap flex items-start justify-start gap-1">
                  {assignment.pdf_link.split("/").pop()}
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
      </div>
    </div>
  );
}
