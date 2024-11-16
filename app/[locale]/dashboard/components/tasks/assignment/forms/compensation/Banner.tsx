import React from "react";

type BannerProps = {
  value: string;
  selectedCurrency: string;
  salaryNote: string;
};

export default function Banner({
  value,
  selectedCurrency,
  salaryNote,
}: BannerProps) {
  return (
    <div className="p-4 rounded bg-[#E2FAF1] text-[#3A7663] flex justify-between items-center gap-10">
      <div className="w-full">
        <p>{salaryNote}</p>
      </div>
      <div className="text-lg font-semibold w-min whitespace-nowrap">
        {selectedCurrency.toUpperCase()} {value || "0.00"}
      </div>
    </div>
  );
}
