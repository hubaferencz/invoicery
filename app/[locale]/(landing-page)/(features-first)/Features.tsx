import React from "react";
import Image from "next/image";

type Feature = {
  rank: number;
  description: string;
  icon: string;
};

type FeaturesProps = {
  features: Feature[];
};

export default function Features({ features }: FeaturesProps) {
  return (
    <section
      className="grid items-start grid-cols-2 gap-y-10 gap-x-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-10"
      aria-label="Feature Highlights"
    >
      {features.map((feature) => (
        <div
          key={feature.rank}
          className="flex flex-col items-center justify-start gap-6 text-center text-black"
          role="group"
          aria-label={`Feature ${feature.rank}: ${feature.description}`}
        >
          <div className="mb-4 bg-[#EEF5F8] aspect-square rounded-full p-[18px] lg:p-[26px]">
            <Image
              src={`${feature.icon}`}
              className="w-8 h-8 lg:w-10 lg:h-10"
              alt={`${feature.icon} icon`}
              width={40}
              height={40}
            />
          </div>
          <p className="text-base font-bold leading-normal lg:text-lg">
            {feature.description}
          </p>
        </div>
      ))}
    </section>
  );
}
