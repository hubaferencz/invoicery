import React from "react";
import AddCustomer from "./AddCustomer";


type Props = {};

export default function Customer({}: Props) {
  return (
    <div className="w-full min-w-full bg-white">
      <AddCustomer />
    </div>
  );
}
