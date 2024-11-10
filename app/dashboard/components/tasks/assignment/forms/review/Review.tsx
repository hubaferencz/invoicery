"use client";

import React, { useState } from "react";
import Field from "./Field";

export default function Review() {
  const [inputFocus, setInputFocus] = useState<{ [key: string]: boolean }>({});
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [isToggled, setIsToggled] = useState(false); // State for the toggle switch

  const handleFocus = (field: string) =>
    setInputFocus((prev) => ({ ...prev, [field]: true }));

  const handleBlur = (field: string) => {
    setInputFocus((prev) => ({ ...prev, [field]: false }));
    validateField(field, inputValues[field] || "");
  };

  const handleChange = (field: string, value: string) => {
    setInputValues((prev) => ({ ...prev, [field]: value }));
    if (inputFocus[field]) validateField(field, value);
  };

  const validateField = (field: string, value: string) => {
    const validations: { [key: string]: (value: string) => boolean } = {
      email: (val) => /\S+@\S+\.\S+/.test(val),
      countryCode: (val) => /^[a-zA-Z]{2,4}$/.test(val),
      phoneNumber: (val) => /^\d{6,15}$/.test(val),
      profession: (val) => val.length >= 4 && val.length <= 30,
    };

    const errorMessages: { [key: string]: string } = {
      email: "Please enter a valid email address.",
      countryCode: "2-4 letters",
      phoneNumber: "6-15 digits",
      profession: "Must be between 4 and 30 characters.",
    };

    if (validations[field] && !validations[field](value)) {
      setErrors((prev) => ({ ...prev, [field]: errorMessages[field] }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const allFieldsValid = () =>
    ["email", "countryCode", "phoneNumber", "profession"].every(
      (field) => inputValues[field] && !errors[field]
    );

  return (
    <div className="flex flex-col items-start gap-6">
      <div className="flex flex-col items-start gap-4 bg-[#F4F4F4] rounded p-4 pb-5 w-full">
        {/* Email Field */}
        <Field
          label="Enter your email address"
          required={true}
          value={inputValues.email || ""}
          onChange={(value) => handleChange("email", value)}
          onFocus={() => handleFocus("email")}
          onBlur={() => handleBlur("email")}
          error={errors.email}
          inputFocus={inputFocus.email || false}
        />

        {/* Country Code and Phone Number in a single row */}
        <div className="flex w-full gap-4">
          <div className="w-1/4">
            <Field
              label="Country code"
              required={true}
              value={inputValues.countryCode || ""}
              onChange={(value) => handleChange("countryCode", value)}
              onFocus={() => handleFocus("countryCode")}
              onBlur={() => handleBlur("countryCode")}
              error={errors.countryCode}
              inputFocus={inputFocus.countryCode || false}
            />
          </div>
          <div className="w-3/4">
            <Field
              label="Enter your phone number"
              required={true}
              value={inputValues.phoneNumber || ""}
              onChange={(value) => handleChange("phoneNumber", value)}
              onFocus={() => handleFocus("phoneNumber")}
              onBlur={() => handleBlur("phoneNumber")}
              error={errors.phoneNumber}
              inputFocus={inputFocus.phoneNumber || false}
            />
          </div>
        </div>

        {/* Profession Field */}
        <Field
          label="Enter profession"
          required={true}
          value={inputValues.profession || ""}
          onChange={(value) => handleChange("profession", value)}
          onFocus={() => handleFocus("profession")}
          onBlur={() => handleBlur("profession")}
          error={errors.profession}
          inputFocus={inputFocus.profession || false}
        />
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-medium">Approve and register</h3>
        <div className="flex items-center gap-3 p-4 border rounded">
          <p className="text-sm ">
            I have taken note of the General terms and conditions applicable as
            of this date, the agreement on general fixed-term employment and the
            attachment on the processing of personal data.
          </p>
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
        disabled={!allFieldsValid()}
        className={`w-full py-[14px] text-base rounded-xl ${
          allFieldsValid()
            ? "bg-[#04567D] text-white"
            : "bg-[#04567D6B] text-white text-opacity-40"
        }`}
      >
        Submit
      </button> */}

      <button
        className={` text-center transition-all bg-secondary-500 rounded-xl font-medium text-white w-full whitespace-nowrap shadow-md duration-300 hover:shadow-lg focus:shadow-lg`}
        style={{
          letterSpacing: "0.32px",
        }}
      >
        <div className="hover:bg-black hover:bg-opacity-10 focus:bg-black focus:bg-opacity-10 rounded-xl px-6 py-[14px] transition-all">
          Register assignment
        </div>
      </button>
    </div>
  );
}
