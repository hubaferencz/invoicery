import React from 'react';

type InputFieldProps = {
  type: string;
  placeholder: string;
  focusPlaceholder: string;
  onInput?: (e: React.FormEvent<HTMLInputElement>) => void;
};

const InputField: React.FC<InputFieldProps> = ({ type, placeholder, focusPlaceholder, onInput }) => {
  return (
    <input
      type={type}
      className="p-4 text-sm font-normal outline outline-1 focus:outline-[#227297] transition-all text-black outline-[#EBEBEB] placeholder:text-[#878484] rounded appearance-none"
      placeholder={placeholder}
      onFocus={(e: React.FocusEvent<HTMLInputElement>) => (e.target.placeholder = focusPlaceholder)}
      onBlur={(e: React.FocusEvent<HTMLInputElement>) => (e.target.placeholder = placeholder)}
      onInput={onInput}
    />
  );
};

type AssignmentTimeProps = {};

export default function AssignmentTime({}: AssignmentTimeProps) {
  // Function to allow only positive integers for the hours input
  const handleHoursInput = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    e.currentTarget.value = value.replace(/[^0-9]/g, ''); // Removes any non-numeric characters
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-start gap-2 justify-normal">
        <h2>Select start and end date</h2>
        <div className="flex gap-4">
          <InputField type="text" placeholder="Start date" focusPlaceholder="mm/dd/yyyy" />
          <InputField type="text" placeholder="End date" focusPlaceholder="mm/dd/yyyy" />
        </div>
      </div>
      <div className="flex flex-col items-start gap-2 justify-normal">
        <h2>Enter how many hours you plan to work per week</h2>
        <div className="flex gap-4">
          <InputField
            type="number"
            placeholder="Hours"
            focusPlaceholder="Example: 8"
            onInput={handleHoursInput}
          />
        </div>
      </div>
    </div>
  );
}
