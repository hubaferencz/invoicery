"use server";
import { Resend } from "resend";
import { createClient } from "@/utils/supabase/server";

// Initialize Resend with API key from environment variable
const resend = new Resend(process.env.RESEND_API_KEY);

type CustomerDetails = {
  full_name: string | null;
  vat_or_company_nr: string | null;
  reference_or_contact: string | null;
  po_number: string | null;
  phone: string | null;
  email: string | null;
  address_line_1: string | null;
  zip_code: string | null;
  city: string | null;
  country: string | null;
};

export async function sendAssignment(formData: FormData): Promise<void> {
  "use server";
  const supabase = await createClient();

  // Extract form data
  const endDate = formData.get("endDate") as string | null;
  const startDate = formData.get("startDate") as string | null;
  const weeklyHours = formData.get("weeklyHours") as string | null;
  const amount = formData.get("amount") as string | null;
  const selectedCurrency = formData.get("selectedCurrency") as string | null;
  const workDescription = formData.get("workDescription") as string | null;

  // Client info, prioritize non-responsive fields
  const clientEmail =
    (formData.get("clientEmail") as string | null) ||
    (formData.get("responsiveClientEmail") as string | null) ||
    "N/A";
  const clientPhone =
    (formData.get("clientPhone") as string | null) ||
    (formData.get("responsiveClientPhone") as string | null) ||
    "N/A";
  const clientProfession =
    (formData.get("clientProfession") as string | null) ||
    (formData.get("responsiveClientProfession") as string | null) ||
    "N/A";

  // Selected customer ID
  const selectedCustomerId = formData.get("selectedCustomerId") as
    | string
    | null;

  let customerDetails: CustomerDetails = {
    full_name: null,
    vat_or_company_nr: null,
    reference_or_contact: null,
    po_number: null,
    phone: null,
    email: null,
    address_line_1: null,
    zip_code: null,
    city: null,
    country: null,
  };

  // Fetch customer details if selectedCustomerId exists
  if (selectedCustomerId) {
    const { data: customerData, error: customerError } = await supabase
      .from("customers")
      .select(
        "full_name, vat_or_company_nr, reference_or_contact, po_number, phone, email, address_line_1, zip_code, city, country"
      )
      .eq("id", selectedCustomerId)
      .single();

    if (customerError) {
      console.error("Error fetching customer details:", customerError.message);
    } else if (customerData) {
      customerDetails = customerData as CustomerDetails;
    }
  }

  // Prepare customer details for the email
  const customerInfo = `
Full Name: ${customerDetails.full_name || "N/A"}
VAT/Company Number: ${customerDetails.vat_or_company_nr || "N/A"}
Reference/Contact: ${customerDetails.reference_or_contact || "N/A"}
PO Number: ${customerDetails.po_number || "N/A"}
Phone: ${customerDetails.phone || "N/A"}
Email: ${customerDetails.email || "N/A"}
Address: ${customerDetails.address_line_1 || "N/A"}, ${
    customerDetails.zip_code || "N/A"
  }, ${customerDetails.city || "N/A"}, ${customerDetails.country || "N/A"}
`;

  // Update the client's phone number and profession if they have changed
  if (clientEmail !== "N/A") {
    const { data: existingClient, error: fetchError } = await supabase
      .from("clients")
      .select("phone, profession")
      .eq("email", clientEmail)
      .single();

    if (fetchError) {
      console.error("Error fetching client:", fetchError.message);
    } else if (existingClient) {
      const updates: Partial<{ phone: string; profession: string }> = {};

      if (existingClient.phone !== clientPhone && clientPhone !== "N/A") {
        updates.phone = clientPhone;
      }
      if (
        existingClient.profession !== clientProfession &&
        clientProfession !== "N/A"
      ) {
        updates.profession = clientProfession;
      }

      if (Object.keys(updates).length > 0) {
        const { error: updateError } = await supabase
          .from("clients")
          .update(updates)
          .eq("email", clientEmail);

        if (updateError) {
          console.error("Error updating client:", updateError.message);
        }
      }
    }
  }

  // Send a plain text email to the admin
  await resend.emails.send({
    from: "Invoicery <hello@supaw.io>",
    to: ["huba.ferencz.personal@gmail.com", "info@invoicery.com", clientEmail], // Multiple recipients
    subject: `Your assignment has been received by Invoicery`,
    text: `
Start Date: ${startDate || "N/A"}
End Date: ${endDate || "N/A"}
Weekly Hours: ${weeklyHours || "N/A"}
Amount: ${amount || "N/A"}
Selected Currency: ${selectedCurrency || "N/A"}
Work Description: ${workDescription || "N/A"}

Client Email: ${clientEmail}
Client Phone: ${clientPhone}
Client Profession: ${clientProfession}

Selected Customer Details:
${customerInfo}
`,
  });
}
