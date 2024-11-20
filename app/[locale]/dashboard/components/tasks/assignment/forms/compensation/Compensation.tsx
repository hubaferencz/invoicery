// Compensation.tsx
import React, { useEffect, useState } from "react";
import Invoice from "./Invoice";
import Banner from "./Banner";

type Props = {
  compensation: {
    subtitle: string;
    instructions: string;
    fields: {
      amountLabel: string;
      salaryNote: string;
      currencies: {
        id: string;
        code: string;
        name: string;
        flag: {
          url: string;
          altText: string;
        };
      }[];
    };
  };
  setIsCompensationValid: (isValid: boolean) => void;
};

export default function Compensation({
  compensation,
  setIsCompensationValid,
}: Props) {
  const [value, setValue] = useState<number | null>(null);

  useEffect(() => {
    setIsCompensationValid(value !== null && !isNaN(value) && value > 0);
  }, [value, setIsCompensationValid]);

  const [selectedCurrency, setSelectedCurrency] = useState(
    compensation?.fields?.currencies[0]?.code || "eur"
  );

  const halfValue =
    value !== null
      ? (value / 2).toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : "0.00";

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <p
        className="text-sm font-normal text-black"
        style={{ letterSpacing: "0.16px" }}
      >
        {compensation?.instructions ||
          "Enter how much you will charge for the entire assignment. The billing is divided and invoiced monthly during the assignment period. Local VAT may be added to the invoice amount."}
      </p>
      <Invoice
        value={value}
        setValue={setValue}
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
        currencies={compensation?.fields?.currencies || []}
        amountLabel={compensation?.fields?.amountLabel || "Amount excl. VAT"}
      />
      <Banner
        value={halfValue}
        selectedCurrency={selectedCurrency}
        salaryNote={compensation?.fields?.salaryNote || ""}
      />
    </div>
  );
}
