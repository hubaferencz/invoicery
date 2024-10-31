import React from "react";
import Sidebar from "./components/Sidebar";
import Welcome from "./components/Welcome";

type Props = {};

export default function page({}: Props) {
  return (
    <>
      <div className="flex overflow-x-clip">
        <Sidebar />
        <Welcome />
      </div>
    </>
  );
}
