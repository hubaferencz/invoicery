import React from "react";
import { Step } from "./Step";
import Cta from "./Cta";

type StepData = {
  rank: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
};

type StepsProps = {
  steps: StepData[];
  headerTitle: string;
  highlightedHeaderTitle: string;
  headerSubtitle: string;
  ctaText: string;
  ctaLink: string;
};

export default function Steps({
  steps,
  headerTitle,
  highlightedHeaderTitle,
  headerSubtitle,
  ctaText,
  ctaLink,
}: StepsProps) {
  return (
    <section
      className="flex flex-col items-start justify-start w-full gap-10 lg:gap-20 pt-36 lg:pt-0"
      aria-label="Process Steps"
    >
      <div className="flex flex-col items-center justify-center gap-6 text-center lg:px-36">
        <h2 className="text-[28px] leading-tight lg:text-[40px] gap-1.5 md:gap-0 flex flex-col md:flex-row font-extrabold">
          <span>{headerTitle}</span>
          <span className="text-[#20B098] md:pl-2">
            {highlightedHeaderTitle}
          </span>
        </h2>
        <p className="text-base font-normal leading-normal lg:text-lg lg:font-semibold">
          {headerSubtitle}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-y-10 gap-x-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-6">
        {steps.map((step) => (
          <Step
            key={step.rank}
            rank={step.rank}
            title={step.title}
            subtitle={step.subtitle}
            description={step.description}
            image={step.image}
          />
        ))}
      </div>
      <Cta text={ctaText} link={ctaLink} />
    </section>
  );
}
