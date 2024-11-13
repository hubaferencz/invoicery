import React from "react";
import Currency from "./Currency";

type InvoiceProps = {
  value: string;
  setValue: (value: string) => void;
  selectedCurrency: string; // Added prop
  setSelectedCurrency: (currency: string) => void; // Added prop
};

export default function Invoice({
  value,
  setValue,
  selectedCurrency,
  setSelectedCurrency,
}: InvoiceProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, ""); // Remove non-digit characters

    if (input === "") {
      setValue("");
      return;
    }

    const numberValue = parseFloat(input) / 100;
    const formattedValue = numberValue.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    setValue(formattedValue); // Update lifted state in Compensation
  };

  return (
    <div className="bg-[#04567D] p-4 md:p-6 rounded text-white w-full grid grid-cols-2 items-center justify-center">
      <div className="flex flex-col gap-1">
        <label htmlFor="" className=" text-sm md:text-base">
          Amount excl. VAT
        </label>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          className="border-b border-[#EBEBEB] bg-transparent placeholder:text-[#EBEBEB] focus:outline-none text-[32px] font-bold"
          placeholder="0.00"
          style={{ letterSpacing: "0.64px" }}
        />
      </div>
      <Currency
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
      />
    </div>
  );
}
