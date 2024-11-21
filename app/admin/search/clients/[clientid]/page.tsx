import Image from "next/image";
import Link from "next/link";
import React from "react";
import ClientForms from "./ClientForms";
import UploadPDFs from "./UploadPDFs";
import { createClient } from "@/utils/supabase/server";
import ClientCustomers from "./ClientCustomers";
import BackNavigation from "@/app/admin/components/BackNavigation";

// export default async function ClientPage({ params }: any) {
//   const { clientId } = await params;
export default async function ClientPage({ params }: any) {
  const { clientid } = await params;
  const supabase = await createClient();

  // Fetch client details
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("id", clientid)
    .single();

  if (error) {
    console.error("Failed to fetch client:", error.message);
    return <div>Error loading client data</div>;
  }

  const { data: customers, error: customerError } = await supabase
    .from("client_customers")
    .select(
      `
    customer_id,
    customers:customer_id (id, full_name, vat_or_company_nr, email)
  `
    )
    .eq("client_id", clientid);

  if (customerError) {
    console.error("Failed to fetch customers:", customerError.message);
    return <div>Error loading customer data</div>;
  }

  // Map customer data for ease of use
  const formattedCustomers = customers?.map((item: any) => ({
    id: item.customers.id,
    full_name: item.customers.full_name,
    vat_or_company_nr: item.customers.vat_or_company_nr,
    email: item.customers.email,
  }));

  const client = data;
  return (
    <div>
      <div className="flex whitespace-nowrap min-h-full gap-4 items-center p-2 md:p-6 justify-start bg-white border-b border-[#F2F2F2]">
      <BackNavigation fallbackRoute="/admin/search/clients" />
        <div className="w-[1px] h-7 bg-[#EBEBEB]"></div>
        <h2 className="text-base font-semibold text-[#808080]">
          {client.first_name} {client.last_name}
        </h2>
      </div>
      <div className="p-2 md:p-6 flex flex-col gap-6 bg-white">
        <h2 className="text-xl font-medium text-black">Client 🧑‍💻</h2>
        <ClientForms client={client} />
      </div>
      <div className="p-2 md:p-6 flex flex-col gap-6 bg-white">
        <h2 className="text-xl font-medium text-black">Upload PDFs</h2>
        <UploadPDFs />
      </div>

      <ClientCustomers customers={formattedCustomers} />
    </div>
  );
}
