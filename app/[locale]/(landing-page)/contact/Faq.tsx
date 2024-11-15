import React from "react";
import Cta from "./Cta";

type FaqProps = {
  title: string;
  description: string;
  ctaText: string;
  locale: string;
};

export default function Faq({ title, description, ctaText, locale }: FaqProps) {
  return (
    <section
      aria-labelledby="faq-heading"
      className="w-full px-4 py-20 bg-primary-500 text-white lg:px-10"
    >
      <div className="flex flex-col items-start justify-start w-full gap-10">
        <div className="flex flex-col items-center justify-center gap-6 text-center max-w-screen-lg mx-auto">
          <h2
            id="faq-heading"
            className="text-[28px] leading-tight lg:text-[40px] gap-1.5 md:gap-0 flex flex-col md:flex-row font-extrabold"
          >
            {title}
          </h2>
          <p className="text-base font-normal leading-normal">{description}</p>
        </div>

        <Cta text={ctaText} link={`/${locale}/faq`} />
      </div>
    </section>
  );
}
