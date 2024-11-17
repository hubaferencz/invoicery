import Image from "next/image";
import React from "react";
import Cta from "./Cta";

type SidebarItem = {
  id: number;
  label: string;
  
  subtitle: string;
  iconPath: string;
  altText: string;
};

type SidebarProps = {
  items: SidebarItem[];
  activeItemId: number;
  ctaText: string;
  title: string;
  scrollToForm: (index: number) => void;
};

export default function Sidebar({
  items,
  ctaText,
  title,
  activeItemId,
  scrollToForm,
}: SidebarProps) {
  return (
    <aside className="max-w-[330px] fixed h-min bg-white rounded w-full py-6 gap-6 flex flex-col items-start">
      <h2 className="font-medium text-base px-6 text-[#878484]">
        {title}
      </h2>
      <nav className="flex flex-col w-full gap-4">
        {items.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => scrollToForm(idx)}
            className={`flex items-center justify-start px-6 py-2 gap-4 transition-all duration-300 ease-in-out ${
              item.id === activeItemId
                ? "border-r-[6px] border-[#CECECE] "
                : "border-transparent"
            }`}
          >
            <div className="flex items-center justify-start px-3">
              <div className="flex items-center justify-start w-8 h-8">
                <Image
                  src={item.iconPath}
                  width={20}
                  height={20}
                  alt={item.altText || ""}
                />
              </div>
              <span className="font-medium">
                {item.id}. {item.label}
              </span>
            </div>
          </button>
        ))}
      </nav>
      <div className="w-full px-6">
        <Cta scrollToForm={scrollToForm} ctaText={ctaText} />
      </div>
    </aside>
  );
}
