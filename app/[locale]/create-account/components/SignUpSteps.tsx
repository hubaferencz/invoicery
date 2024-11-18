// SignUpSteps.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Link from "next/link";

export default function SignUpSteps({
  authenticationData,
  createUser,
  verifyUser,
  locale,
}: {
  authenticationData: any;
  createUser: any;
  verifyUser: any;
  locale: string;
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [inputFocus, setInputFocus] = useState<{ [key: string]: boolean }>({});
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [saving, setSaving] = useState(false);

  const handleFocus = (fieldLabel: string) =>
    setInputFocus((prevFocus) => ({ ...prevFocus, [fieldLabel]: true }));

  const handleBlur = (fieldLabel: string) => {
    setInputFocus((prevFocus) => ({ ...prevFocus, [fieldLabel]: false }));
    validateField(fieldLabel, inputValues[fieldLabel] || "");
  };

  const handleChange = (fieldLabel: string, value: string) => {
    setInputValues((prevValues) => ({ ...prevValues, [fieldLabel]: value }));
    validateField(fieldLabel, value);
  };

  const validateField = (fieldLabel: string, value: string) => {
    let errorMessage: string | null = null;

    if (!value) {
      errorMessage = "This field is required.";
    } else {
      // Additional validation based on fieldLabel
      if (fieldLabel === authenticationData.createAccountStep.emailField) {
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errorMessage = "Please enter a valid email address.";
        }
      } else if (
        fieldLabel === authenticationData.createAccountStep.phoneField
      ) {
        // Phone number validation (simple)
        if (value.length < 6) {
          errorMessage = "Please enter a valid phone number.";
        }
      } else if (
        fieldLabel === authenticationData.verificationStep.inputField
      ) {
        // Code validation (assuming 6-digit code)
        if (value.length !== 6 || !/^\d+$/.test(value)) {
          errorMessage = "Please enter a valid 6-digit code.";
        }
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [fieldLabel]: errorMessage }));
  };

  const isStepValid = () => {
    if (currentStep === 1) {
      const emailField = authenticationData.createAccountStep.emailField;
      const phoneField = authenticationData.createAccountStep.phoneField;

      return (
        inputValues[emailField] &&
        !errors[emailField] &&
        inputValues[phoneField] &&
        !errors[phoneField]
      );
    } else if (currentStep === 2) {
      const codeField = authenticationData.verificationStep.inputField;
      return inputValues[codeField] && !errors[codeField];
    }
    return true;
  };

  const handleNext = () => {
    if (isStepValid()) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      } else {
        // Finish the signup process
        console.log("Signup complete!");
      }
    } else {
      // Highlight errors
      console.log("Please fix errors before proceeding.");
    }
  };

  // Animation variants for Framer Motion
  const variants = {
    enter: { x: 300, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -300, opacity: 0 },
  };

  return (
    <div>
      <div
        className={`fixed inset-0 z-50 flex md:items-center items-end justify-center
             `}
      >
        <div className="bg-white md:max-w-md rounded-md overflow-clip z-10 w-full">
          {/* Popup Header */}
          {currentStep !== 3 && (
            <div className="grid grid-cols-3 w-full p-4 md:p-6 items-center border-b border-[#EFEFEF] rounded-t-md bg-white text-black">
              <div className="flex items-center justify-start col-span-1">
                <Link
                  href={"/" + locale}
                  className="text-sm text-[#5E5C5C] font-normal"
                >
                  Close
                </Link>
              </div>

              <div className="flex md:hidden items-end justify-end w-full col-span-1"></div>
            </div>
          )}

          {/* Popup Content */}

          <div className="flex flex-col gap-6 overflow-hidden p-4 md:p-6">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-6"
                >
                  <Step1
                    createUser={createUser}
                    authenticationData={authenticationData}
                    inputValues={inputValues}
                    inputFocus={inputFocus}
                    errors={errors}
                    handleFocus={handleFocus}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    handleNext={handleNext}
                    isStepValid={isStepValid}
                    saving={saving}
                  />
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-6"
                >
                  <Step2
                    authenticationData={authenticationData}
                    inputValues={inputValues}
                    verifyUser={verifyUser}
                    inputFocus={inputFocus}
                    errors={errors}
                    handleFocus={handleFocus}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    handleNext={handleNext}
                    isStepValid={isStepValid}
                    saving={saving}
                  />
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-6"
                >
                  <Step3
                    authenticationData={authenticationData}
                    handleNext={handleNext}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
