import React from "react";

type Props = {};

export default function Description({}: Props) {
  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <p
        className="text-sm font-normal leading-normal text-black"
        style={{ letterSpacing: "0.16px" }}
      >
        Enter how much you will charge for the entire assignment. The billing is
        divided and invoiced monthly during the assignment period. Local VAT may
        be added to the invoice amount.
      </p>
      <textarea
        className="w-full min-h-32 p-3 border border-[#EFEFEF] rounded resize-none focus:outline-none text-xs placeholder:text-xs"
        placeholder="Describe your work..."
        minLength={5}
        maxLength={500}
        //   value={textareaValue}
        //   onChange={(e) => setTextareaValue(e.target.value)}
      />
    </div>
  );
}
