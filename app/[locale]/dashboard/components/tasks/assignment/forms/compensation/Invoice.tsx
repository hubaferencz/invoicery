// Invoice.tsx
import React, { useEffect, useState } from "react";
import Currency from "./Currency";

type InvoiceProps = {
  value: number | null;
  setValue: (value: number | null) => void;
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
  const [inputValue, setInputValue] = useState<string>("");

  // Update inputValue when value changes (e.g., when formatting)
  useEffect(() => {
    if (value !== null && !isNaN(value)) {
      setInputValue(value.toString());
    } else {
      setInputValue("");
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    // Allow only numbers and at most one dot
    if (/^\d*\.?\d*$/.test(input)) {
      setInputValue(input);

      const numberValue = parseFloat(input);
      if (!isNaN(numberValue)) {
        setValue(numberValue);
      } else {
        setValue(null);
      }
    }
    // If input doesn't match the pattern, do not update state (ignore invalid characters)
  };

  const handleBlur = () => {
    if (value !== null && !isNaN(value)) {
      const formattedValue = value.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      setInputValue(formattedValue);
    }
  };

  const handleFocus = () => {
    if (value !== null && !isNaN(value)) {
      setInputValue(value.toString());
    }
  };

  return (
    <div className="bg-[#04567D] p-4 md:p-6 rounded text-white w-full grid grid-cols-2 items-center justify-center">
      <div className="flex flex-col gap-1">
        <label htmlFor="amount" className="text-sm md:text-base">
          {amountLabel}
        </label>
        <input
          id="amount"
          name="amount"
          type="text"
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
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
