"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Cta from "../components/Cta";

type Advantages = {
  rank: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
};

type AdvantagesProps = {
  advantages: Advantages[];
};

export default function Advantages({ advantages }: AdvantagesProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>(
    {
      loop: false,
      slides: {
        perView: 1.1,
        spacing: 16,
      },
      slideChanged(s) {
        setCurrentSlide(s.track.details.rel);
      },
    },
    []
  );

  return (
    <section className="bg-teal-100 lg:py-[100px] py-[72px] px-4 lg:px-10">
      <div className="max-w-screen-[1360px] mx-auto flex flex-col items-center justify-center">
      <div className="flex flex-col gap-10 mx-auto lg:gap-12">
        <div className="flex flex-col items-center justify-center gap-4 lg:gap-6 lg:px-36">
          <div className="text-[28px] leading-tight text-center lg:text-[40px] gap-1.5 md:gap-0 flex flex-col font-extrabold">
            <span>Safe and easy</span>
            <span className="text-teal-600 md:pl-2">
              for you and your customers
            </span>
          </div>
          <p
            className="text-base font-normal leading-normal text-center"
            style={{
              letterSpacing: "0.16px",
            }}
          >
            With us, you can feel safe when invoicing without your own company.
            Since 1999, we've enabled more than 150,000 self-employed people to
            do their thing. We are today Sweden's leading self-employment
            company.
          </p>
        </div>
        <div className="flex flex-col items-start justify-center gap-10">
          <div className="items-start justify-center hidden grid-cols-3 gap-6 lg:grid">
            {advantages.map((advantage) => (
              <div
                key={advantage.rank}
                className="flex flex-col items-start justify-start h-full gap-6 p-6 text-left text-black bg-white rounded-xl"
              >
                {/* Icon */}
                <div className="p-4 mb-4 bg-teal-600 rounded-full aspect-square">
                  <Image
                    src={`/icons/${advantage.icon}.svg`}
                    className="w-6 h-6"
                    alt={advantage.icon}
                    width={24}
                    height={24}
                  />
                </div>
                <div className="flex flex-col items-start justify-start gap-1">
                  <h3 className="text-base font-medium leading-normal lg:text-2xl">
                    {advantage.title}
                  </h3>
                  <span
                    className="text-base font-normal leading-normal"
                    style={{
                      letterSpacing: "0.16px",
                    }}
                  >
                    {advantage.subtitle}
                  </span>
                </div>
                <p
                  className="text-base font-normal leading-normal text-start"
                  style={{
                    letterSpacing: "0.16px",
                  }}
                >
                  {advantage.description}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-start justify-start w-full gap-8 px-0 lg:hidden">
            <div ref={sliderRef} className="keen-slider">
              {advantages.map((advantage) => (
                <div
                  key={advantage.rank}
                  className="flex flex-col items-start justify-start min-h-full gap-6 p-6 text-left text-black bg-white keen-slider__slide rounded-xl"
                >
                  {/* Icon */}
                  <div className="p-4 mb-4 bg-teal-600 rounded-full aspect-square">
                    <Image
                      src={`/icons/${advantage.icon}.svg`}
                      className="w-6 h-6"
                      alt={advantage.icon}
                      width={24}
                      height={24}
                    />
                  </div>
                  <div className="flex flex-col items-start justify-start gap-1">
                    <h3 className="text-base font-medium leading-normal lg:text-2xl">
                      {advantage.title}
                    </h3>
                    <span
                      className="text-base font-normal leading-normal"
                      style={{
                        letterSpacing: "0.16px",
                      }}
                    >
                      {advantage.subtitle}
                    </span>
                  </div>
                  <p
                    className="text-base font-normal leading-normal text-start"
                    style={{
                      letterSpacing: "0.16px",
                    }}
                  >
                    {advantage.description}
                  </p>
                </div>
              ))}
            </div>
            {/* Dots Navigation */}
            <div className="flex justify-center w-full gap-8">
              {advantages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => slider.current?.moveToIdx(idx)}
                  className={`w-4 h-4 rounded-full ${
                    currentSlide === idx ? "bg-[#04567D]" : "bg-[#D7D7D7]"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="hidden rounded-xl lg:block">
              <Image
                src={"/box.png"}
                width={1000}
                height={416}
                className="w-full h-[416px] object-cover rounded-xl"
                alt="test"
              />
            </div>
            <div className="flex flex-col items-start justify-center w-full gap-10 px-10 py-16 bg-white rounded-xl lg:py-6">
              <div className="flex flex-col items-start justify-center gap-6">
                <h3 className="text-[32px] lg:text-[40px] font-bold leading-tight">
                  We only keep 6% <br />
                  of the invoice amount
                </h3>
                <p
                  className="text-base font-normal leading-normal text-[#5E5C5C]"
                  style={{
                    letterSpacing: "0.16px",
                  }}
                >
                  Creating an account is free of charge. Only when invoices are
                  created do we keep 6% of the invoice amount.
                </p>
              </div>
              <Cta link="/" text="Create account" />
            </div>
          </div>
        </div>
      </div></div>
    </section>
  );
}
