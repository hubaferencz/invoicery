"use server";
import { Resend } from "resend";
import { createClient } from "@/utils/supabase/server";

// Initialize Resend with API key from environment variable
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendDeductionRequest(
  message: string,
  emailToSendTo: string,
  title: string
): Promise<void> {
  const supabase = await createClient();

  // Fetch the currently logged-in user's email
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData?.user) {
    console.log("User not authenticated.");
  }

  const userEmail = userData?.user?.email;
  if (userEmail) {
    // Send the email using Resend
    await resend.emails.send({
      from: "Invoicery <hello@supaw.io>",
      to: [emailToSendTo],
      subject: "Invoicery Deduction Request",
      text: `
A "${title}" request has been submitted:

Requested by: ${userEmail}

Message:
${message}
    `,
    });
  }
}
