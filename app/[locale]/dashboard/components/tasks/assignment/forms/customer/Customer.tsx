import React from "react";
import AddCustomer from "./AddCustomer";

type Props = { addCustomerForm: any };

export default function Customer({ addCustomerForm }: Props) {
  return (
    <div className="w-full min-w-full bg-white">
      <AddCustomer addCustomerForm={addCustomerForm} />
    </div>
  );
}
