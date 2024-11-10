import React from "react";

type BannerProps = {
  value: string;
};

export default function Banner({ value }: BannerProps) {
  return (
    <div className="p-4 rounded bg-[#E2FAF1] text-[#3A7663] flex justify-between items-center">
      <div className="w-full">
        <p>Preliminary salary for the entire assignment</p>
        <p>(Varies depending on local tax rules)</p>
      </div>
      <div className="text-lg font-semibold w-min whitespace-nowrap">
        EURO {value || "0.00"}
      </div>
    </div>
  );
}
