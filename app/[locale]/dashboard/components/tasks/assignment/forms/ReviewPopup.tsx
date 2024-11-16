"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Field from "./review/Field";

export default function ReviewPopup({
  reviewData,
  onClose,
  setIsToggled,
  isToggled,
  sendButtonText
}: {
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
    responsiveFields: {
      popupTitle: string;
      label: string;
      nextStepText: string;
    };
  };
  onClose: () => void;
  setIsToggled: (value: boolean) => void;
  isToggled: boolean;
  sendButtonText: string;
}) {
  const [step, setStep] = useState(1);
  const [inputFocus, setInputFocus] = useState<{ [key: string]: boolean }>({});
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [bothStepsCompleted, setBothStepsCompleted] = useState(false);

  const allFieldsValid = ["email", "phoneNumber", "profession"].every(
    (field) => inputValues[field] && !errors[field]
  );

  useEffect(() => {
    if (allFieldsValid && isToggled) {
      setBothStepsCompleted(true);
    } else {
      setBothStepsCompleted(false);
    }
  }, [allFieldsValid, isToggled]);

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
      phoneNumber: (val) => /^\d{6,15}$/.test(val),
      profession: (val) => val.length >= 4 && val.length <= 30,
    };

    const errorMessages: { [key: string]: string } = {
      email: "Please enter a valid email address.",
      phoneNumber: "6-15 digits",
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
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-full lg:max-w-[556px] rounded-t-md lg:rounded-md z-10"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="grid grid-cols-3 w-full p-4 items-center border-b border-[#EFEFEF] rounded-t-md bg-white text-black">
            <div className="flex md:hidden items-center justify-start col-span-1">
              <button
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
          {renderStepIndicator()}
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
                    <Field
                      label={reviewData.fields.email}
                      required={true}
                      value={inputValues.email || ""}
                      onChange={(value) => handleChange("email", value)}
                      onFocus={() => handleFocus("email")}
                      onBlur={() => handleBlur("email")}
                      error={errors.email}
                      inputFocus={inputFocus.email || false}
                    />
                    <Field
                      label={reviewData.fields.phone}
                      required={true}
                      value={inputValues.phoneNumber || ""}
                      onChange={(value) => handleChange("phoneNumber", value)}
                      onFocus={() => handleFocus("phoneNumber")}
                      onBlur={() => handleBlur("phoneNumber")}
                      error={errors.phoneNumber}
                      inputFocus={inputFocus.phoneNumber || false}
                    />
                    <Field
                      label={reviewData.fields.profession}
                      required={true}
                      value={inputValues.profession || ""}
                      onChange={(value) => handleChange("profession", value)}
                      onFocus={() => handleFocus("profession")}
                      onBlur={() => handleBlur("profession")}
                      error={errors.profession}
                      inputFocus={inputFocus.profession || false}
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
                  <div className="flex items-center gap-3 p-4 border rounded">
                    <p className="text-sm">{reviewData.fields.agreementText}</p>
                    <div
                      className={`${
                        isToggled ? "bg-[#20B098]" : "bg-[#CECECE]"
                      } max-w-14 w-full px-0.5 h-8 rounded-full flex items-center transition-colors duration-300 cursor-pointer`}
                      // @ts-ignore
                      onClick={() => setIsToggled((prev: any) => !prev)}
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
            <button
              onClick={handleNextStep}
              disabled={
                (step === 1 && !allFieldsValid) || (step === 2 && !isToggled)
              }
              className={`w-full py-[14px] text-white font-medium text-base rounded-xl ${
                step === 1
                  ? allFieldsValid
                    ? "bg-[#04567D]"
                    : "bg-[#04567D6B]"
                  : isToggled
                  ? "bg-[#F80]"
                  : "bg-[#F80] bg-opacity-45"
              }`}
            >
              {step === 1
                ? reviewData.responsiveFields.nextStepText
                : sendButtonText}
            </button>
          </div>
        </motion.div>
      </motion.div>
      {isPopupOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-md"
          onClick={handleSuccessClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-t-lg sm:rounded-lg flex flex-col w-full z-[70]"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.2 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 50 }}
            dragElastic={0.1}
            onDragEnd={(e, info) => {
              if (info.offset.y > 100) handleSuccessClose();
            }}
            style={{
              bottom: 0,
              position: "absolute",
              width: "100%",
            }}
          >
            <div className="p-4 sm:p-6 flex items-center justify-between">
              <div className="flex justify-center w-full">
                <div className="w-8 h-1.5 bg-[#CECECE] rounded-full"></div>
              </div>
            </div>
            <div className="flex flex-col items-center p-4 gap-4 pb-20">
              <h2
                className=" text-2xl font-medium"
                style={{ letterSpacing: "0.48px" }}
              >
                {reviewData.successPopup.title}
              </h2>
              <Image
                src={"/icons/review/done.svg"}
                width={125}
                height={125}
                className="py-2"
                alt="done"
              />
              <div className="flex items-start flex-col text-start justify-start gap-2">
                <h3 className=" text-lg font-semibold">
                  {reviewData.successPopup.subtitle}
                </h3>
                <p
                  className="text-sm font-normal leading-snug"
                  style={{ letterSpacing: "0.14px" }}
                >
                  {reviewData.successPopup.description}
                </p>
              </div>
              <button
                onClick={handleSuccessClose}
                className={`w-full py-[14px] text-base rounded-xl bg-[#04567D] text-white`}
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
