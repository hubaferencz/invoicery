import React from "react";
import VerifyYourself from "./VerifyYourself";
import RegisterAssignment from "./RegisterAssignment";

type Props = { verified: any; setVerified: any };

export default function Tasks({ verified, setVerified }: Props) {
  return (
    <div
      className={`bg-white max-w-[778px] p-4 lg:p-6 w-full mx-auto lg:mx-0 grid grid-cols-1 ${
        !verified && "md:grid-cols-2"
      } gap-6 rounded-sm`}
    >
      <h2
        className="leading-normal text-xl font-medium py-0.5 block md:hidden"
        style={{ letterSpacing: "0.20px" }}
      >
        To do
      </h2>

      <VerifyYourself setVerified={setVerified} verified={verified} />
      <RegisterAssignment />
    </div>
  );
}
