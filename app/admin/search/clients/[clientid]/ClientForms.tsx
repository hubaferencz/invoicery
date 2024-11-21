"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import Passport from "./Passport";

type Field = {
  label: string;
  required: boolean;
  minLength?: number;
  maxLength?: number;
  type?: string; // "text", "number", etc.
  errorMessage?: string;
  key: string; // Maps to database field
};

type FieldSection = {
  title?: string;
  fields: Field[];
};

type Props = {
  client: any;
};

export default function ClientForms({ client }: Props) {
  const [inputValues, setInputValues] = useState(client);
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [saving, setSaving] = useState(false);

  const supabase = createClient();

  const personalFields: FieldSection = {
    fields: [
      {
        label: "First name",
        required: true,
        minLength: 2,
        maxLength: 30,
        errorMessage: "Must be 2-30 characters.",
        key: "first_name",
      },
      {
        label: "Last name",
        required: true,
        minLength: 2,
        maxLength: 30,
        errorMessage: "Must be 2-30 characters.",
        key: "last_name",
      },
      {
        label: "Personal identification number",
        required: true,
        minLength: 3,
        maxLength: 30,
        errorMessage: "Must be 3-30 characters.",
        key: "personal_identification_number",
      },
    ],
  };

  const locationFields: FieldSection = {
    fields: [
      {
        label: "Address line 1",
        required: true,
        minLength: 3,
        maxLength: 30,
        key: "address_line_1",
      },
      { label: "c/o", required: false, minLength: 3, maxLength: 30, key: "co" },
      {
        label: "ZIP code",
        required: true,
        minLength: 3,
        maxLength: 10,
        key: "zip_code",
      },
      {
        label: "City",
        required: true,
        minLength: 2,
        maxLength: 10,
        key: "city",
      },
      {
        label: "Country",
        required: true,
        minLength: 3,
        maxLength: 30,
        key: "country",
      },
    ],
  };

  const paymentFields: FieldSection = {
    title: "Salary Account",
    fields: [
      {
        label: "IBAN",
        required: true,
        minLength: 15,
        maxLength: 34,
        key: "iban_code",
      },
      {
        label: "BIC",
        required: true,
        minLength: 8,
        maxLength: 11,
        key: "bic_code",
      },
    ],
  };

  const professionFields: FieldSection = {
    title: "Profession",
    fields: [
      {
        label: "Profession",
        required: true,
        minLength: 2,
        maxLength: 34,
        key: "profession",
      },
    ],
  };

  const handleChange = (key: string, value: string) => {
    setInputValues((prevValues: any) => ({ ...prevValues, [key]: value }));
  };

  const validateField = (field: Field, value: string) => {
    if (field.required && !value) {
      return field.errorMessage || "This field is required.";
    }
    if (field.minLength && value.length < field.minLength) {
      return field.errorMessage || `Minimum ${field.minLength} characters.`;
    }
    if (field.maxLength && value.length > field.maxLength) {
      return field.errorMessage || `Maximum ${field.maxLength} characters.`;
    }
    return null;
  };

  const handleSave = async () => {
    setSaving(true);

    // Only send fields that have been changed
    const updatedData = Object.keys(inputValues).reduce((acc, key) => {
      if (inputValues[key] !== client[key]) {
        acc[key] = inputValues[key];
      }
      return acc;
    }, {} as Record<string, any>);

    if (Object.keys(updatedData).length > 0) {
      const { error } = await supabase
        .from("clients")
        .update(updatedData)
        .eq("id", client.id);
      if (error) {
        console.error("Error updating client:", error.message);
      }
    }

    setSaving(false);
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
              onChange={(e) => handleChange(field.key, e.target.value)}
              placeholder={field.label}
              className="w-full py-1 pt-4 pb-1 text-sm bg-transparent focus:outline-none"
            />
            {errors[field.key] && (
              <span className="text-[#EB6060] ml-2 text-sm">
                {errors[field.key]}
              </span>
            )}
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
          {renderFields(professionFields)}
          <Passport />
          {renderFields(paymentFields)}
        </div>
        <div className="flex flex-col items-start gap-4">
          {renderFields(locationFields)}
        </div>
      </div>
      <div className="w-full flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className={`py-[14px] px-7 text-base rounded-xl ${
            saving
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
