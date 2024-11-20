"use server";

import { createClient } from "@/utils/supabase/server";

export async function uploadPersonalData(formData: FormData) {
  const supabase = await createClient();

  // Get the authenticated user
  const { data: userData, error: userError } = await supabase.auth.getUser();
  const userId = userData?.user?.id;

  if (userError || !userId) {
    console.error("User not authenticated");
    console.log("User not authenticated");
  }

  // Extract form data
  const firstNameLabel = formData.get("firstNameLabel") as string;
  const lastNameLabel = formData.get("lastNameLabel") as string;
  const personalIdLabel = formData.get("personalIdLabel") as string;
  const addressLine1Label = formData.get("addressLine1Label") as string;
  const coLabel = formData.get("coLabel") as string;
  const zipCodeLabel = formData.get("zipCodeLabel") as string;
  const cityLabel = formData.get("cityLabel") as string;
  const countryLabel = formData.get("countryLabel") as string;
  const ibanLabel = formData.get("ibanLabel") as string;
  const bicLabel = formData.get("bicLabel") as string;

  // Extract passport file
  const passportFile = formData.get("passport") as File | null;
  let passportPhotoLink = null;

  if (passportFile) {
    // Upload the passport file to Supabase Storage
    const fileName = `${passportFile.name}`;
    const filePath = `${userId}/${fileName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("id-documents")
      .upload(filePath, passportFile);

    if (uploadError) {
      console.error("Error uploading file:", uploadError.message);
      console.log("Failed to upload passport photo");
    } else {
      // Get the public URL of the uploaded file
      const { data: publicUrlData } = supabase.storage
        .from("id-documents")
        .getPublicUrl(filePath);
      passportPhotoLink = publicUrlData.publicUrl;
    }
  } else {
    console.error("No passport file provided.");
    console.log("Passport file is required");
  }

  // Upsert the user's data into the 'clients' table
  const { error: upsertError } = await supabase.from("clients").upsert(
    {
      id: userId,
      email: userData?.user?.email,
      first_name: firstNameLabel,
      last_name: lastNameLabel,
      personal_identification_number: personalIdLabel,
      address_line_1: addressLine1Label,
      co: coLabel,
      zip_code: zipCodeLabel,
      city: cityLabel,
      country: countryLabel,
      iban_code: ibanLabel,
      bic_code: bicLabel,
      passport_photo_link: passportPhotoLink,
      is_verified: true,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" }
  );

  if (upsertError) {
    console.error("Error saving client data:", upsertError.message);
    console.log("Failed to save personal data");
  }

  console.log("Client data saved successfully");
}
