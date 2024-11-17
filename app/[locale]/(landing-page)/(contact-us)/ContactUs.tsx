"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Cta from "./Cta";
import Link from "next/link";

type ContactInfo = {
  icon: string;
  title: string;
  description: string;
  contact: string | null;
  type: string;
  action: string | null;
  url: string | null;
};

type ContactUsProps = {
  contactInfo: ContactInfo[];
  headerTitle: string;
  locale: string;
  highlightedHeaderSubtitle: string;
  headerSubtitle: string;
  faqCtaText: string;
  sectionBackgroundImage: string;
};

export default function ContactUs({
  contactInfo,
  locale,
  headerTitle,
  highlightedHeaderSubtitle,
  headerSubtitle,
  faqCtaText,
  sectionBackgroundImage,
}: ContactUsProps) {
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
    <section
      aria-labelledby="contact-heading"
      className="px-4 relative py-20 lg:px-20"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage: `url('${sectionBackgroundImage}')`,
        }}
      ></div>

      <div className="flex flex-col gap-10 mx-auto lg:gap-12 max-w-7xl bg-transparent">
        {/* Header Section */}
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="w-full hidden lg:block p-10 h-full min-h-[466px]">
            <div className="w-full h-full"></div>
          </div>
          <div className="flex z-10 h-min flex-col items-start justify-center w-full gap-10 p-4 lg:p-10 bg-white bg-opacity-90 rounded-xl">
            <header className="flex flex-col items-start justify-center gap-6">
              <h2
                id="contact-heading"
                className="text-[28px] lg:text-[40px] font-bold leading-snug"
              >
                {headerTitle}
                <br />
                <span className="text-[#04567D]">
                  {highlightedHeaderSubtitle}
                </span>
              </h2>
              <p
                className="text-base font-normal leading-normal text-[#5E5C5C]"
                style={{
                  letterSpacing: "0.16px",
                }}
              >
                {headerSubtitle}
              </p>
            </header>
            <Cta link={`/${locale}/faq`} text={faqCtaText} />
          </div>
        </div>

        {/* Contact Options Section */}
        <div className="z-10 flex flex-col items-start justify-center gap-10">
          {/* Desktop View */}
          <div className="items-start justify-center hidden grid-cols-4 gap-6 lg:grid">
            {contactInfo.map((contact) => (
              <article
                key={contact.title}
                aria-labelledby={`contact-title-${contact.title}`}
                className="flex flex-col items-start justify-between h-full gap-6 p-6 text-left text-black bg-white rounded-md"
              >
                <div className="flex flex-col items-start justify-start gap-2">
                  <div className="p-4 mb-4 bg-[#04567D] rounded-full aspect-square">
                    <Image
                      src={contact.icon}
                      className="w-6 h-6"
                      alt={contact.title}
                      width={24}
                      height={24}
                    />
                  </div>

                  <div className="flex flex-col items-start justify-start gap-2">
                    <h3
                      id={`contact-title-${contact.title}`}
                      className="text-lg font-semibold leading-normal"
                    >
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
                  {contact.type === "link" && contact.action && contact.url && (
                    <Link href={contact.url} target="_blank" className="">
                      {contact.action}
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>

          {/* Mobile Slider */}
          <div className="flex flex-col items-start justify-start w-full gap-8 px-0 lg:hidden">
            <div ref={sliderRef} className="keen-slider" aria-live="polite">
              {contactInfo.map((contact) => (
                <article
                  key={contact.title}
                  aria-labelledby={`contact-title-${contact.title}`}
                  className="flex flex-col items-start justify-between min-h-full gap-6 p-4 text-left text-black bg-white rounded-md keen-slider__slide"
                >
                  <div className="flex flex-col items-start justify-start gap-2 mb-2">
                    <div className="p-4 mb-4 bg-[#04567D] rounded-full aspect-square">
                      <Image
                        src={contact.icon}
                        className="w-6 h-6"
                        alt={contact.title || ""}
                        width={24}
                        height={24}
                      />
                    </div>

                    <div className="flex flex-col items-start justify-start gap-1">
                      <h3
                        id={`contact-title-${contact.title}`}
                        className="text-lg font-medium leading-normal"
                      >
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
                </article>
              ))}
            </div>

            {/* Dots Navigation */}
            <div
              className="flex justify-center w-full gap-8"
              aria-label="Slider navigation"
            >
              {contactInfo.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => slider.current?.moveToIdx(idx)}
                  aria-label={`Slide ${idx + 1}`}
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
