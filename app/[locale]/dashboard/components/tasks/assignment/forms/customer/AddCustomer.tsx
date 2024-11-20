

// AddCustomer.tsx
"use client";

import Image from "next/image";
import ChevronIcon from "@/app/[locale]/components/ChevronIcon";

type Props = {
  addCustomerForm: any;
  showAddCustomerPopup: boolean;
  setShowAddCustomerPopup: (value: boolean) => void;
  isEditing?: boolean;
  customerData?: any;
  setIsEditing?: (value: boolean) => void;
  setCustomerToEdit?: (value: any) => void;
  refreshCustomers?: () => void;
};

export default function AddCustomer({
  addCustomerForm,
  showAddCustomerPopup,
  setShowAddCustomerPopup,
  isEditing,
  customerData,
  setIsEditing,
  setCustomerToEdit,
  refreshCustomers,
}: Props) {
  return (
    <>
      <div
        className="bg-white lg:bg-[#F4F4F4] w-full min-w-full rounded p-4 lg:p-6 flex lg:flex-col items-center justify-between lg:justify-center gap-2 cursor-pointer"
        onClick={() => setShowAddCustomerPopup(true)}
      >
        <Image
          src={"/assignment/CircularIcon.svg"}
          alt=""
          width={40}
          height={40}
          className="hidden w-10 h-10 rounded-full lg:block"
          style={{ boxShadow: "0px 2px 8px 0px rgba(153, 153, 153, 0.20)" }}
        />
        <span className="text-sm lg:text-base lg:font-semibold lg:text-[#04567D]">
          {addCustomerForm.title}
        </span>
        <ChevronIcon className="block w-4 h-4 -rotate-90 lg:hidden" />
      </div>
    </>
  );
}
