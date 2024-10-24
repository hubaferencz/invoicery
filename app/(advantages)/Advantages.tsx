"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

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

        perView: 1.1  , // Show 1 full card and part of the next one
        spacing: 16, // Space between slides
      },
      slideChanged(s) {
        setCurrentSlide(s.track.details.rel);
      },
    },
    []
  );

  return (
    <section className="bg-teal-100 lg:py-[100px] py-[72px] px-4 lg:px-10">
      <div className="flex flex-col gap-10 lg:gap-12">
        {/* Header */}
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

        {/* Grid layout for lg screens and above */}
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

        {/* Slider for screens below lg */}
        <div className="flex flex-col items-start justify-start w-full gap-8 px-0 lg:hidden">
          <div
            ref={sliderRef}
            className="keen-slider"
          >
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
                  currentSlide === idx ? "bg-teal-600" : "bg-[#D7D7D7]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
