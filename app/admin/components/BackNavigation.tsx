"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

type BackNavigationProps = {
  fallbackRoute?: string; // Default fallback route (e.g., "/admin")
  title?: string; // Optional title to display
};

const BackNavigation: React.FC<BackNavigationProps> = ({
  fallbackRoute = "/admin", // Default fallback route
  title = "Back", // Default title for the button
}) => {
  return (
    <Link
      href={fallbackRoute}
      className="flex items-center justify-center gap-1 select-none"
    >
      <Image src={"/back.svg"} width={20} height={20} alt="Back" />
      <h2 className="text-sm font-normal">{title}</h2>
    </Link>
  );
};

export default BackNavigation;
