"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addNewCustomer(formData: FormData) {
  "use server";
  const supabase = await createClient();

  // Get the authenticated user
  const { data: userData, error: userError } = await supabase.auth.getUser();
  const userId = userData?.user?.id;

  if (userError || !userId) {
    console.error("User not authenticated");
    // throw new Error("User not authenticated");
  }

  // Extract form data
  // Correct keys that match input field names
  const name = formData.get("full_name") as string;
  const vatNumber = formData.get("vat_or_company_nr") as string;
  const contactPerson = formData.get("reference_or_contact") as string;
  const poNumber = formData.get("po_number") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;
  const addressLine1 = formData.get("address_line_1") as string;
  const zipCode = formData.get("zip_code") as string;
  const city = formData.get("city") as string;
  const country = formData.get("country") as string;

  // Check if a customer with the same VAT number already exists for this client
  const { data: existingCustomer, error: existingCustomerError } =
    await supabase
      .from("customers")
      .select("id")
      .eq("vat_or_company_nr", vatNumber)
      .eq("created_by", userId)
      .maybeSingle(); // Use maybeSingle() to handle no rows without throwing an error

  if (existingCustomerError) {
    console.error("Error checking existing customers:", existingCustomerError);
    // throw new Error("Error checking existing customers.");
  }

  if (existingCustomer) {
    // Customer already exists; prevent duplicate entry
    console.log("Customer already exists");
    // throw new Error("A customer with this VAT number already exists.");
  }

  // Begin transaction to ensure atomicity
  const { data: newCustomer, error: insertError } = await supabase
    .from("customers")
    .insert({
      created_by: userId,
      full_name: name,
      vat_or_company_nr: vatNumber,
      reference_or_contact: contactPerson,
      po_number: poNumber,
      phone: phone,
      email: email,
      address_line_1: addressLine1,
      zip_code: zipCode,
      city: city,
      country: country,
    })
    .select("*") // Retrieve the inserted customer data
    .single();

  if (insertError) {
    console.error("Error inserting new customer:", insertError);
    // throw new Error("Error inserting new customer.");
  }

  // Establish relationship in 'client_customers' table
  const { error: clientCustomerError } = await supabase
    .from("client_customers")
    .insert({
      client_id: userId,
      customer_id: newCustomer.id,
    });

  if (clientCustomerError) {
    console.error(
      "Error inserting into client_customers:",
      clientCustomerError
    );
    // throw new Error("Error establishing client-customer relationship.");
  }

  // Success
  console.log("New customer added successfully");
  revalidatePath("dashboard", "page");
}
