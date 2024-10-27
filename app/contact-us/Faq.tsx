import React from "react";
import Cta from "./Cta";

type Props = {};

export default function Faq({}: Props) {
  return (
    <div className="w-full px-4 py-20 bg-primary-500 text-white lg:px-10">
      <section className="flex flex-col items-start justify-start w-full gap-10">
        <div className="flex flex-col items-center justify-center gap-6 text-center max-w-screen-lg mx-auto">
          <div className="text-[28px] leading-tight lg:text-[40px] gap-1.5 md:gap-0 flex flex-col md:flex-row font-extrabold">
            Find the answers here in our FAQ!
          </div>
          <p className="text-base font-normal leading-normal">
            Here you will find answers to your questions and needs.
            <br />
            If you do not find the answer here or have additional questions, do
            not hesitate to contact us!
          </p>
        </div>

        <Cta text="To the FAQ" link="/faq" />
      </section>
    </div>
  );
}
