// Customer.tsx
"use client";

import React, { useState, useEffect } from "react";
import AddCustomer from "./AddCustomer";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";

type Props = {
  setIsCustomerValid: (isValid: boolean) => void;

  addCustomerForm: any;
  showAddCustomerPopup: boolean;
  setShowAddCustomerPopup: (value: boolean) => void;
  setCustomerToEdit: (customer: any) => void;
  setIsEditing: (value: boolean) => void;

  customers: any[];
  fetchCustomers: () => void;
  selectedCustomerId: string | null;
  setSelectedCustomerId: (id: string | null) => void;
};

export default function Customer({
  setIsCustomerValid,
  addCustomerForm,
  showAddCustomerPopup,
  setShowAddCustomerPopup,
  setCustomerToEdit,
  setIsEditing,

  customers,
  fetchCustomers,
  selectedCustomerId,
  setSelectedCustomerId,
}: Props) {
  // const [customers, setCustomers] = useState<any[]>([]);
  // const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(
  //   null
  // );
  useEffect(() => {
    setIsCustomerValid(!!selectedCustomerId);
  }, [selectedCustomerId, setIsCustomerValid]);


  const [confirmDelete, setConfirmDelete] = useState<any>(null);

  const handleSelectCustomer = (customerId: string) => {
    setSelectedCustomerId(customerId);
  };

  const handleEditCustomer = (customer: any) => {
    setCustomerToEdit(customer);
    setIsEditing(true);
    setShowAddCustomerPopup(true);
  };

  const handleDeleteCustomer = async (customer: any) => {
    const supabase = createClient();

    // Delete from client_customers
    const { error: clientCustomerError } = await supabase
      .from("client_customers")
      .delete()
      .eq("customer_id", customer.id);

    if (clientCustomerError) {
      console.error(
        "Error deleting from client_customers:",
        clientCustomerError
      );
      // Handle error appropriately
      return;
    }

    // Delete from customers
    const { error: customerError } = await supabase
      .from("customers")
      .delete()
      .eq("id", customer.id);

    if (customerError) {
      console.error("Error deleting customer:", customerError);
      // Handle error appropriately
      return;
    }

    setConfirmDelete(null);
    fetchCustomers(); // Refresh the customer list
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      const supabase = createClient();
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError || !userData?.user) {
        console.error("User not authenticated");
        return;
      }

      const userId = userData.user.id;

      const { data: customersData, error: customersError } = await supabase
        .from("customers")
        .select("*")
        .eq("created_by", userId);

      if (customersError) {
        console.error("Error fetching customers:", customersError);
      }
    };

    fetchCustomers();
  }, []);

  // const handleSelectCustomer = (customerId: string) => {
  //   setSelectedCustomerId(customerId);
  //   // You can also pass this selected customer ID up to the parent component if needed
  // };

  // const handleEditCustomer = (customer: any) => {
  //   setCustomerToEdit(customer); // Pass the customer data to parent
  //   setIsEditing(true);
  //   setShowAddCustomerPopup(true);
  // };

  return (
    <div className="w-full min-w-full lg:bg-white flex flex-col gap-6">
      {/* Button to Add a New Customer */}

      {/* Display Existing Customers */}
      <div className="customer-list flex flex-col gap-4">
        {customers.length > 0 &&
          customers.map((customer) => (
            <div
              key={customer.id}
              onClick={() => handleSelectCustomer(customer.id)}
              className={`group customer-item bg-white lg:bg-transparent border ${
                selectedCustomerId === customer.id
                  ? "border-primary-600"
                  : "border-[#EBEBEB]"
              } hover:border-primary-600 transition-all cursor-pointer p-4 lg:p-6 rounded flex justify-between gap-4`}
            >
              <div
                // onClick={() => handleSelectCustomer(customer.id)}
                className="flex flex-col gap-1 items-start text-start select-none group-hover:cursor-pointer"
              >
                <h3 className="text-lg sm:text-xl font-medium text-black">
                  {customer.full_name}
                </h3>
                <div className="flex flex-col gap-1.5 text-xs sm:text-sm">
                  <span>{customer.vat_or_company_nr}</span>
                  <span>
                    {customer.address_line_1}, {customer.city},{" "}
                    {customer.zip_code}, {customer.country}
                  </span>
                  <span>
                    {customer.phone}, {customer.email}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <button
                  className=" border border-[#EBEBEB] px-3 py-2 flex gap-3 hover:bg-neutral-50 transition-all items-center justify-between rounded-t border-b-0"
                  type="button"
                  // onClick={() => handleEditCustomer(customer)}
                  onClick={() => handleEditCustomer(customer)}
                >
                  <span className="w-24 sm:w-28 text-sm text-start">
                    {addCustomerForm.editText || "Edit"}
                  </span>
                  <Image src={"/edit.svg"} width={24} height={24} alt="edit" />
                </button>
                <button
                  onClick={() => setConfirmDelete(customer)}
                  className=" border border-[#EBEBEB] px-3 py-2 flex gap-3 hover:bg-neutral-50 transition-all items-center justify-between rounded-b"
                  type="button"
                >
                  <span className="w-24 sm:w-28 text-sm text-start">
                    {addCustomerForm.removeText || "Remove"}
                  </span>
                  <Image
                    src={"/delete.svg"}
                    width={24}
                    height={24}
                    alt="delete"
                  />
                </button>
              </div>
            </div>
          ))}
      </div>
      {confirmDelete && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#F4F4F4] rounded-lg max-w-80">
            <h3 className=" text-xl font-medium text-black p-6 ">
              {addCustomerForm.deleteConfirmationTitle ||
                "Are you sure you want to delete this customer?"}
            </h3>
            <div className=" p-6 gap-2 flex flex-col justify-center">
              <button
                type="button"
                className="w-full py-2.5 px-3 text-sm font-medium text-[#EB6060] bg-transparent hover:bg-[#EB6060] rounded-md transition-all hover:bg-opacity-10"
                onClick={() => handleDeleteCustomer(confirmDelete)}
              >
                {addCustomerForm.removeText || "Remove"}
              </button>
              <button
                type="button"
                className="w-full py-2.5 px-3 text-sm font-medium text-[#878484] bg-transparent hover:bg-[#878484] rounded-md transition-all hover:bg-opacity-10"
                onClick={() => setConfirmDelete(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <AddCustomer
        showAddCustomerPopup={showAddCustomerPopup}
        setShowAddCustomerPopup={() => {
          setIsEditing(false); // Not editing when adding new
          setCustomerToEdit(null);
          setShowAddCustomerPopup(true);
        }}
        addCustomerForm={addCustomerForm}
      />
    </div>
  );
}
