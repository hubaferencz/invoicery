// Step1.tsx
import React from "react";
import InputField from "./InputField";

type Step1Props = {
  authenticationData: any;
  signInUser: any;
  inputValues: { [key: string]: string };
  inputFocus: { [key: string]: boolean };
  errors: { [key: string]: string | null };
  handleFocus: (fieldLabel: string) => void;
  handleBlur: (fieldLabel: string) => void;
  handleChange: (fieldLabel: string, value: string) => void;
  handleNext: () => void;
  isStepValid: any;
  saving: boolean;
};

const Step1: React.FC<Step1Props> = ({
  authenticationData,
  signInUser,
  inputValues,
  inputFocus,
  errors,
  handleFocus,
  handleBlur,
  handleChange,
  handleNext,
  isStepValid,
  saving,
}) => {
  const emailField = authenticationData.createAccountStep.emailField;

  return (
    <form action={signInUser} className="flex flex-col gap-6">
      <h2 className="text-xl font-medium">
        {authenticationData.loginTitle}
      </h2>
      <div className="flex flex-col w-full gap-2">
        <div className="w-full bg-[#F4F4F4] rounded p-4 pb-5 space-y-4">
          {/* Email Field */}
          <InputField
            type="email"
            name="email"
            label={emailField}
            required={true}
            value={inputValues[emailField] || ""}
            errorMessage={errors[emailField]}
            onFocus={() => handleFocus(emailField)}
            onBlur={() => handleBlur(emailField)}
            onChange={(e) => handleChange(emailField, e.target.value)}
            isFocused={inputFocus[emailField] || false}
          />
          {/* Phone Field */}
        </div>
      </div>
      <div className="w-full flex justify-end">
        <button
          onClick={handleNext}
          type="submit"
          disabled={!isStepValid() || saving}
          className={`whitespace-nowrap w-full py-[14px] px-7 text-base rounded-xl ${
            isStepValid() && !saving
              ? "bg-[#04567D] text-white"
              : "bg-[#04567D6B] text-white text-opacity-40"
          }`}
        >
          {saving
            ? "Sending code..."
            : authenticationData.verificationStep.cta}
        </button>
      </div>
    </form>
  );
};

export default Step1;
