import Image from "next/image";
import Link from "next/link";
import React from "react";
import ClientForms from "./ClientForms";
import UploadPDFs from "./UploadPDFs";
import { createClient } from "@/utils/supabase/server";

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
  const client = data;
  return (
    <div>
      <div className="flex whitespace-nowrap min-h-full gap-4 items-center p-2 md:p-6 justify-start bg-white border-b border-[#F2F2F2]">
        <Link
          href={"/clients"}
          className="flex items-center justify-center gap-1 select-none"
        >
          <Image src={"/back.svg"} width={20} height={20} alt="Back" />
          <h2 className="text-sm font-normal">Back</h2>
        </Link>
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
        <h2 className="text-xl font-medium text-black">Upload Passport</h2>
        <UploadPDFs />
      </div>
    </div>
  );
}
