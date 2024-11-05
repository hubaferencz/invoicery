import ChevronIcon from "@/app/components/ChevronIcon";
import Image from "next/image";

export default function Tools() {
  return (
    <div className="bg-white h-min p-6 max-w-[778px] w-full flex flex-col gap-6 rounded-sm relative">
      <h2
        className="leading-normal text-xl font-medium py-0.5"
        style={{ letterSpacing: "0.20px" }}
      >
        Tools
      </h2>

      <div className="flex flex-col gap-4">
        <div className="bg-[#F4F4F4] rounded-sm overflow-clip">
        <div className="px-4 py-3 flex items-center gap-4 justify-between cursor-pointer rounded-sm hover:bg-black hover:bg-opacity-5 transition-all">
          <Image width={40} height={40} alt="icon" src={"/icons/car.svg"}/>
          <div className="flex w-full justify-between items-center">
            <span className="text-black text-sm text-start">
              Apply for mileage compensation
            </span>
            <button
              className={`w-4 h-4 aspect-square rounded-full flex items-center justify-center `}
            >
              <ChevronIcon width="16" height="16" className="-rotate-90" />
            </button>
          </div></div>
        </div>
        <div className="bg-[#F4F4F4] rounded-sm overflow-clip">
        <div className="px-4 py-3 flex items-center gap-4 justify-between cursor-pointer rounded-sm hover:bg-black hover:bg-opacity-5 transition-all">
          <Image width={40} height={40} alt="icon" src={"/icons/wallet-circle.svg"}/>
          <div className="flex w-full justify-between items-center">
            <span className="text-black text-sm text-start">
            Apply for a deduction
            </span>
            <button
              className={`w-4 h-4 aspect-square rounded-full flex items-center justify-center `}
            >
              <ChevronIcon width="16" height="16" className="-rotate-90" />
            </button>
          </div></div>
        </div>
      </div>
    </div>
  );
}
