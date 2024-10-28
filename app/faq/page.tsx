import React from "react";
import Search from "./Search";

type Props = {};

export default function Faq({}: Props) {
  return (
    <>
      <div className="absolute w-full h-28 bg-[#04567D] top-0 hidden lg:block"></div>
      <div className="w-full px-4 py-20 bg-[#04567D] text-white lg:px-10 pt-40 lg:pt-20">
        <section className="flex flex-col items-start justify-start w-full gap-10 max-w-screen-md mx-auto">
          <div className="flex flex-col items-start justify-start gap-4 text-start">
            <span className=" text-[24px] lg:text-2xl font-medium leading-normal">
              Our most common
            </span>
            <span className="text-[32px] leading-tight lg:text-[56px] font-bold">
              Questions and answers
            </span>
          </div>
          <Search />
          {/* <Cta text="To the FAQ" link="/faq" /> */}
        </section>
      </div>
    </>
  );
}
