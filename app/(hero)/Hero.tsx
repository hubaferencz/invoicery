// (hero)/Hero.tsx

import React from 'react';
import Image from 'next/image';
import HeroCta from './HeroCta';

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
    <section className="w-full px-4 py-10 bg-primary-800 lg:py-20 lg:px-10">
      <div className="flex flex-col items-start justify-between w-full grid-cols-2 mx-auto lg:grid lg:gap-10 max-w-7xl">
        <div className="flex flex-col w-full gap-10 text-center text-white lg:gap-12 lg:text-start">
          <div className="flex flex-col gap-4 items-center lg:items-start">
            <h1 className="text-[32px] lg:text-[56px] font-bold leading-tight">
              {title}
            </h1>
            <h4 className="text-base font-semibold leading-normal lg:text-lg">
              {description}
            </h4>
          </div>
          {/* {cta && ( */}
            <div className="flex flex-col items-center gap-4 lg:items-start">
              <HeroCta text={"Register assignments"} link="/register" />
              {/* {cta.supportingText && ( */}
                <span className="text-sm font-medium leading-normal">
                  {/* {cta.supportingText} */}
                  Start your journey in 3 minutes!
                </span>
              {/* )} */}
            </div>
          {/* )} */}
          <div className="flex flex-col items-center gap-6 lg:justify-start lg:flex-row">
            <Image
              src="/hero/certificate.svg"
              height={72}
              width={72}
              alt="auktoriserat egenanställningsföretag 2023 EAFB INVOICERY"
            />
            {/* Uncomment this section when needed */}
            {/* <div className="hidden lg:flex gap-[13px] items-center justify-start">
              <span className="text-base font-semibold leading-normal ">
                Excellent
              </span>
              <Image
                src="/hero/stars.svg"
                height={20}
                width={107}
                alt="INVOICERY Trustpilot stars"
              />
              <span className="text-sm font-semibold leading-normal whitespace-nowrap">
                436 <span className="font-normal">reviews on</span>
              </span>
              <Image
                src="/hero/trustpilot.svg"
                height={20}
                width={81}
                alt="Trustpilot logo"
              />
            </div> */}
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
