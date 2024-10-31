import React from "react";
import Sidebar from "./components/Sidebar";
import Welcome from "./components/Welcome";
import Tasks from "./components/tasks/Tasks";
import Errands from "./components/errands/Errands";

type Props = {};

export default function page({}: Props) {
  return (
    <main className="flex overflow-x-clip w-full bg-[#F4F4F4]">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Welcome />
        <div className=" flex flex-col items-start w-full justify-start gap-2 lg:gap-6 lg:p-6">
          <Tasks />
          <Errands />
        </div>
      </div>
    </main>
  );
}
