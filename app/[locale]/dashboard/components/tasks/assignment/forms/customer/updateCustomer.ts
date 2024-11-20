// updateCustomer.ts
"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateCustomer(customerId: string, formData: FormData) {
  "use server";
  const supabase = await createClient();

  // Extract form data using correct keys
  const full_name = formData.get("full_name") as string;
  const vat_or_company_nr = formData.get("vat_or_company_nr") as string;
  const reference_or_contact = formData.get("reference_or_contact") as string;
  const po_number = formData.get("po_number") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;
  const address_line_1 = formData.get("address_line_1") as string;
  const zip_code = formData.get("zip_code") as string;
  const city = formData.get("city") as string;
  const country = formData.get("country") as string;

  // Update the customer
  const { error: updateError } = await supabase
    .from("customers")
    .update({
      full_name,
      vat_or_company_nr,
      reference_or_contact,
      po_number,
      phone,
      email,
      address_line_1,
      zip_code,
      city,
      country,
    })
    .eq("id", customerId);

  if (updateError) {
    console.error("Error updating customer:", updateError);
  }

  // Revalidate paths if necessary
  revalidatePath('page');

  console.log("Customer updated successfully");
}
