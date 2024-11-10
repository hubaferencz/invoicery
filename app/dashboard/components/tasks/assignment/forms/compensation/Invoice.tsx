import ChevronIcon from "@/app/components/ChevronIcon";
import Image from "next/image";
import React from "react";

type InvoiceProps = {
  value: string;
  setValue: (value: string) => void;
};

export default function Invoice({ value, setValue }: InvoiceProps) {
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
    <div className="bg-[#04567D] p-6 rounded text-white w-full grid grid-cols-2 items-center justify-center">
      <div className="flex flex-col gap-1">
        <label htmlFor="">Invoice amount excl. VAT</label>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          className="border-b border-[#EBEBEB] bg-transparent placeholder:text-[#EBEBEB] focus:outline-none text-[32px] font-bold"
          placeholder="0.00"
          style={{ letterSpacing: "0.64px" }}
        />
      </div>
      <div className="flex items-center justify-end">
        <div className="flex items-center gap-2 p-2 bg-white rounded-full">
          <Image width={20} height={20} alt="" className="rounded-full" src={"/flags/eur.svg"} />
          <span className="text-sm text-black uppercase">Euro</span>
          <ChevronIcon />
        </div>
      </div>
    </div>
  );
}
