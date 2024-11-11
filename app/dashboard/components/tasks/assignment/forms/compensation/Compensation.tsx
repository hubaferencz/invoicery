import React, { useState } from "react";
import Invoice from "./Invoice";
import Banner from "./Banner";

type Props = {};

export default function Compensation({}: Props) {
  const [value, setValue] = useState("");

  // Calculate half of the value, defaulting to "0.00" if value is empty
  const halfValue = value
    ? (parseFloat(value.replace(/,/g, "")) / 2).toLocaleString("en-US", {
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
        Enter how much you will charge for the entire assignment. The billing is
        divided and invoiced monthly during the assignment period. Local VAT may
        be added to the invoice amount.
      </p>
      <Invoice value={value} setValue={setValue} />
      <Banner value={halfValue} /> {/* Pass halfValue to Banner */}
    </div>
  );
}
