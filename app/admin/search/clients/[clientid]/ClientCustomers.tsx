"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

type Customer = {
  id: string;
  full_name: string | null;
  vat_or_company_nr: string | null;
  email: string | null;
};

type Props = { customers: Customer[] };
export default function ClientCustomers({ customers }: Props) {
  if (customers.length === 0) {
    return (
      <div className="mt-4 w-full text-center text-sm text-neutral-500 pb-10">
        Haven't created customers yet.
      </div>
    );
  }
  return (
    <div className="p-2 md:p-6 flex flex-col gap-6 bg-white">
      <h2 className="text-xl font-medium text-black">
        Client's Customers ({customers.length})
      </h2>

      {/* Customers Table */}
      {customers.length > 0 ? (
        <table className="table-auto w-full border-collapse border-0 bg-neutral-100 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-neutral-200">
              <th className="border-b border-neutral-200 px-4 py-2 text-left">
                Full Name
              </th>
              <th className="border-b border-neutral-200 px-4 py-2 text-left">
                VAT/Company No.
              </th>
              <th className="border-b border-neutral-200 px-4 py-2 text-left">
                Email
              </th>
              <th className="border-b border-neutral-200 px-4 py-2 text-center w-min max-w-20">
                Link
              </th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr
                key={customer.id}
                className={`${
                  index === customers.length - 1 ? "last:rounded-b-lg" : ""
                }`}
              >
                <td className="border-t border-neutral-200 px-4  text-sm py-5">
                  {customer.full_name || "N/A"}
                </td>
                <td className="border-t border-neutral-200 px-4  text-sm py-5">
                  {customer.vat_or_company_nr || "N/A"}
                </td>
                <td className="border-t border-neutral-200 px-4  text-sm py-5">
                  {customer.email || "N/A"}
                </td>
                <td className="border-t border-neutral-200 px-4  text-sm py-5 text-center w-min max-w-20">
                  <Link
                    href={`/admin/search/customers/${customer.id}`}
                    target="_blank"
                    className="transition-all hover:bg-primary-500 hover:text-white text-primary-600 font-medium bg-primary-300 rounded px-3 py-2"
                  >
                    <span>Open Customer</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="mt-4 w-full text-center text-sm text-neutral-500 pb-10">
          Haven't created customers yet.
        </div>
      )}
    </div>
  );
}
