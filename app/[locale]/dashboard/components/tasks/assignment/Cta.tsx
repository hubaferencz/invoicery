import React from "react";

type CtaProps = {
  scrollToForm: (index: number) => void;
  ctaText: string;
};

export default function Cta({ scrollToForm, ctaText }: CtaProps) {
  return (
    <button
      onClick={() => scrollToForm(4)} // Scroll to the "Review and create" section
      className={`antialiased text-center transition-all bg-secondary-500 rounded-xl font-medium text-white w-full whitespace-nowrap shadow-md duration-300 hover:shadow-lg focus:shadow-lg`}
      type="button"
      style={{
        letterSpacing: "0.32px",
      }}
    >
      {/* Button content remains the same */}
      <div className="hover:bg-black hover:bg-opacity-10 focus:bg-black focus:bg-opacity-10 rounded-xl px-6 py-[14px] transition-all">
        {ctaText}
      </div>
    </button>
  );
}
