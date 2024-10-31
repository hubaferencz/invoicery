import React from "react";
import VerifyYourself from "./VerifyYourself";
import RegisterAssignment from "./RegisterAssignment";

type Props = {};

export default function Tasks({}: Props) {
  return (
    <div className="bg-white max-w-[778px] p-6 w-full mx-auto lg:mx-0 grid grid-cols-1 md:grid-cols-2 gap-6 rounded-sm">
      <VerifyYourself />
      <RegisterAssignment />
    </div>
  );
}
