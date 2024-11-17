"use client";

import { useState } from "react";

type Props = {
  title: string;
  placeholders: [string, string, string]; // Tuple for exactly 3 placeholders
};

export default function SearchBanner({ title, placeholders }: Props) {
  const [inputs, setInputs] = useState<[string, string, string]>(["", "", ""]);

  const handleInputChange = (index: number, value: string) => {
    setInputs((prev) => {
      const updated = [...prev] as [string, string, string];
      updated[index] = value;
      return updated;
    });
  };

  // Check if at least one input field has text
  const isAnyInputFilled = inputs.some((input) => input.trim() !== "");

  return (
    <div className="flex flex-col items-start justify-start w-full gap-4 p-6 bg-white border-b border-[#F2F2F2]">
      <h2 className="text-base font-semibold ">{title}</h2>
      <div className="flex items-center justify-between w-full grid-cols-4 gap-6 bg-white">
        {placeholders.map((placeholder, index) => (
          <input
            key={index}
            placeholder={placeholder}
            value={inputs[index]}
            onChange={(e) => handleInputChange(index, e.target.value)}
            className="w-full col-span-1 border rounded border-[#E3E3E3] bg-[#F4F4F4] placeholder:text-[#5E5C5C] px-4 py-3.5 text-sm focus:outline-none"
          />
        ))}
        <button
          disabled={!isAnyInputFilled}
          className={`w-full col-span-1 transition-all border rounded text-sm border-primary-600 bg-primary-600 text-white font-bold px-4 py-3.5 ${
            isAnyInputFilled
              ? ""
              : "opacity-40"
          }`}
        >
          Search
        </button>
      </div>
    </div>
  );
}
