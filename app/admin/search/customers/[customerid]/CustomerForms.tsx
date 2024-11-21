"use client";

import React, { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Field = {
  label: string;
  required: boolean;
  minLength?: number;
  maxLength?: number;
  type?: string;
  errorMessage?: string;
  key: string;
  editable?: boolean;
};

type FieldSection = {
  title?: string;
  fields: Field[];
};

type Props = {
  customer: any;
};

export default function CustomerForms({ customer }: Props) {
  const router = useRouter();
  const [inputValues, setInputValues] = useState(customer);
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [inputFocus, setInputFocus] = useState<{ [key: string]: boolean }>({});

  const supabase = createClient();

  const personalFields: FieldSection = {
    fields: [
      {
        label: "Full Name",
        required: true,
        minLength: 2,
        maxLength: 50,
        key: "full_name",
        editable: true,
      },
      {
        label: "VAT/Company No.",
        required: true,
        minLength: 2,
        maxLength: 30,
        key: "vat_or_company_nr",
        editable: true,
      },
      {
        label: "Reference/Contact Person",
        required: true,
        minLength: 2,
        maxLength: 50,
        key: "reference_or_contact",
        editable: true,
      },
      {
        label: "PO Number",
        required: false,
        minLength: 2,
        maxLength: 30,
        key: "po_number",
        editable: true,
      },
      {
        label: "Phone",
        required: true,
        minLength: 2,
        maxLength: 20,
        key: "phone",
        editable: true,
      },
      {
        label: "Email (Agreement and Invoice Sent Here)",
        required: true,
        minLength: 5,
        maxLength: 50,
        key: "email",
        editable: true,
      },
    ],
  };

  const locationFields: FieldSection = {
    fields: [
      {
        label: "Address Line 1",
        required: true,
        minLength: 2,
        maxLength: 50,
        key: "address_line_1",
        editable: true,
      },

      {
        label: "ZIP Code",
        required: true,
        minLength: 2,
        maxLength: 10,
        key: "zip_code",
        editable: true,
      },
      {
        label: "City",
        required: true,
        minLength: 2,
        maxLength: 30,
        key: "city",
        editable: true,
      },
      {
        label: "Country",
        required: true,
        minLength: 2,
        maxLength: 30,
        key: "country",
        editable: true,
      },
    ],
  };

  const handleFocus = (key: string) => {
    setInputFocus((prevFocus) => ({ ...prevFocus, [key]: true }));
  };

  const handleBlur = (field: Field) => {
    setInputFocus((prevFocus) => ({ ...prevFocus, [field.key]: false }));
    validateField(field, inputValues[field.key] || "");
  };

  const handleChange = (key: string, editable: boolean, value: string) => {
    if (!editable) return;

    setInputValues((prev: any) => {
      const updatedValues = { ...prev, [key]: value };
      setHasChanges(
        Object.keys(updatedValues).some(
          (field) => updatedValues[field] !== customer[field]
        )
      );
      return updatedValues;
    });

    validateField({ key, label: key, required: false }, value);
  };

  const validateField = (field: Field, value: string) => {
    if (field.required && !value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field.key]: "This field is required.",
      }));
      return;
    }

    if (field.minLength && value.length < field.minLength) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field.key]:
          field.errorMessage || `Minimum ${field.minLength} characters.`,
      }));
    } else if (field.maxLength && value.length > field.maxLength) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field.key]:
          field.errorMessage || `Maximum ${field.maxLength} characters.`,
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [field.key]: null }));
    }
  };

  const handleSave = async () => {
    setSaving(true);

    // Gather the updated fields
    const updatedData = Object.keys(inputValues).reduce((acc, key) => {
      if (inputValues[key] !== customer[key]) {
        acc[key] = inputValues[key];
      }
      return acc;
    }, {} as Record<string, any>);

    // Add the `updated_at` field to the updated data
    updatedData.updated_at = new Date().toISOString();

    // Check if there are any changes to save
    if (Object.keys(updatedData).length > 0) {
      const { error } = await supabase
        .from("customers")
        .update(updatedData)
        .eq("id", customer.id);

      if (error) {
        console.error("Error updating customer:", error.message);
      } else {
        setHasChanges(false);
      }
    }

    setSaving(false);
    router.refresh();
  };

  const renderFields = ({ title, fields }: FieldSection) => (
    <div className="flex flex-col w-full gap-2">
      {title && <h3 className="text-lg font-medium">{title}</h3>}
      <div className="w-full bg-[#F4F4F4] rounded p-4 pb-5 space-y-4">
        {fields.map((field) => (
          <div key={field.key} className="relative border-b border-[#EBEBEB]">
            <input
              type={field.type || "text"}
              value={inputValues[field.key] || ""}
              onChange={(e) =>
                handleChange(field.key, field.editable!, e.target.value)
              }
              onFocus={() => handleFocus(field.key)}
              onBlur={() => handleBlur(field)}
              placeholder=" "
              readOnly={!field.editable}
              className={`w-full py-1 pt-4 pb-1 text-sm bg-transparent focus:outline-none ${
                !field.editable ? "cursor-not-allowed text-gray-500" : ""
              }`}
            />
            <label
              className={`absolute left-0 flex items-center gap-0.5 bottom-1.5 transition-all duration-200 ease-in-out text-[#878484] pointer-events-none ${
                inputFocus[field.key] || inputValues[field.key]
                  ? "-translate-y-5 text-[10px]"
                  : "text-sm"
              }`}
            >
              {field.label}
              {field.required && <span className="text-[#EB6060]">*</span>}
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex flex-col items-start gap-4">
          {renderFields(personalFields)}
        </div>
        <div className="flex flex-col items-start gap-4">
          {renderFields(locationFields)}
          <div className="flex flex-col items-start gap-2">
            <p className="text-xs text-neutral-700">
              <span className=" font-medium">Created At:</span>{" "}
              {customer.created_at
                ? format(new Date(customer.created_at), "yyyy-MM-dd HH:mm:ss")
                : "N/A"}
            </p>
            <p className="text-xs text-neutral-700">
              <span className=" font-medium">Updated At:</span>{" "}
              {customer.updated_at
                ? format(new Date(customer.updated_at), "yyyy-MM-dd HH:mm:ss")
                : "N/A"}
            </p>
            <Link
              href={"/admin/search/clients/" + customer.created_by}
              target="_blank"
              className="text-xs text-primary-500 font-bold underline"
            >
              <span className="">Created by</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-end">
        <button
          onClick={handleSave}
          disabled={!hasChanges || saving}
          className={`py-[14px] px-7 text-base rounded-xl ${
            !hasChanges || saving
              ? "bg-[#04567D6B] text-white text-opacity-40"
              : "bg-[#04567D] text-white"
          }`}
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
