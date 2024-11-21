"use client";

import React, { useState, useEffect } from "react";
import Field from "./Field";
import toast from "react-hot-toast";

type Props = {
  reviewData: {
    title: string;
    subtitle: string;
    fields: {
      email: string;
      phone: string;
      profession: string;
      agreementText: string;
    };
    successPopup: {
      title: string;
      subtitle: string;
      description: string;
    };
  };
  sendButtonText: string;
  handleSave: any;
  saving: boolean;
  allFieldsValid: boolean;
  clientEmail?: string | null;
  clientPhone?: string | null;
  clientProfession?: string | null;
};

export default function Review({
  reviewData,
  handleSave,
  saving,
  allFieldsValid,
  sendButtonText,
  clientEmail,
  clientPhone,
  clientProfession,
}: Props) {
  const [inputFocus, setInputFocus] = useState<{ [key: string]: boolean }>({});
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [isToggled, setIsToggled] = useState(false); // State for the toggle switch

  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({
    email: clientEmail || "", // Prefill with clientEmail if exists
    phone: clientPhone || "", // Prefill with clientPhone if exists
    profession: clientProfession || "", // Prefill with clientProfession if exists
  });

  const handleFocus = (field: string) =>
    setInputFocus((prev) => ({ ...prev, [field]: true }));

  const handleBlur = (field: string) => {
    setInputFocus((prev) => ({ ...prev, [field]: false }));
    validateField(field, inputValues[field] || "");
  };

  const handleChange = (field: string, value: string) => {
    setInputValues((prev) => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const validateField = (field: string, value: string) => {
    const validations: { [key: string]: (value: string) => boolean } = {
      email: (val) => /\S+@\S+\.\S+/.test(val),
      phone: (val) => /^\d{6,15}$/.test(val),
      profession: (val) => val.length >= 4 && val.length <= 30,
    };

    const errorMessages: { [key: string]: string } = {
      email: "Please enter a valid email address.",
      phone: "Phone number must be 6-15 digits.",
      profession: "Profession must be between 4 and 30 characters.",
    };

    if (validations[field] && !validations[field](value)) {
      setErrors((prev) => ({ ...prev, [field]: errorMessages[field] }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  // Ensure all fields and toggle switch are valid
  const allLocalFieldsValid = () =>
    ["email", "phone", "profession"].every(
      (field) => inputValues[field] && !errors[field]
    ) &&
    isToggled &&
    allFieldsValid;

  return (
    <div className="flex flex-col items-start gap-6">
      <div className="flex flex-col items-start gap-4 bg-[#F4F4F4] rounded p-4 pb-5 w-full">
        {/* Email Field */}
        <Field
          label={reviewData.fields.email}
          required={true}
          name={"clientEmail"}
          value={inputValues.email}
          onChange={(value) => handleChange("email", value)}
          onFocus={() => handleFocus("email")}
          onBlur={() => handleBlur("email")}
          error={errors.email}
          inputFocus={inputFocus.email || false}
        />

        {/* Phone Field */}
        <Field
          label={reviewData.fields.phone}
          required={true}
          name={"clientPhone"}
          value={inputValues.phone}
          onChange={(value) => handleChange("phone", value)}
          onFocus={() => handleFocus("phone")}
          onBlur={() => handleBlur("phone")}
          error={errors.phone}
          inputFocus={inputFocus.phone || false}
        />

        {/* Profession Field */}
        <Field
          label={reviewData.fields.profession}
          required={true}
          name={"clientProfession"}
          value={inputValues.profession}
          onChange={(value) => handleChange("profession", value)}
          onFocus={() => handleFocus("profession")}
          onBlur={() => handleBlur("profession")}
          error={errors.profession}
          inputFocus={inputFocus.profession || false}
        />
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-medium">{reviewData.title}</h3>
        <div className="flex items-center gap-4 p-4 border rounded">
          <p className="text-sm">{reviewData.fields.agreementText}</p>
          {/* Toggle Switch */}
          <div
            className={`${
              isToggled ? "bg-[#20B098]" : "bg-[#CECECE]"
            } max-w-14 w-full px-0.5 h-8 rounded-full flex items-center transition-colors duration-300 cursor-pointer`}
            onClick={() => setIsToggled((prev) => !prev)}
          >
            <div
              className={`bg-white w-7 h-7 rounded-full transition-all duration-300 transform ${
                isToggled ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      {/* <button
        disabled={!allLocalFieldsValid() || saving}
        formAction={allLocalFieldsValid() ? handleSave : () => {}}
        className={`w-full py-[14px] text-base rounded-xl ${
          allLocalFieldsValid() && !saving
            ? "bg-[#04567D] text-white"
            : "bg-[#04567D6B] text-white text-opacity-40 cursor-not-allowed"
        }`}
      >
        {saving ? "Sending..." : sendButtonText}
      </button> */}
      <button
        disabled={!allLocalFieldsValid() || saving} // Check this condition
        onClick={allLocalFieldsValid() ? handleSave : () => {}}
        type="submit"
        className={`w-full py-[14px] text-base rounded-xl ${
          allLocalFieldsValid() && !saving
            ? "bg-[#04567D] text-white"
            : "bg-[#04567D6B] text-white text-opacity-40 cursor-not-allowed"
        }`}
      >
        {saving ? "Sending..." : sendButtonText || "Send"}
      </button>
    </div>
  );
}
