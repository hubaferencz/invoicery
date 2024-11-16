"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Info from "./Info";
import ChevronIcon from "@/app/[locale]/components/ChevronIcon";

type Field = {
  label: string;
  required: boolean;
  minLength?: number;
  maxLength?: number;
  type?: string; // "text", "number", "email", etc.
  errorMessage?: string;
};

type FieldSection = {
  title?: string;
  fields: Field[];
};

export default function AddCustomer({
  addCustomerForm,
}: {
  addCustomerForm: any;
}) {
  const [showPopup, setShowPopup] = useState(false);
  const [saving, setSaving] = useState(false);
  const [inputFocus, setInputFocus] = useState<{ [key: string]: boolean }>({});
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShowPopup(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const personalFields: FieldSection = {
    fields: [
      {
        label: addCustomerForm.taxFields.nameLabel,
        required: true,
        minLength: 3,
        maxLength: 30,
        errorMessage: "Must be 2-30 characters.",
      },
      {
        label: addCustomerForm.taxFields.vatNumberLabel,
        required: true,
        minLength: 5,
        maxLength: 30,
        errorMessage: "Must be 5-30 characters.",
      },
    ],
  };

  const locationFields: FieldSection = {
    fields: [
      {
        label: addCustomerForm.contactFields.contactPersonLabel,
        required: true,
        minLength: 3,
        maxLength: 30,
        errorMessage: "Must be 3-30 characters.",
      },
      {
        label: addCustomerForm.contactFields.poNumberLabel,
        required: false,
        minLength: 3,
        maxLength: 30,
        errorMessage: "Must be 3-30 characters.",
      },
      {
        label: addCustomerForm.contactFields.phoneLabel,
        required: true,
        minLength: 3,
        maxLength: 17,
        errorMessage: "Must be 3-17 characters.",
        type: "tel",
      },
      {
        label: addCustomerForm.contactFields.emailLabel,
        required: true,
        minLength: 3,
        maxLength: 40,
        errorMessage: "Enter a valid email.",
        type: "email",
      },
    ],
  };

  const paymentFields: FieldSection = {
    fields: [
      {
        label: addCustomerForm.addressFields.addressLine1Label,
        required: true,
        minLength: 3,
        maxLength: 40,
        errorMessage: "Must be 3-40 characters.",
      },
      {
        label: addCustomerForm.addressFields.zipCodeLabel,
        required: true,
        minLength: 3,
        maxLength: 10,
        errorMessage: "Must be 3-10 characters.",
      },
      {
        label: addCustomerForm.addressFields.cityLabel,
        required: true,
        minLength: 2,
        maxLength: 30,
        errorMessage: "Must be 2-30 characters.",
      },
      {
        label: addCustomerForm.addressFields.countryLabel,
        required: true,
        minLength: 2,
        maxLength: 30,
        errorMessage: "Must be 2-30 characters.",
      },
    ],
  };

  const handleFocus = (fieldLabel: string) =>
    setInputFocus((prevFocus) => ({ ...prevFocus, [fieldLabel]: true }));

  const handleBlur = (field: Field) => {
    setInputFocus((prevFocus) => ({ ...prevFocus, [field.label]: false }));
    validateField(field, inputValues[field.label] || "");
  };

  const handleChange = (field: Field, value: string) => {
    setInputValues((prevValues) => ({ ...prevValues, [field.label]: value }));
    validateField(field, value);
  };

  const validateField = (field: Field, value: string) => {
    if (!value) {
      setErrors((prevErrors) => ({ ...prevErrors, [field.label]: null }));
      return;
    }

    if (field.minLength && value.length < field.minLength) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field.label]: field.errorMessage || "Invalid input.",
      }));
    } else if (field.maxLength && value.length > field.maxLength) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field.label]: field.errorMessage || "Invalid input.",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [field.label]: null }));
    }
  };

  const allFieldsValid = () => {
    return personalFields.fields
      .concat(locationFields.fields, paymentFields.fields)
      .filter(({ required }) => required)
      .every((field) => inputValues[field.label] && !errors[field.label]);
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setShowPopup(false);
      setSaving(false);
    }, 3000);
  };

  const renderFields = ({ title, fields }: FieldSection) => (
    <div className="flex flex-col w-full gap-2">
      {title && <h3 className="text-sm font-medium">{title}</h3>}
      <div className="w-full bg-[#F4F4F4] rounded p-4 pb-5 space-y-4">
        {fields.map((field, index) => (
          <div key={index} className="relative border-b border-[#EBEBEB]">
            <input
              type={field.type || "text"}
              placeholder=" "
              className="w-full py-1 pt-4 pb-1 text-sm bg-transparent focus:outline-none"
              onFocus={() => handleFocus(field.label)}
              onBlur={() => handleBlur(field)}
              value={inputValues[field.label] || ""}
              onChange={(e) => handleChange(field, e.target.value)}
            />
            <label
              className={`absolute left-0 flex items-center gap-0.5 bottom-1.5 transition-all duration-200 ease-in-out text-[#878484] pointer-events-none ${
                inputFocus[field.label] || inputValues[field.label]
                  ? "-translate-y-5 text-[10px]"
                  : "text-sm"
              }`}
            >
              <span>{field.label}</span>
              {field.required && <span className="text-[#EB6060]">*</span>}

              {inputValues[field.label] && errors[field.label] && (
                <span className="text-[#EB6060] ml-2">
                  {errors[field.label]}
                </span>
              )}
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div
        className="bg-white lg:bg-[#F4F4F4] w-full min-w-full rounded p-4 lg:p-6 flex lg:flex-col items-center justify-between lg:justify-center gap-2 cursor-pointer"
        onClick={() => setShowPopup(true)}
      >
        <Image
          src={"/assignment/CircularIcon.svg"}
          alt=""
          width={40}
          height={40}
          className="hidden w-10 h-10 rounded-full lg:block"
          style={{ boxShadow: "0px 2px 8px 0px rgba(153, 153, 153, 0.20)" }}
        />
        <span className="text-sm lg:text-base lg:font-semibold lg:text-[#04567D]">
          {addCustomerForm.title}
        </span>
        <ChevronIcon className="block w-4 h-4 -rotate-90 lg:hidden" />
      </div>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-50 md:p-10 md:overflow-y-scroll"
            onClick={() => setShowPopup(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="bg-white md:max-w-[556px] md:rounded-md z-10 w-full h-full overflow-y-scroll md:h-auto flex flex-col"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="grid grid-cols-3 w-full p-4 md:p-6 items-center z-20 justify-between border-b border-[#EFEFEF] md:rounded-t-md bg-white text-black">
                <div className="flex items-center justify-start col-span-1">
                  <button
                    onClick={() => setShowPopup(false)}
                    className="text-sm text-[#5E5C5C] font-normal"
                  >
                    Cancel
                  </button>
                </div>
                <div className="flex items-center justify-center col-span-1 text-center">
                  <h2 className="text-base font-medium">
                    {addCustomerForm.popupTitle}
                  </h2>
                </div>
                <div className="flex lg:hidden items-end justify-end w-full col-span-1"></div>
              </div>

              <div className="flex flex-col items-start gap-6 px-4 md:px-6 py-8 md:py-6">
                <h2
                  className="text-xl font-medium"
                  style={{ letterSpacing: "0.2px" }}
                >
                  {addCustomerForm.headerTitle}
                </h2>
                <div className="flex flex-col gap-2">
                  {renderFields(personalFields)}
                  <Info
                    title={addCustomerForm.taxFields.vatInfoBanner.vatInfoTitle}
                    description={
                      addCustomerForm.taxFields.vatInfoBanner.vatInfoDescription
                    }
                  />
                </div>
                {renderFields(locationFields)}
                {renderFields(paymentFields)}

                <button
                  onClick={handleSave}
                  disabled={!allFieldsValid() || saving}
                  className={`w-full py-[14px] text-base rounded-xl ${
                    allFieldsValid() && !saving
                      ? "bg-[#04567D] text-white"
                      : "bg-[#04567D6B] text-white text-opacity-40"
                  }`}
                >
                  {saving
                    ? addCustomerForm.savingText
                    : addCustomerForm.saveButtonText}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
