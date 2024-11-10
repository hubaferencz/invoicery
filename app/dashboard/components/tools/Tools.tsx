import React, { useState } from "react";
import Image from "next/image";
import ChevronIcon from "@/app/components/ChevronIcon";
import ToolPopup from "./ToolPopup";
import { AnimatePresence } from "framer-motion"; // Import AnimatePresence

type Tool = {
  icon: string;
  title: string;
  description: string;
};

const toolsData: Tool[] = [
  {
    icon: "/icons/car.svg",
    title: "Apply for mileage compensation",
    description:
      "Enter how much mileage compensation you are seeking and for which assignment. We handle the application and contact you by email if possible. questions and notices.",
  },
  {
    icon: "/icons/wallet-circle.svg",
    title: "Apply for a deduction",
    description:
      "State what you wish to deduct for and within which assignment. We handle the application and contact you by email if possible. questions and notices.",
  },
];

export default function Tools() {
  const [activeTool, setActiveTool] = useState<Tool | null>(null);

  const handleOpenPopup = (tool: Tool) => setActiveTool(tool);

  const handleClosePopup = () => {
    // Delay unmounting to allow exit animation to play
    setTimeout(() => {
      setActiveTool(null);
    }, 200); // Match this duration with the exit animation duration
  };

  return (
    <div className="bg-white h-min p-6 max-w-[778px] w-full flex flex-col gap-6 rounded-sm relative mx-auto lg:mx-0">
      <div className="gap-2 flex flex-col">
        <h2
          className="leading-normal text-xl font-medium py-0.5"
          style={{ letterSpacing: "0.20px" }}
        >
          Expenses
        </h2>
        <p className="leading-snug text-sm">
          Apply for expenses done every month etc. Landspecifika regler gäller.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {toolsData.map((tool) => (
          <div
            key={tool.title}
            className="bg-[#F4F4F4] rounded-sm overflow-clip"
          >
            <div
              className="px-4 py-3 flex items-center gap-4 justify-between cursor-pointer rounded-sm hover:bg-black hover:bg-opacity-5 transition-all"
              onClick={() => handleOpenPopup(tool)}
            >
              <Image width={40} height={40} alt="icon" src={tool.icon} />
              <div className="flex w-full justify-between items-center">
                <span className="text-black text-sm text-start">
                  {tool.title}
                </span>
                <button className="w-4 h-4 aspect-square rounded-full flex items-center justify-center">
                  <ChevronIcon width="16" height="16" className="-rotate-90" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Wrap ToolPopup with AnimatePresence */}
      <AnimatePresence>
        {activeTool && (
          <ToolPopup
            key="tool-popup" // Add a key for AnimatePresence to track
            title={activeTool.title}
            description={activeTool.description}
            onClose={handleClosePopup}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
