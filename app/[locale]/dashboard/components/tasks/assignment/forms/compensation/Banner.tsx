import React from "react";

type BannerProps = {
  value: string;
  selectedCurrency: string; // Added prop
};

export default function Banner({ value, selectedCurrency }: BannerProps) {
  const currencies = [
    { code: "eur", name: "Euro" },
    { code: "usd", name: "USD" },
    { code: "sek", name: "SEK" },
    { code: "dkk", name: "DKK" },
    { code: "nok", name: "NOK" },
  ];

  const currencyName =
    currencies.find((c) => c.code === selectedCurrency)?.name || "Euro";

  return (
    <div className="p-4 rounded bg-[#E2FAF1] text-[#3A7663] flex justify-between items-center">
      <div className="w-full">
        <p>Preliminary salary for the entire assignment</p>
        <p>(Varies depending on local tax rules)</p>
      </div>
      <div className="text-lg font-semibold w-min whitespace-nowrap">
        {currencyName} {value || "0.00"}
      </div>
    </div>
  );
}
