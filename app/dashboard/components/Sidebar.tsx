import Image from "next/image";
import React from "react";
import Link from "next/link";

type Props = {};

export default function Sidebar({}: Props) {
  return (
    <>
      <nav
        className={`hidden lg:flex max-w-[260px] w-full p-6 flex-col items-start bg-white min-h-screen justify-start border-r border-[#EFEFEF] gap-14`}
      >
        <div className=" bg-[#04567D] p-4 rounded-[9px]">
          <Image src={"/logo.svg"} height={26} width={24} alt="logo" />
        </div>
        <div className="gap-4 flex w-full  flex-col items-start justify-start">
          <Link
            href={"/dashboard"}
            className={`px-3 rounded-md w-full flex items-center gap-3 justify-star py-2.5 ${
              true ? "bg-primary-100" : "bg-white"
            }`}
            style={{
              boxShadow: "0px 2px 8px 0px rgba(153, 153, 153, 0.20)",
            }}
          >
            <div className="bg-white  rounded-md flex items-center justify-center p-1">
              <Image
                src={"/icons/home.svg"}
                width={16}
                height={16}
                alt="home"
                className=" w-4 h-4"
              />
            </div>
            <span
              className="text-[#04567D] font-medium"
              style={{ letterSpacing: "0.16px" }}
            >
              Home
            </span>
          </Link>
          <div className="border-t border-[#EBEBEB] w-full"></div>
          <div
            className={`px-3 rounded-md w-full flex items-center gap-3 justify-star py-2.5 cursor-pointer hover:bg-red-50 transition-all`}
          >
            <div className="bg-white  rounded-md flex items-center justify-center p-1">
              <Image
                src={"/icons/sign-out.svg"}
                width={16}
                height={16}
                alt="home"
                className=" w-4 h-4"
              />
            </div>
            <span
              className="text-black font-medium"
              style={{ letterSpacing: "0.16px" }}
            >
              Sign out
            </span>
          </div>
        </div>
      </nav>
      <nav
        aria-label="Primary navigation"
        className="w-full pt-12 pb-4 bg-white bg-opacity-10 px-4 flex justify-between items-center fixed lg:hidden z-30"
      >
        <Image src={"/dashboard/logo.png"} height={24} width={180} alt="logo" />
        <div className="flex gap-4 items-center justify-end">
          <div className=" cursor-pointer bg-white bg-opacity-20 w-10 h-10 rounded-full p-[5px] flex items-center justify-center">
            <Image
              src={"/icons/chat.svg"}
              width={20}
              height={21}
              alt="support"
            />
          </div>
          <div className=" cursor-pointer bg-white bg-opacity-20 w-10 h-10 rounded-full p-[5px] flex items-center justify-center">
            <Image
              src={"/icons/leave.svg"}
              width={20}
              height={21}
              alt="support"
            />
          </div>
        </div>
      </nav>
    </>
  );
}
