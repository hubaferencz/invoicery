// InputField.tsx
import React from 'react';

type InputFieldProps = {
  type?: string;
  label: string;
  value: string;
  required?: boolean;
  errorMessage?: string | null;
  onFocus: () => void;
  onBlur: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isFocused: boolean;
};

const InputField: React.FC<InputFieldProps> = ({
  type = 'text',
  label,
  value,
  required = false,
  errorMessage,
  onFocus,
  onBlur,
  onChange,
  isFocused,
}) => {
  return (
    <div className="relative border-b border-[#EBEBEB]">
      <input
        type={type}
        placeholder=" "
        className="w-full py-1 pt-4 pb-1 text-sm bg-transparent focus:outline-none"
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        onChange={onChange}
      />
      <label
        className={`absolute left-0 flex items-center gap-0.5 bottom-1.5 transition-all duration-200 ease-in-out text-[#878484] pointer-events-none ${
          isFocused || value ? '-translate-y-5 text-[10px]' : 'text-sm'
        }`}
      >
        <span>{label}</span>
        {required && <span className="text-[#EB6060]">*</span>}
        {value && errorMessage && (
          <span className="text-[#EB6060] ml-2">{errorMessage}</span>
        )}
      </label>
    </div>
  );
};

export default InputField;
