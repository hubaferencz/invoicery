"use client";

import Link from "next/link";
import { useState, useRef } from "react";

type Props = {
  title: string;
  link: string;
  placeholders: [string, string, string]; // Tuple for exactly 3 placeholders
};

export default function SearchBanner({ title, placeholders, link }: Props) {
  const [inputs, setInputs] = useState<[string, string, string]>(["", "", ""]);
  const [focusedInputs, setFocusedInputs] = useState<
    [boolean, boolean, boolean]
  >([false, false, false]);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleInputChange = (index: number, value: string) => {
    setInputs((prev) => {
      const updated = [...prev] as [string, string, string];
      updated[index] = value;
      return updated;
    });
  };

  const handleInputFocus = (index: number, isFocused: boolean) => {
    setFocusedInputs((prev) => {
      const updated = [...prev] as [boolean, boolean, boolean];
      updated[index] = isFocused;
      return updated;
    });
  };

  // Check if at least one input field has text
  const isAnyInputFilled = inputs.some((input) => input.trim() !== "");

  return (
    <div className="flex flex-col items-start justify-start w-full gap-4 p-6 bg-white border-b border-[#F2F2F2]">
      <h2 className="text-base font-semibold">{title}</h2>
      <div className="flex items-center justify-between w-full gap-6 bg-white">
        {placeholders.map((placeholder, index) => {
          const isActive = focusedInputs[index] || inputs[index] !== "";

          return (
            <div
              key={index}
              className="relative w-full outline-none focus:outline-none"
              onClick={() => inputRefs[index].current?.focus()}
            >
              <label
                className={`absolute left-4 transition-all pointer-events-none ${
                  isActive
                    ? "top-2 text-[10px] text-primary-600"
                    : "top-4 text-sm text-[#5E5C5C]"
                }`}
              >
                {placeholder}
              </label>
              <input
                ref={inputRefs[index]}
                value={inputs[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onFocus={() => handleInputFocus(index, true)}
                onBlur={() => handleInputFocus(index, false)}
                className={`w-full border rounded border-[#E3E3E3] bg-[#F4F4F4] placeholder-transparent px-4 text-sm outline-none focus:outline-none transition-all ${
                  isActive ? "pt-5 pb-2" : "py-3.5"
                }`}
              />
            </div>
          );
        })}
        <Link
          // disabled={!isAnyInputFilled}
          href={isAnyInputFilled ? "/admin/search/" + link : ""}
          className={`w-full transition-all border rounded text-sm border-primary-600 bg-primary-600 text-white font-bold px-4 py-3.5 ${
            isAnyInputFilled ? "" : "opacity-40"
          }`}
        >
          Search
        </Link>
      </div>
    </div>
  );
}
