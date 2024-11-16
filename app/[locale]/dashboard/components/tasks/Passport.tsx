import Image from "next/image";
import React, { useState } from "react";

type PassportProps = {
  attachPassportText: string;
  selectText: string;
  passportInfoBanner: {
    helperTitle: string;
    helperDescription: string;
  };
  setPassportFile: React.Dispatch<React.SetStateAction<File | null>>;
  passportFile: File | null;
};

export default function Passport({
  attachPassportText,
  selectText,
  passportInfoBanner,
  setPassportFile,
  passportFile,
}: PassportProps) {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setPassportFile(file);
    setFileName(file ? file.name : null);
  };

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="w-full bg-[#F4F4F4] rounded p-4 flex justify-between">
        <span className="text-sm">{fileName || attachPassportText}</span>
        <label
          htmlFor="passport-file-input"
          className="flex items-center justify-center gap-3 cursor-pointer"
        >
          <span className="text-sm text-[#878484]">{selectText}</span>
          <div className="w-3 h-3 flex items-center justify-center">
            <Image
              src={"/icons/right.svg"}
              width={16}
              height={16}
              alt="right arrow"
              className="text-[#878484]"
            />
          </div>
        </label>
        <input
          type="file"
          id="passport-file-input"
          className="hidden"
          accept=".jpg, .png, .jpeg, .webp"
          onChange={handleFileChange}
        />
      </div>
      <div className="w-full select-none border border-[#CBE3EF] p-3 flex rounded-[9px] items-center justify-start bg-[#EEF5F8]">
        <div className="items-start justify-start gap-3 flex">
          <Image src={"/icons/info.svg"} width={20} height={20} alt="info" />
          <div className="flex flex-col items-start justify-center gap-1">
            <h3
              className="text-sm font-semibold"
              style={{ letterSpacing: "0.14px" }}
            >
              {passportInfoBanner.helperTitle}
            </h3>
            <p
              className="text-xs leading-normal"
              style={{ letterSpacing: "0.12px" }}
            >
              {passportInfoBanner.helperDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
