import React, { useEffect, useState } from "react";

type Props = {
  description: {
    instructions: string; // Instructions text
    placeholder: string; // Placeholder for textarea
    minLength: number; // Minimum length for validation
    maxLength: number; // Maximum length for validation
  };
  setIsDescriptionValid: (isValid: boolean) => void;
};

export default function Description({
  description: { instructions, placeholder, minLength, maxLength },
  setIsDescriptionValid,
}: Props) {
  const [descriptionText, setDescriptionText] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionText(event.target.value); // Update the state with the input value
  };

  useEffect(() => {
    setIsDescriptionValid(descriptionText.trim() !== "");
  }, [descriptionText, setIsDescriptionValid]);

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <p
        className="text-sm font-normal leading-normal text-black"
        style={{ letterSpacing: "0.16px" }}
      >
        {instructions}
      </p>
      <textarea
        className="w-full min-h-32 p-3 border border-[#EFEFEF] rounded resize-none focus:outline-none text-xs placeholder:text-xs"
        placeholder={placeholder}
        name={"workDescription"}
        value={descriptionText} // Bind the state value to the input
        onChange={handleChange}
        minLength={minLength}
        maxLength={maxLength}
        //   value={textareaValue}
        //   onChange={(e) => setTextareaValue(e.target.value)}
      />
    </div>
  );
}
