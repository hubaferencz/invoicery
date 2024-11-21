"use client";

import React, { useState } from "react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";

type Props = {
  passportLink: string | null;
  setInputValues: any;
  setHasChanges: any;
  clientId: string;
  successMessage: any;
  setSuccessMessage: any;
};

export default function Passport({
  passportLink,
  setInputValues,
  setHasChanges,
  clientId,
  successMessage,
  setSuccessMessage,
}: Props) {
  const [passportFile, setPassportFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const supabase = createClient();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setPassportFile(file);
    setUploading(true);
    setSuccessMessage(null); // Clear any previous success message

    const fileName = `${clientId}-${file.name}`;

    // Check if the file already exists
    const { data: existingFile, error: fetchError } = await supabase.storage
      .from("id-documents")
      .list("", {
        limit: 1,
        search: fileName,
      });

    if (fetchError) {
      console.error(
        "Error checking for existing passport:",
        fetchError.message
      );
    }

    // Delete the existing file if it matches the new file name
    if (existingFile?.length && existingFile.length > 0) {
      const { error: deleteError } = await supabase.storage
        .from("id-documents")
        .remove([fileName]);

      if (deleteError) {
        console.error("Error deleting existing passport:", deleteError.message);
        setUploading(false);
        return;
      }
    }

    // Upload the new file
    const { data, error } = await supabase.storage
      .from("id-documents")
      .upload(fileName, file);

    if (error) {
      console.error("Error uploading passport:", error.message);
      setUploading(false);
      return;
    }

    const publicUrl = supabase.storage
      .from("id-documents")
      .getPublicUrl(fileName).data.publicUrl;

    setInputValues((prev: any) => ({
      ...prev,
      passport_photo_link: publicUrl,
    }));
    setHasChanges(true);
    setUploading(false);

    // Set success message
    setSuccessMessage("Passport uploaded successfully! Please save ⚠️!");
  };

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="w-full bg-[#F4F4F4] rounded p-4 flex justify-between">
        {passportLink ? (
          <a
            href={passportLink}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-primary-600 hover:font-medium transition-all"
          >
            View Passport
          </a>
        ) : (
          <span>No passport uploaded</span>
        )}
        <label
          htmlFor="passport-file-input"
          className="flex items-center justify-center gap-3 cursor-pointer"
        >
          <span className="text-sm text-[#878484]">Select New</span>
          <div className="w-3 h-3 flex items-center justify-center">
            <Image
              src={"/icons/right.svg"}
              width={16}
              height={16}
              alt="right arrow"
              className="text-[#878484]"
            />
          </div>
        </label>
        <input
          type="file"
          id="passport-file-input"
          className="hidden"
          accept=".jpg, .png, .jpeg, .webp"
          onChange={handleFileChange}
        />
      </div>
      {uploading && <span>Uploading...</span>}
      {successMessage && (
        <span className="text-sm text-green-600 mt-2">{successMessage}</span>
      )}
    </div>
  );
}
