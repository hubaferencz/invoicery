// (hero)/Hero.tsx

import React from "react";
import Image from "next/image";

type HeroProps = {
  title: string;
  description: string;
  // cta: { title: string; supportingText?: string } | null;
  heroImage: string | null;
  heroImageAlt: string;
};

export default function Hero({
  title,
  description,
  // cta,
  heroImage,
  heroImageAlt,
}: HeroProps) {
  return (
    <section
      aria-labelledby="hero-title"
      aria-describedby="hero-description"
      className="w-full px-4 py-10 bg-[#04567D] lg:py-20 lg:px-10"
    >
      <div className="flex flex-col items-center justify-between w-full grid-cols-2 mx-auto lg:grid lg:gap-10 max-w-7xl">
        <div className="flex flex-col w-full gap-10 text-center text-white lg:gap-12 lg:text-start">
          <div className="flex flex-col gap-4 items-center lg:items-start">
            <h1
              id="hero-title"
              className="text-[32px] lg:text-[56px] font-bold leading-tight"
            >
              {title}
            </h1>
            <p
              id="hero-description"
              className="text-base font-semibold leading-normal hidden lg:block lg:text-lg"
            >
              {description}
            </p>
          </div>
        </div>
        {heroImage && (
          <Image
            src={heroImage}
            alt={heroImageAlt}
            width={620}
            height={500}
            className="hidden w-full lg:block rounded-2xl"
          />
        )}
      </div>
    </section>
  );
}
