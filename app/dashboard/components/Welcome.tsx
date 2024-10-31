import React from "react";

type Props = {};

export default function Welcome({}: Props) {
  return (
    <div
      className="flex h-[420px] p-6 pb-4 flex-col justify-center items-center gap-4 w-full bg-cover bg-center lg:h-[219px] lg:justify-end lg:items-start"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1)), url('/dashboard/bg.jpg')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="text-white text-center lg:text-left">
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
    </div>
  );
}
