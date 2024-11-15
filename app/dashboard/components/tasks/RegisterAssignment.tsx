import Image from "next/image";
import React, { useState, useRef } from "react";
import AssignmentForm from "./assignment/forms/AssignmentForm";

export default function RegisterAssignment() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen((prev) => !prev);

  return (
    <>
      {/* Button to open the modal */}
      <div
        onClick={toggleModal}
        className="w-full select-none cursor-pointer border border-[#FFEBD5] hover:border-[#FF8800] hover:border-opacity-30 transition-all p-5 h-24 hidden lg:flex rounded-[9px] items-center justify-start bg-[#FFEBD5]"
      >
        <div className="flex items-center justify-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[#FF8800] flex items-center justify-center">
            <Image
              src={"/icons/write.svg"}
              width={20}
              height={20}
              alt="check"
            />
          </div>
          <div className="flex flex-col items-start justify-center gap-1">
            <h2
              className="text-xl font-medium leading-normal"
              style={{ letterSpacing: "0.20px" }}
            >
              Register assignment
            </h2>
          </div>
        </div>
      </div>
      <AssignmentForm toggleModal={toggleModal} isModalOpen={isModalOpen} />
    </>
  );
}
