import React from "react";
import SearchBanner from "./components/SearchBanner";

type Props = {};

export default function page({}: Props) {
  return (
    <div className="flex flex-col gap-6">
      <SearchBanner
        title="Search client"
        placeholders={["Client name", "Phone number", "E-mail"]}
      />
      <SearchBanner
        title="Search customer"
        placeholders={["Customer name", "VAT number", "E-mail"]}
      />
    </div>
  );
}
