import Image from "next/image";
import React from "react";
import Note from "./Note";
import List from "./List";

type Props = { verified: any };

export default function Errands({ verified }: Props) {
  return (
    <div className="bg-white max-w-[778px] p-6 w-full mx-auto lg:mx-0 flex flex-col gap-6 rounded-sm">
      <h2
        className="leading-normal text-xl font-medium py-0.5"
        style={{ letterSpacing: "0.20px" }}
      >
        Current errands
      </h2>
      {!verified ? <Note /> : <List />}
    </div>
  );
}
