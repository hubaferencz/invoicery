"use client";
import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Welcome from "./components/Welcome";
import Tasks from "./components/tasks/Tasks";
import Errands from "./components/errands/Errands";
import How from "./components/how-it-works/How";
import VerifiedHow from "./components/how-it-works/VerifiedHow";

export default () => {
  const [verified, setVerified] = useState(false);
  return (
    <main className="flex overflow-x-clip w-full bg-[#F4F4F4]">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Welcome />
        <div className="flex w-full lg:p-6 lg:gap-6">
          <div className=" flex flex-col max-w-full items-start w-full justify-start gap-2 lg:gap-6 ">
            <Tasks setVerified={setVerified} verified={verified} />
            <Errands />
          <How verified={verified} />
          </div>
          {/* <VerifiedHow verified={verified}/> */}
          {/* <div className="w-full bg-slate-600 h-min">
          <VerifiedHow verified={verified}/>
          </div> */}
        </div>
      </div>
    </main>
  );
};
