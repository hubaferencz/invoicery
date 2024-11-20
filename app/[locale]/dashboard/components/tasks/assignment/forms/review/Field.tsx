"use client";

import React from "react";

type FieldProps = {
  label: string;

  name: string;
  required: boolean;
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  error: string | null;
  inputFocus: boolean;
};

const Field: React.FC<FieldProps> = ({
  label,

  name,
  required,
  value,
  onChange,
  onFocus,
  onBlur,
  error,
  inputFocus,
}) => {
  const shouldShowError = value && error;

  return (
    <div className="relative border-b w-full border-[#EBEBEB]">
      <input
        type="text"
        name={name}
        placeholder=" "
        className="w-full py-1 pt-4 pb-1 text-sm bg-transparent focus:outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <label
        className={`absolute left-0 bottom-1.5 flex items-center gap-0.5 text-[#878484] transition-all duration-200 ease-in-out pointer-events-none ${
          inputFocus || value ? "-translate-y-5 text-[10px]" : "text-sm"
        }`}
      >
        <span>{label}</span>
        {required && <span className="text-[#EB6060]">*</span>}
        {shouldShowError && (
          <span className="text-[#EB6060] ml-2">{error}</span>
        )}
      </label>
    </div>
  );
};

export default Field;
