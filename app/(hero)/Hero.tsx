import React from "react";

import Image from "next/image";
import HeroCta from "./HeroCta";

export default function Hero() {
  return (
    <section className="w-full px-4 py-10 bg-primary-800 lg:py-20 lg:px-10">
      <div className="flex flex-col items-start justify-between w-full grid-cols-2 mx-auto lg:grid lg:gap-10 max-w-7xl">
        <div className="flex flex-col w-full gap-10 text-center text-white lg:gap-12 lg:text-start">
          <div className="flex flex-col gap-4 items-start">
            <h1 className=" text-[32px] lg:text-[56px] font-bold leading-tight ">
              Guaranteed salary - for you as a freelancer
            </h1>
            <h4 className="text-base font-semibold leading-normal lg:text-lg">
              We make invoicing without a company safe and easy for you as a
              freelancer. We take care of all the paperwork and guarantee salary
              so you can be independent without feeling lonely.
            </h4>
            
          </div>
          <div className="flex flex-col items-center gap-4 lg:items-start">
            <HeroCta text="Register assignments" link="/register" />
            <span className="text-sm font-medium leading-normal ">
              Start your journey in 3 minutes!
            </span>
          </div>
          <div className="flex flex-col items-center gap-6 lg:justify-start lg:flex-row">
            <Image
              src={"/hero/certificate.svg"}
              height={72}
              width={72}
              alt="auktoriserat egenanställningsföretag 2023 EAFB INVOICERY"
            />
            {/* <div className="hidden lg:flex gap-[13px] items-center justify-start">
              <span className="text-base font-semibold leading-normal ">
                Excellent
              </span>
              <Image
                src={"/hero/stars.svg"}
                height={20}
                width={107}
                alt="INVOICERY Trustpilot stars"
              />
              <span
                className={
                  "text-sm font-semibold leading-normal whitespace-nowrap"
                }
              >
                436 <span className="font-normal">reviews on</span>
              </span>
              <Image
                src={"/hero/trustpilot.svg"}
                height={20}
                width={81}
                alt="Trustpilot logo"
              />
            </div> */}
          </div>
        </div>
        <Image
          src={"/hero/bg.png"}
          alt="Business owner standing in front of her business"
          width={620}
          height={500}
          className="hidden w-full lg:block"
        />
      </div>
    </section>
  );
}
