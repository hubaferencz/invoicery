// Step3.tsx
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Step3Props = {
  authenticationData: any;
  handleNext: () => void;
};

const Step3: React.FC<Step3Props> = ({ authenticationData, handleNext }) => {
  return (
    <div className="flex flex-col gap-6 text-center">
      <h2 className=" text-[28px] pt-8 md:pt-0 font-medium">
        {authenticationData.welcomeStep.title}
      </h2>
      <div className=" w-40 h-40 flex items-center justify-center aspect-square mx-auto">
        <Image src={"/wave.svg"} width={100} height={100} alt="wave"/>
      </div>
      <p className="text-base font-normal">{authenticationData.welcomeStep.subtitle}</p>
      <div className="w-full flex justify-end">
        <Link
          href={"dashboard"}
          className="whitespace-nowrap w-full py-[14px] px-7 text-base rounded-xl bg-[#04567D] text-white"
        >
          {authenticationData.welcomeStep.cta}
        </Link>
      </div>
    </div>
  );
};

export default Step3;
