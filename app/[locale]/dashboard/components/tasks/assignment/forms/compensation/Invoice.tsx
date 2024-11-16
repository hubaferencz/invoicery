import React from "react";
import Currency from "./Currency";

type InvoiceProps = {
  value: string;
  setValue: (value: string) => void;
  selectedCurrency: string;
  setSelectedCurrency: (currency: string) => void;
  currencies: {
    id: string;
    code: string;
    name: string;
    flag: {
      url: string;
      altText: string;
    };
  }[];
  amountLabel: string;

};

export default function Invoice({
  value,
  setValue,
  selectedCurrency,
  setSelectedCurrency,
  currencies,
  amountLabel,

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
        <label htmlFor="amount" className="text-sm md:text-base">
          {amountLabel}
        </label>
        <input
          id="amount"
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
        currencies={currencies}
      />
    </div>
  );
}
