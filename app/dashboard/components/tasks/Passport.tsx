import Image from "next/image";
import React from "react";

type Props = {};

export default function Passport({}: Props) {
  return (
    <div className="flex flex-col w-full gap-2">
      <div className="w-full bg-[#F4F4F4] rounded p-4 flex justify-between">
        <span className="text-sm">Attach passport photo</span>
        <div className="flex items-center justify-center gap-3">
          <span className="text-sm text-[#878484]">Select</span>
          <div className="w-3 h-3 flex items-center justify-center">
            <Image
              src={"/icons/right.svg"}
              width={16}
              height={16}
              alt="right arrow"
              className="text-[#878484]"
            />
          </div>
        </div>
      </div>
      <div className="w-full select-none cursor-pointer border border-[#CBE3EF] p-3 flex rounded-[9px] items-center justify-start bg-[#EEF5F8]">
        <div className="items-start justify-start gap-3 flex">
          <Image src={"/icons/info.svg"} width={20} height={20} alt="info" />
          <div className="flex flex-col items-start justify-center gap-1">
            <h3
              className="text-sm font-semibold"
              style={{ letterSpacing: "0.14px" }}
            >
              How to upload
            </h3>
            <p
              className="text-xs leading-normal"
              style={{ letterSpacing: "0.12px" }}
            >
              Please select an image that clearly shows the entire passport page
              with your face and personal information. The image must be sharp.
              Accepted file formats: jpg, png. Maximum file size: 10 MB.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
