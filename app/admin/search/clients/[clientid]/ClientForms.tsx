"use client";

import React, { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Passport from "./Passport";
import { format } from "date-fns";
import { revalidatePath } from "next/cache";
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
  client: any;
};

export default function ClientForms({ client }: Props) {
  const [inputValues, setInputValues] = useState(client);
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const supabase = createClient();

  const router = useRouter();
  const personalFields: FieldSection = {
    fields: [
      {
        label: "First Name",
        required: true,
        minLength: 2,
        maxLength: 30,
        key: "first_name",
        editable: true,
      },
      {
        label: "Last Name",
        required: true,
        minLength: 2,
        maxLength: 30,
        key: "last_name",
        editable: true,
      },
      {
        label: "Personal Identification Number",
        required: true,
        minLength: 3,
        maxLength: 30,
        key: "personal_identification_number",
        editable: true,
      },
      {
        label: "Phone",
        required: true,
        key: "phone",
        minLength: 2,
        maxLength: 30,
        editable: true,
      },
      {
        label: "Email (Read-Only)",
        required: false,
        key: "email",
        editable: false,
      },
    ],
  };

  const locationFields: FieldSection = {
    fields: [
      {
        label: "Address Line 1",
        required: true,
        minLength: 3,
        maxLength: 30,
        key: "address_line_1",
        editable: true,
      },
      { label: "c/o", required: false, key: "co", editable: true },
      {
        label: "ZIP Code",
        required: true,
        minLength: 3,
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
        minLength: 3,
        maxLength: 30,
        key: "country",
        editable: true,
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
        editable: true,
      },
      {
        label: "BIC",
        required: true,
        minLength: 8,
        maxLength: 11,
        key: "bic_code",
        editable: true,
      },
    ],
  };

  const handleChange = (key: string, value: string) => {
    setInputValues((prevValues: any) => {
      const updatedValues = { ...prevValues, [key]: value };
      setHasChanges(
        Object.keys(updatedValues).some(
          (field) => updatedValues[field] !== client[field]
        )
      );
      return updatedValues;
    });
  };

  const handleSave = async () => {
    setSaving(true);

    const updatedData = Object.keys(inputValues).reduce((acc, key) => {
      if (inputValues[key] !== client[key]) {
        acc[key] = inputValues[key];
      }
      return acc;
    }, {} as Record<string, any>);

    // Include updated_at timestamp
    updatedData.updated_at = new Date().toISOString();

    if (Object.keys(updatedData).length > 0) {
      const { error } = await supabase
        .from("clients")
        .update(updatedData)
        .eq("id", client.id);

      if (error) {
        console.error("Error updating client:", error.message);
      } else {
        setHasChanges(false);
      }
    }

    setSaving(false);
    setSuccessMessage("");
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
                field.editable && handleChange(field.key, e.target.value)
              }
              placeholder={field.label}
              className={`w-full py-1 pt-4 pb-1 text-sm bg-transparent focus:outline-none ${
                !field.editable ? "cursor-not-allowed text-gray-500" : ""
              }`}
              readOnly={!field.editable}
            />
            <label
              className={`absolute left-0 flex items-center gap-0.5 bottom-1.5 transition-all duration-200 ease-in-out text-[#878484] pointer-events-none ${
                inputValues[field.key]
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
          <Passport
            successMessage={successMessage}
            setSuccessMessage={setSuccessMessage}
            passportLink={inputValues.passport_photo_link}
            setInputValues={setInputValues}
            setHasChanges={setHasChanges}
            clientId={client.id}
          />
        </div>
        <div className="flex flex-col items-start gap-4">
          {renderFields(locationFields)}
          {renderFields(paymentFields)}
          <div className="flex flex-col items-start">
            <p className="text-xs text-neutral-800">
              Created At:{" "}
              {client.created_at
                ? format(new Date(client.created_at), "yyyy-MM-dd HH:mm:ss")
                : "N/A"}
            </p>
            <p className="text-xs text-neutral-800">
              Updated At:{" "}
              {client.updated_at
                ? format(new Date(client.updated_at), "yyyy-MM-dd HH:mm:ss")
                : "N/A"}
            </p>
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
