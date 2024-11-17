// Step2.tsx
import React from "react";
import InputField from "./InputField";

type Step2Props = {
  authenticationData: any;
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

const Step2: React.FC<Step2Props> = ({
  authenticationData,
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
  const codeField = authenticationData.verificationStep.inputField;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-medium">
          {authenticationData.verificationStep.title}
        </h2>
        <p className="text-base font-normal">
          {authenticationData.verificationStep.subtitle}
        </p>
      </div>
      <div className="flex flex-col w-full gap-2">
        <div className="w-full bg-[#F4F4F4] rounded p-4 pb-5 space-y-4">
          {/* Code Field */}
          <InputField
            type="text"
            label={codeField}
            required={true}
            value={inputValues[codeField] || ""}
            errorMessage={errors[codeField]}
            onFocus={() => handleFocus(codeField)}
            onBlur={() => handleBlur(codeField)}
            onChange={(e) => handleChange(codeField, e.target.value)}
            isFocused={inputFocus[codeField] || false}
          />
          {/* Error Message */}
        </div>
      </div>
      {errors[codeField] && (
        <p className="text-[#EB6060] text-sm">
          {authenticationData.verificationStep.errorMessage}
        </p>
      )}
      <div className="w-full flex justify-end">
        <button
          onClick={handleNext}
          disabled={!isStepValid() || saving}
          className={`whitespace-nowrap w-full py-[14px] px-7 text-base rounded-xl ${
            isStepValid() && !saving
              ? "bg-[#04567D] text-white"
              : "bg-[#04567D6B] text-white text-opacity-40"
          }`}
        >
          {saving ? "Verifying..." : authenticationData.verificationStep.cta}
        </button>
      </div>
    </div>
  );
};

export default Step2;
