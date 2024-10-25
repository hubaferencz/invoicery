"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Cta from "./Cta";

type ContactInfo = {
  icon: string;
  title: string;
  description: string;
  contact: string | null;
  type: string;
  action: string | null;
};

type ContactUsProps = {
  contactInfo: ContactInfo[];
};

export default function ContactUs({ contactInfo }: ContactUsProps) {
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
    <section className="px-4 py-20 bg-gray-400 lg:px-20">
      <div className="flex flex-col gap-10 mx-auto lg:gap-12 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className=" bg-green-400 w-full hidden lg:block p-10 h-full min-h-[466px]">
            <div className="bg-red-300 w-full h-full"></div>
          </div>
          <div className="flex h-min flex-col items-start justify-center w-full gap-10 px-10 py-10 bg-white bg-opacity-90 rounded-xl">
            <div className="flex flex-col items-start justify-center gap-6">
              <h3 className="text-[32px] lg:text-[40px] font-bold leading-snug">
                We are here for you
                <br />
                <span className=" text-[#04567D]">contact us</span>
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
            <Cta link="/faq" text="Our most frequently asked questions" />
          </div>
        </div>

        <div className="flex flex-col items-start justify-center gap-10">
          <div className="items-start justify-center hidden grid-cols-4 gap-6 lg:grid">
            {contactInfo.map((contact) => (
              <div
                key={contact.title}
                className="flex flex-col items-start justify-between h-full gap-6 p-6 text-left text-black bg-white rounded-md"
              >
                <div className="flex flex-col items-start justify-start gap-2">
                  <div className="p-4 mb-4 bg-[#04567D] rounded-full aspect-square">
                    <Image
                      src={`/icons/${contact.icon}.svg`}
                      className="w-6 h-6"
                      alt={contact.icon}
                      width={24}
                      height={24}
                    />
                  </div>

                  <div className="flex flex-col items-start justify-start gap-2">
                    <h3 className="text-lg font-semibold leading-normal">
                      {contact.title}
                    </h3>
                    <p
                      className="text-base font-normal leading-normal text-start"
                      style={{ letterSpacing: "0.16px" }}
                    >
                      {contact.description}
                    </p>
                  </div>
                </div>

                <div className="mt-auto text-[#04567D] text-base font-bold">
                  {contact.type === "phone" && contact.contact && (
                    <a href={`tel:${contact.contact}`} className="">
                      {contact.contact}
                    </a>
                  )}
                  {contact.type === "email" && contact.contact && (
                    <a href={`mailto:${contact.contact}`} className="">
                      {contact.contact}
                    </a>
                  )}
                  {contact.type === "link" && contact.action && (
                    <span className="">{contact.action}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-start justify-start w-full gap-8 px-0 lg:hidden">
            <div ref={sliderRef} className="keen-slider">
              {contactInfo.map((contact) => (
                <div
                  key={contact.title}
                  className="flex flex-col items-start justify-between min-h-full gap-6 p-4 text-left text-black bg-white rounded-md keen-slider__slide"
                >
                  <div className="flex flex-col items-start justify-start gap-2 mb-2">
                    <div className="p-4 mb-4 bg-[#04567D] rounded-full aspect-square">
                      <Image
                        src={`/icons/${contact.icon}.svg`}
                        className="w-6 h-6"
                        alt={contact.icon}
                        width={24}
                        height={24}
                      />
                    </div>

                    <div className="flex flex-col items-start justify-start gap-1">
                      <h3 className="text-lg font-medium leading-normal">
                        {contact.title}
                      </h3>
                    </div>
                    <p
                      className="text-base font-normal leading-normal text-start"
                      style={{ letterSpacing: "0.16px" }}
                    >
                      {contact.description}
                    </p>
                  </div>

                  <div className="py-2 mt-auto text-base font-bold text-primary-800">
                    {contact.type === "phone" && contact.contact && (
                      <a href={`tel:${contact.contact}`} className="">
                        {contact.contact}
                      </a>
                    )}
                    {contact.type === "email" && contact.contact && (
                      <a href={`mailto:${contact.contact}`} className="">
                        {contact.contact}
                      </a>
                    )}
                    {contact.type === "link" && contact.action && (
                      <span className="">{contact.action}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center w-full gap-8">
              {contactInfo.map((_, idx) => (
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
        </div>
      </div>
    </section>
  );
}
