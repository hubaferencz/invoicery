import Image from "next/image";
import React from "react";

type Props = {};

export default function Welcome({}: Props) {
  return (
    <div
      className="flex h-[420px] p-6 pb-6 lg:pb-4 flex-col justify-end items-center gap-8 w-full bg-cover bg-center lg:h-[219px] lg:justify-end lg:items-start"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1)), url('/dashboard/bg.jpg')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="text-white text-center flex flex-col gap-1 lg:text-left">
        <h1
          className="text-2xl font-medium leading-8"
          style={{ letterSpacing: "0.48px" }}
        >
          Good morning Anna
        </h1>
        <h1
          className="text-[28px] font-bold leading-9"
          style={{ letterSpacing: "0.56px" }}
        >
          What do you want to do today?
        </h1>
      </div>
      <div className="p-3 py-4 w-min gap-2 flex lg:hidden flex-col rounded-[3px] items-center justify-center bg-white">
        <div className=" p-2 aspect-square rounded-full bg-[#FF8800] flex items-center justify-center">
          <Image
            src={"/icons/write.svg"}
            width={24}
            height={24}
            alt="check"
            className="w-6 h-6"
          />
        </div>

        <h2
          className="leading-normal text-base font-medium whitespace-nowrap"
          style={{ letterSpacing: "0.20px" }}
        >
          Register assignment
        </h2>
      </div>
    </div>
  );
}
