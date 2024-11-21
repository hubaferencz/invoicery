"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Field from "./review/Field";

type ReviewData = {
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
  responsiveFields: {
    popupTitle: string;
    label: string;
    nextStepText: string;
  };
};

type Props = {
  saving: boolean;
  reviewData: ReviewData;
  onClose: () => void;
  handleSave: any;
  setIsToggled: (value: boolean) => void;
  isToggled: boolean;
  sendButtonText: string;
  inputValues: any;
  setInputValues: any;
};

export default function ReviewPopup({
  saving,
  reviewData,
  onClose,
  inputValues,
  setInputValues,
  handleSave,
  setIsToggled,
  isToggled,
  sendButtonText,
}: Props) {
  type FieldKey = "email" | "phoneNumber" | "profession";

  const [step, setStep] = useState<number>(1);
  const [inputFocus, setInputFocus] = useState<Record<FieldKey, boolean>>({
    email: false,
    phoneNumber: false,
    profession: false,
  });

  const [errors, setErrors] = useState<Record<FieldKey, string | null>>({
    email: null,
    phoneNumber: null,
    profession: null,
  });
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [bothStepsCompleted, setBothStepsCompleted] = useState<boolean>(false);

  const allFieldsValid = (
    ["email", "phoneNumber", "profession"] as FieldKey[]
  ).every((field) => inputValues[field] && !errors[field]);

  useEffect(() => {
    if (allFieldsValid && isToggled) {
      setBothStepsCompleted(true);
    } else {
      setBothStepsCompleted(false);
    }
  }, [allFieldsValid, isToggled]);

  const handleFocus = (field: FieldKey) =>
    setInputFocus((prev) => ({ ...prev, [field]: true }));

  const handleBlur = (field: FieldKey) => {
    setInputFocus((prev) => ({ ...prev, [field]: false }));
    validateField(field, inputValues[field] || "");
  };

  const handleChange = (field: FieldKey, value: string) => {
    setInputValues((prev: any) => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const validateField = (field: FieldKey, value: string) => {
    const validations: Record<FieldKey, (value: string) => boolean> = {
      email: (val) => /\S+@\S+\.\S+/.test(val),
      phoneNumber: (val) => val.length >= 6 && val.length <= 15,
      profession: (val) => val.length >= 4 && val.length <= 30,
    };

    const errorMessages: Record<FieldKey, string> = {
      email: "Please enter a valid email address.",
      phoneNumber: "Must be between 6 and 15 characters.",
      profession: "Must be between 4 and 30 characters.",
    };

    if (validations[field] && !validations[field](value)) {
      setErrors((prev) => ({ ...prev, [field]: errorMessages[field] }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleNextStep = () => {
    if (step === 1 && allFieldsValid) {
      setStep(2);
    } else if (step === 2 && isToggled) {
      setIsPopupOpen(true);
    }
  };

  const handleSuccessClose = () => {
    setIsPopupOpen(false);
    window.location.reload();
  };

  const renderStepIndicator = () => (
    <div className="p-4 pt-6">
      <div className="flex items-center justify-between relative">
        <div className="flex flex-col items-center">
          <button
            type="button"
            onClick={() => setStep(1)}
            disabled={!bothStepsCompleted}
            className={`w-12 h-12 flex items-center justify-center rounded-full border ${
              step > 1 || bothStepsCompleted
                ? "bg-[#3A7663] border-[#3A7663]"
                : step === 1
                ? "bg-[#CBE3EF] border-[#CBE3EF]"
                : "bg-transparent border-[#EFEFEF]"
            } ${step === 1 ? "shadow-lg shadow-gray-300/50" : ""}`}
          >
            <Image
              src={`/icons/review/checklist-${
                step > 1 || bothStepsCompleted
                  ? "complete"
                  : step === 1
                  ? "active"
                  : "inactive"
              }.svg`}
              alt={`${reviewData.responsiveFields.label} 1`}
              width={24}
              height={24}
            />
          </button>
        </div>
        <div
          className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-0.5"
          style={{
            backgroundColor:
              step > 1 || bothStepsCompleted ? "#CBE3EF" : "#EFEFEF",
            marginLeft: "calc(6rem / 2)",
            marginRight: "calc(6rem / 2)",
          }}
        ></div>
        <div className="flex flex-col items-center">
          <button
            onClick={() => setStep(2)}
            type="button"
            disabled={!bothStepsCompleted}
            className={`w-12 h-12 flex items-center justify-center rounded-full border ${
              isToggled || bothStepsCompleted
                ? "bg-[#3A7663] border-[#3A7663]"
                : step === 2
                ? "bg-[#CBE3EF] border-[#CBE3EF]"
                : "bg-transparent border-[#EFEFEF]"
            } ${step === 2 ? "shadow-lg shadow-gray-300/50" : ""}`}
          >
            <Image
              src={`/icons/review/send-${
                isToggled || bothStepsCompleted
                  ? "complete"
                  : step === 2
                  ? "active"
                  : "inactive"
              }.svg`}
              alt={`${reviewData.responsiveFields.label} 2`}
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>
      <div className="flex justify-between mt-2">
        <span
          className={`text-sm max-w-12 text-center w-full ${
            step >= 1 || bothStepsCompleted ? "" : "text-[#CECECE]"
          }`}
        >
          {reviewData.responsiveFields.label} 1
        </span>
        <span
          className={`text-sm max-w-12 text-center w-full ${
            step >= 2 || bothStepsCompleted ? "" : "text-[#CECECE]"
          }`}
        >
          {reviewData.responsiveFields.label} 2
        </span>
      </div>
    </div>
  );

  return (
    <>
      <motion.div
        className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black bg-opacity-50"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="bg-white w-full lg:max-w-[556px] rounded-t-md lg:rounded-md z-10"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Header */}
          <div className="grid grid-cols-3 w-full p-4 items-center border-b border-[#EFEFEF] rounded-t-md bg-white text-black">
            <div className="flex md:hidden items-center justify-start col-span-1">
              <button
                type="button"
                onClick={onClose}
                className="text-sm text-[#5E5C5C] font-normal"
              >
                Cancel
              </button>
            </div>
            <div className="flex items-center justify-center col-span-1 md:col-span-3 text-center">
              <h2 className="text-base font-medium">
                {reviewData.responsiveFields.popupTitle}
              </h2>
            </div>
            <div className="flex md:hidden items-end justify-end w-full col-span-1"></div>
          </div>

          {/* Step Indicator */}
          {renderStepIndicator()}

          {/* Content */}
          <div className="flex flex-col gap-4 p-4">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-start gap-6"
                >
                  <div className="flex flex-col items-start gap-4 bg-[#F4F4F4] rounded p-4 pb-5 w-full">
                    {/* Email Field */}
                    <Field
                      label={reviewData.fields.email}
                      required={true}
                      name={""}
                      value={inputValues.email}
                      onChange={(value) => handleChange("email", value)}
                      onFocus={() => handleFocus("email")}
                      onBlur={() => handleBlur("email")}
                      error={errors.email}
                      inputFocus={inputFocus.email}
                    />

                    {/* Phone Number Field */}
                    <Field
                      label={reviewData.fields.phone}
                      required={true}
                      name={""}
                      value={inputValues.phoneNumber}
                      onChange={(value) => handleChange("phoneNumber", value)}
                      onFocus={() => handleFocus("phoneNumber")}
                      onBlur={() => handleBlur("phoneNumber")}
                      error={errors.phoneNumber}
                      inputFocus={inputFocus.phoneNumber}
                    />
                    {/* Profession Field */}
                    <Field
                      label={reviewData.fields.profession}
                      required={true}
                      name={""}
                      value={inputValues.profession}
                      onChange={(value) => handleChange("profession", value)}
                      onFocus={() => handleFocus("profession")}
                      onBlur={() => handleBlur("profession")}
                      error={errors.profession}
                      inputFocus={inputFocus.profession}
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-4"
                >
                  {/* Agreement Toggle */}
                  <div className="flex items-center gap-3 p-4 border rounded">
                    <p className="text-sm">{reviewData.fields.agreementText}</p>
                    <div
                      className={`${
                        isToggled ? "bg-[#20B098]" : "bg-[#CECECE]"
                      } max-w-14 w-full px-0.5 h-8 rounded-full flex items-center transition-colors duration-300 cursor-pointer`}
                      onClick={() => setIsToggled(!isToggled)}
                    >
                      <div
                        className={`bg-white w-7 h-7 rounded-full transition-all duration-300 transform ${
                          isToggled ? "translate-x-6" : "translate-x-0"
                        }`}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="p-4">
            {step === 1 ? (
              // Button for Step 1
              <button
                onClick={handleNextStep}
                type="button"
                disabled={!allFieldsValid}
                className={`w-full py-[14px] text-white font-medium text-base rounded-xl ${
                  allFieldsValid ? "bg-[#04567D]" : "bg-[#04567D6B]"
                }`}
              >
                {reviewData.responsiveFields.nextStepText}
              </button>
            ) : // Step 2 Buttons
            isToggled ? (
              // Submit Button when conditions are met
              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full py-[14px] text-white font-medium text-base rounded-xl bg-[#F80] "
              >
                {/* {sendButtonText} */}
                {saving ? "Sending..." : sendButtonText}
              </button>
            ) : (
              // Disabled Button when conditions are not met
              <button
                type="button"
                disabled
                className="w-full py-[14px] text-white font-medium text-base rounded-xl bg-[#F80] bg-opacity-45"
              >
                {sendButtonText}
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
