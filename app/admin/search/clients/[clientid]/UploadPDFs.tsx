"use client";

import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import ChevronIcon from "@/app/[locale]/components/ChevronIcon";
import Image from "next/image";

type PDFItem = {
  id: string;
  name: string;
  date: string;
  link: string;
};

type PDFCategory = {
  title: string;
  type: string;
  items: PDFItem[];
};

const categories = [
  { title: "Invoices", type: "invoice" },
  { title: "Salary Specifications", type: "salary_specification" },
  { title: "Assignment Agreements", type: "assignment_agreement" },
  { title: "Employment Contracts", type: "employment_contract" },
  { title: "Other PDFs", type: "other" },
];

type Props = {
  clientId: string;
};

export default function UploadPDFs({ clientId }: Props) {
  const [pdfCategories, setPdfCategories] = useState<PDFCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [uploadingType, setUploadingType] = useState<string | null>(null);
  const supabase = createClient();

  const fetchPDFs = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const { data, error } = await supabase
        .from("pdf_documents")
        .select("*")
        .eq("client_id", clientId);

      if (error) throw error;

      const groupedPDFs = categories.map((category) => ({
        title: category.title,
        type: category.type,
        items: data
          .filter((pdf) => pdf.type === category.type)
          .map((pdf) => ({
            id: pdf.id,
            name: pdf.pdf_link.split("/").pop(),
            date: new Date(pdf.created_at).toLocaleDateString(),
            link: pdf.pdf_link,
          })),
      }));

      setPdfCategories(groupedPDFs);
    } catch (error: any) {
      console.error("Error fetching PDFs:", error.message);
      setErrorMessage("Failed to fetch PDFs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // const handleUpload = async (type: string, file: File) => {
  //   const bucket = getBucketName(type);
  //   const sanitizedFileName = file.name.replace(/\s+/g, "-"); // Replace spaces with hyphens

  //   setUploadingType(type); // Set uploading state
  //   try {
  //     setErrorMessage(null);

  //     // Check if file already exists
  //     const { data: existingFiles } = await supabase.storage
  //       .from(bucket)
  //       .list("", { search: sanitizedFileName });

  //     if (existingFiles && existingFiles.length > 0) {
  //       throw new Error("A document with this name already exists.");
  //     }

  //     // Upload file
  //     const { error: uploadError } = await supabase.storage
  //       .from(bucket)
  //       .upload(sanitizedFileName, file);

  //     if (uploadError) throw uploadError;

  //     const publicUrl = supabase.storage.from(bucket).getPublicUrl(sanitizedFileName)
  //       .data.publicUrl;

  //     // Insert into database
  //     const { error: insertError } = await supabase
  //       .from("pdf_documents")
  //       .insert({
  //         client_id: clientId,
  //         type,
  //         pdf_link: publicUrl,
  //       });

  //     if (insertError) throw insertError;

  //     fetchPDFs(); // Refresh after upload
  //   } catch (error: any) {
  //     console.error("Error uploading PDF:", error.message);
  //     setErrorMessage(error.message || "An error occurred while uploading.");
  //   } finally {
  //     setUploadingType(null); // Reset uploading state
  //   }
  // };

  const handleUpload = async (type: string, file: File) => {
    const bucket = getBucketName(type);

    // Generate a unique filename
    const fileExtension = file.name.split(".").pop(); // Get file extension
    const baseFileName = file.name
      .replace(/\s+/g, "-")
      .replace(`.${fileExtension}`, ""); // Remove spaces and extension
    const sanitizedFileName = `${baseFileName}-${uuidv4().slice(
      0,
      8
    )}.${fileExtension}`; // Append short UUID before extension

    setUploadingType(type); // Set uploading state
    try {
      setErrorMessage(null);

      // Upload file
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(sanitizedFileName, file);

      if (uploadError) throw uploadError;

      const publicUrl = supabase.storage
        .from(bucket)
        .getPublicUrl(sanitizedFileName).data.publicUrl;

      // Insert into database
      const { error: insertError } = await supabase
        .from("pdf_documents")
        .insert({
          client_id: clientId,
          type,
          pdf_link: publicUrl,
        });

      if (insertError) throw insertError;

      fetchPDFs(); // Refresh after upload
    } catch (error: any) {
      console.error("Error uploading PDF:", error.message);
      setErrorMessage(error.message || "An error occurred while uploading.");
    } finally {
      setUploadingType(null); // Reset uploading state
    }
  };

  const handleDelete = async (pdf: PDFItem, type: string) => {
    const bucket = getBucketName(type);
    try {
      setErrorMessage(null);

      // Delete from storage
      const { error: deleteError } = await supabase.storage
        .from(bucket)
        .remove([pdf.name]);

      if (deleteError) throw deleteError;

      // Delete from database
      const { error: dbDeleteError } = await supabase
        .from("pdf_documents")
        .delete()
        .eq("id", pdf.id);

      if (dbDeleteError) throw dbDeleteError;

      fetchPDFs(); // Refresh after deletion
    } catch (error: any) {
      console.error("Error deleting PDF:", error.message);
      setErrorMessage(error.message || "An error occurred while deleting.");
    }
  };

  const getBucketName = (type: string) => {
    switch (type) {
      case "invoice":
        return "invoices";
      case "salary_specification":
        return "salary-specifications";
      case "assignment_agreement":
        return "assignment-agreements";
      case "employment_contract":
        return "employment-contracts";
      default:
        return "other-pdfs";
    }
  };

  useEffect(() => {
    fetchPDFs();
  }, [clientId]);

  if (loading) return <div>Loading PDFs...</div>;

  return (
    <div className="flex flex-col gap-6">
      {errorMessage && (
        <div className="text-red-500 text-sm">{errorMessage}</div>
      )}
      {pdfCategories.map((category, index) => (
        <PDFCategoryComponent
          key={index}
          category={category}
          onUpload={handleUpload}
          onDelete={handleDelete}
          uploadingType={uploadingType}
        />
      ))}
    </div>
  );
}

type CategoryProps = {
  category: PDFCategory;
  onUpload: (type: string, file: File) => void;
  onDelete: (pdf: PDFItem, type: string) => void;
  uploadingType: string | null;
};

function PDFCategoryComponent({
  category,
  onUpload,
  onDelete,
  uploadingType,
}: CategoryProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(category.type, file);
    }
  };

  const confirmDelete = (pdf: PDFItem) => {
    if (window.confirm(`Are you sure you want to delete ${pdf.name}?`)) {
      onDelete(pdf, category.type);
    }
  };

  return (
    <div className="border border-[#CECECE] p-6 rounded-md flex flex-col items-start justify-start w-full">
      {/* Header */}
      <div className="flex flex-col gap-4 md:gap-0 md:flex-row items-center justify-between h-12 w-full">
        <h3 className="text-sm font-medium text-black">
          {category.title} ({category.items.length})
        </h3>
        <div className="flex gap-4 h-full">
          <label className="h-full min-h-full rounded hover:bg-neutral-100 transition-all text-black border border-[#808080] px-6 flex items-center justify-center cursor-pointer">
            <span>
              {uploadingType === category.type ? "Uploading..." : "Upload PDF"}
            </span>
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".pdf"
              disabled={uploadingType === category.type}
            />
          </label>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="h-full min-h-full font-medium rounded-xl bg-primary-300 transition-all text-[#04567D] border border-primary-300 px-6 gap-3 flex items-center justify-center"
          >
            <span>{isOpen ? "Hide all" : "Show all"}</span>
            <ChevronIcon
              color="#04567D"
              className={`transform transition-transform duration-300 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
        </div>
      </div>
      {/* Dropdown Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[1000px]" : "max-h-0"
        } w-full`}
      >
        {category.items.length > 0 ? (
          <ul className="mt-6 flex flex-col gap-2 w-full">
            {category.items.map((item) => (
              <li
                key={item.id}
                className="p-1 md:p-4 bg-[#F4F4F4] rounded-md flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-black">{item.name}</p>
                  <p className="text-xs text-neutral-500">{item.date}</p>
                </div>
                <div className="flex gap-6 items-center justify-center">
                  <Link
                    href={item.link}
                    target="_blank"
                    className="text-neutral-400 hover:text-primary-600 transition-all hover:underline"
                  >
                    Download
                  </Link>
                  <button
                    onClick={() => confirmDelete(item)}
                    className="hover:bg-red-100 transition-all p-1 rounded"
                  >
                    <Image
                      src={"/trash.svg"}
                      width={16}
                      height={16}
                      alt="Delete"
                      className="cursor-pointer"
                    />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-4 w-full text-center text-sm text-neutral-500">
            No uploaded PDFs yet.
          </div>
        )}
      </div>
    </div>
  );
}
