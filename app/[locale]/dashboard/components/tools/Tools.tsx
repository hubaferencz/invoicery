import React, { useState } from "react";
import Image from "next/image";
import ChevronIcon from "@/app/[locale]/components/ChevronIcon";
import ToolPopup from "./ToolPopup";
import { AnimatePresence } from "framer-motion";

interface ToolsProps {
  title: string;
  closeText: string;
  subtitle: string;
  items: {
    id: string;
    emailToSendTo: string;
    title: string;
    description: string;
    icon: {
      src: string;
      alt: string;
    };
    inputPlaceholder: string;
    ctaText: string;
  }[];
}

export default function Tools({
  title,
  closeText,
  subtitle,
  items,
}: ToolsProps) {
  const [activeTool, setActiveTool] = useState<null | {
    title: string;
    description: string;
    inputPlaceholder: string;
    ctaText: string;
  }>(null);

  const handleOpenPopup = (tool: {
    title: string;
    description: string;
    inputPlaceholder: string;
    ctaText: string;
  }) => setActiveTool(tool);

  const handleClosePopup = () => {
    setTimeout(() => {
      setActiveTool(null);
    }, 200);
  };

  return (
    <div className="bg-white h-min p-6 max-w-[778px] w-full flex flex-col gap-6 rounded-sm relative mx-auto lg:mx-0">
      <div className="gap-2 flex flex-col">
        <h2
          className="leading-normal text-xl font-medium py-0.5"
          style={{ letterSpacing: "0.20px" }}
        >
          {title}
        </h2>
        <p className="leading-snug text-sm">{subtitle}</p>
      </div>

      <div className="flex flex-col gap-4">
        {items.map((tool) => (
          <div key={tool.id} className="bg-[#F4F4F4] rounded-sm overflow-clip">
            <div
              className="px-4 py-3 flex items-center gap-4 justify-between cursor-pointer rounded-sm hover:bg-black hover:bg-opacity-5 transition-all"
              onClick={() =>
                handleOpenPopup({
                  title: tool.title,
                  description: tool.description,
                  inputPlaceholder: tool.inputPlaceholder,
                  ctaText: tool.ctaText,
                })
              }
            >
              <Image
                width={40}
                height={40}
                alt={tool.icon.alt}
                src={tool.icon.src}
              />
              <div className="flex w-full justify-between items-center">
                <span className="text-black text-sm text-start">
                  {tool.title}
                </span>
                <button
                  type="button"
                  className="w-4 h-4 aspect-square rounded-full flex items-center justify-center"
                >
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
            key="tool-popup"
            title={activeTool.title}
            description={activeTool.description}
            placeholder={activeTool.inputPlaceholder}
            ctaText={activeTool.ctaText}
            closeText={closeText}
            emailToSendTo={
              items.find((item) => item.title === activeTool.title)
                ?.emailToSendTo || ""
            }
            onClose={handleClosePopup}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
