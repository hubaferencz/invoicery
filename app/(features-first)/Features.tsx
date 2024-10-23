// (hero)/Hero.tsx

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
    <section className="grid items-start grid-cols-2 gap-y-10 gap-x-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-10">
      {features.map((feature) => (
        <div
          key={feature.rank}
          className="flex flex-col items-center justify-start gap-6 text-center text-black"
        >
          {/* Icon */}
          <div className="mb-4 bg-[#EEF5F8] aspect-square rounded-full p-[18px] lg:p-[26px]">
            <Image
              src={`/icons/${feature.icon}.svg`}
              className="w-8 h-8 lg:w-10 lg:h-10"
              alt={feature.icon}
              width={40}
              height={40}
            />
          </div>
          {/* Description */}
          <p className="text-base font-bold leading-normal lg:text-lg">
            {feature.description}
          </p>
        </div>
      ))}
    </section>
  );
}
