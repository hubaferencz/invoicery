"use client";
import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Welcome from "./components/welcome/Welcome";
import Tasks from "./components/tasks/Tasks";
import Errands from "./components/errands/Errands";
import How from "./components/how-it-works/How";
import VerifiedHow from "./components/how-it-works/VerifiedHow";
import Tools from "./components/tools/Tools";

export default () => {
  const [verified, setVerified] = useState(true);
  return (
    <main className="flex overflow-x-clip  w-full bg-[#F4F4F4]">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Welcome />
        <div className="flex flex-col items-center justify-center w-full gap-2 xl:flex-row lg:items-start lg:justify-start lg:p-6 lg:gap-6">
          <div className="flex flex-col max-w-[778px] w-full items-start gap-2 lg:gap-6">
            <Tasks setVerified={setVerified} verified={verified} />
            <Errands verified={verified} />
            <How verified={verified} />
          </div>
          <div className="flex flex-col items-start w-full gap-6 xl:max-w-min">
            {verified && <VerifiedHow verified={verified} />}
            {verified && <Tools />}
          </div>
        </div>
      </div>
    </main>
  );
};
