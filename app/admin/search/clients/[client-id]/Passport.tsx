import Image from "next/image";
import React, { useState } from "react";

export default function Passport() {
  const [fileName, setFileName] = useState<string | null>(null);

  const [passportFile, setPassportFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setPassportFile(file);
    setFileName(file ? file.name : null);
  };

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="w-full bg-[#F4F4F4] rounded p-4 flex justify-between">
        <span className="text-sm">{fileName || "IMG_1307.PNG"}</span>
        <label
          htmlFor="passport-file-input"
          className="flex items-center justify-center gap-3 cursor-pointer"
        >
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
        </label>
        <input
          type="file"
          id="passport-file-input"
          className="hidden"
          accept=".jpg, .png, .jpeg, .webp"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
