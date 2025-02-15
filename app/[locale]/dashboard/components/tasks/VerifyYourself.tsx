"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Passport from "./Passport";
import { uploadPersonalData } from "./uploadPersonalData";
import { useRouter } from "next/navigation";

type Field = {
  label: string;
  name: string;
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

type Props = {
  verified: boolean;
  verifyYourself: any;
};

export default function VerifyYourself({ verified, verifyYourself }: Props) {
  const router = useRouter();

  const [showPopup, setShowPopup] = useState(false);
  const [saving, setSaving] = useState(false);
  const [inputFocus, setInputFocus] = useState<{ [key: string]: boolean }>({});
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [passportFile, setPassportFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShowPopup(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const personalFields: FieldSection = {
    title: "Personal Information",
    fields: [
      {
        label: verifyYourself.personalFields.firstNameLabel,
        name: "firstNameLabel",
        required: true,
        minLength: 2,
        maxLength: 30,
        errorMessage: "Must be 2-30 characters.",
      },
      {
        label: verifyYourself.personalFields.lastNameLabel,
        name: "lastNameLabel",
        required: true,
        minLength: 2,
        maxLength: 30,
        errorMessage: "Must be 2-30 characters.",
      },
      {
        label: verifyYourself.personalFields.personalIdLabel,
        name: "personalIdLabel",
        required: true,
        minLength: 3,
        maxLength: 30,
        errorMessage: "Must be 3-30 characters.",
      },
    ],
  };

  const locationFields: FieldSection = {
    title: "Location",
    fields: [
      {
        label: verifyYourself.locationFields.addressLine1Label,
        name: "addressLine1Label",
        required: true,
        minLength: 3,
        maxLength: 30,
        errorMessage: "Must be 3-30 characters.",
      },
      {
        label: verifyYourself.locationFields.coLabel,
        name: "coLabel",
        required: false,
        minLength: 3,
        maxLength: 30,
        errorMessage: "Must be 3-30 characters.",
      },
      {
        label: verifyYourself.locationFields.zipCodeLabel,
        name: "zipCodeLabel",
        required: true,
        minLength: 3,
        maxLength: 10,
        errorMessage: "Must be 3-10 characters.",
        type: "text",
      },
      {
        label: verifyYourself.locationFields.cityLabel,
        name: "cityLabel",
        required: true,
        minLength: 2,
        maxLength: 40,
        errorMessage: "Must be 2-40 characters.",
      },
      {
        label: verifyYourself.locationFields.countryLabel,
        name: "countryLabel",
        required: true,
        minLength: 3,
        maxLength: 30,
        errorMessage: "Must be 3-30 characters.",
      },
    ],
  };

  const paymentFields: FieldSection = {
    title: "Salary Account",
    fields: [
      {
        label: verifyYourself.paymentFields.ibanLabel,
        name: "ibanLabel",
        required: true,
        minLength: 15,
        maxLength: 34,
        errorMessage: "Must be 15-34 characters.",
      },
      {
        label: verifyYourself.paymentFields.bicLabel,
        name: "bicLabel",
        required: true,
        minLength: 8,
        maxLength: 11,
        errorMessage: "Must be 8-11 characters.",
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
    if (!value && field.required) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field.label]: "This field is required.",
      }));
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
    return (
      personalFields.fields
        .concat(locationFields.fields, paymentFields.fields)
        .filter(({ required }) => required)
        .every((field) => inputValues[field.label] && !errors[field.label]) &&
      passportFile !== null
    );
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
              name={field.name}
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

  const handleSave = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent default form behavior

    setSaving(true); // Start saving animation
    setErrorMessage(null); // Clear any previous error messages

    // Get the form element
    const form = event.currentTarget.form as HTMLFormElement;

    // Create a new FormData object from the form
    const formData = new FormData(form);

    // Manually append the passport file
    if (passportFile) {
      formData.append("passport", passportFile);
    }

    try {
      await uploadPersonalData(formData); // Call the server action
      setShowPopup(false); // Close the popup only after successful completion
    } catch (err: any) {
      console.error("Error saving data:", err.message);
      setErrorMessage(err.message || "An error occurred while saving data.");
    } finally {
      setSaving(false); // Stop saving animation
      router.refresh();
    }
  };

  return (
    <div className={`${verified ? "hidden" : "block"}`}>
      {/* Verify Yourself Card */}
      <div
        className="w-full px-3 py-4 border border-[#F2F2F2] hover:border-[#d4d4d4] transition-all select-none cursor-pointer h-24 flex rounded-[9px] items-center justify-between bg-[#F2F2F2]"
        onClick={() => setShowPopup(true)}
      >
        <div className="flex items-center justify-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[#4E8A77] flex items-center justify-center">
            <Image
              src={"/icons/check.svg"}
              width={20}
              height={20}
              alt="check"
            />
          </div>
          <div className="flex flex-col items-start justify-center gap-1">
            <h2
              className="font-semibold leading-normal"
              style={{ letterSpacing: "0.16px" }}
            >
              {verifyYourself.verifyCardTitle}
            </h2>
            <p
              className="font-normal leading-normal text-xs text-[#5E5C5C]"
              style={{ letterSpacing: "0.12px" }}
            >
              {verifyYourself.verifyCardSubtitle}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center w-10 h-10">
          <Image
            src={"/icons/right.svg"}
            width={20}
            height={20}
            alt="right arrow"
          />
        </div>
      </div>

      {/* Popup overlay and content */}
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
              {/* Close button and header styling */}
              <div className="grid grid-cols-3 w-full p-4 md:p-6 items-center z-20 justify-between sm:border-b border-[#EFEFEF] md:rounded-t-md md:bg-white md:text-black bg-[#04567D] text-white pt-10 md:pt-6">
                <div className="flex items-center justify-start col-span-1">
                  <button
                  type="button"
                    onClick={() => setShowPopup(false)}
                    className="text-sm text-white md:text-[#5E5C5C] font-normal"
                  >
                    Cancel
                  </button>
                </div>
                <div className="flex items-center justify-center col-span-1 text-center">
                  <h2 className="hidden text-base font-medium md:block">
                    {verifyYourself.title}
                  </h2>
                </div>
                <div className="flex lg:hidden items-end justify-end w-full col-span-1">
                  <div className="cursor-pointer bg-white bg-opacity-20 w-10 h-10 rounded-full p-[5px] flex md:block items-center justify-center">
                    <Image
                      src={"/icons/chat.svg"}
                      width={20}
                      height={21}
                      alt="support"
                    />
                  </div>
                </div>
              </div>

              {/* Popup content */}
              <form
                encType="multipart/form-data"
                className="flex flex-col items-start gap-6 px-4 md:px-6 py-8 md:py-6"
              >
                <h2
                  className="text-xl font-medium"
                  style={{ letterSpacing: "0.2px" }}
                >
                  {verifyYourself.title}
                </h2>

                {/* Personal Info Fields */}
                {renderFields(personalFields)}

                {/* Passport Component */}
                <Passport
                  attachPassportText={
                    verifyYourself.passportSection.attachPassportText
                  }
                  selectText={verifyYourself.passportSection.selectText}
                  passportInfoBanner={
                    verifyYourself.passportSection.passportInfoBanner
                  }
                  setPassportFile={setPassportFile}
                  passportFile={passportFile}
                />

                {/* Location Fields */}
                {renderFields(locationFields)}

                {/* Payment Fields */}
                {renderFields(paymentFields)}

                {errorMessage && (
                  <div className="text-red-500 text-sm mb-2">
                    {errorMessage}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  onClick={handleSave}
                  disabled={!allFieldsValid() || saving}
                  className={`w-full py-[14px] text-base rounded-xl ${
                    allFieldsValid() && !saving
                      ? "bg-[#04567D] text-white"
                      : "bg-[#04567D6B] text-white text-opacity-40"
                  }`}
                >
                  {saving
                    ? verifyYourself.savingText
                    : verifyYourself.saveButtonText}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
