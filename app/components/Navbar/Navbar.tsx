"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Asap } from "next/font/google";
import Cta from "../Cta";
import LanguageDropdown from "./LanguageDropdown";

const asap = Asap({ subsets: ["latin"] });

type NavLink = {
  title: string;
  route: string;
};

type Props = {};

const languages = [
  { name: "Bulgarian", code: "bg" },
  { name: "Spanish", code: "es" },
  { name: "Czech", code: "cs" },
  { name: "Danish", code: "da" },
  { name: "German", code: "de" },
  { name: "Estonian", code: "et" },
  { name: "Greek", code: "el" },
  { name: "English", code: "en" },
  { name: "French", code: "fr" },
  { name: "Irish", code: "ga" },
  { name: "Croatian", code: "hr" },
  { name: "Italian", code: "it" },
  { name: "Latvian", code: "lv" },
  { name: "Lithuanian", code: "lt" },
  { name: "Hungarian", code: "hu" },
  { name: "Maltese", code: "mt" },
  { name: "Dutch", code: "nl" },
  { name: "Polish", code: "pl" },
  { name: "Portuguese", code: "pt" },
  { name: "Romanian", code: "ro" },
  { name: "Slovak", code: "sk" },
  { name: "Slovenian", code: "sl" },
  { name: "Finnish", code: "fi" },
  { name: "Swedish", code: "sv" },
  { name: "Norwegian", code: "no" },
];

// NavbarLink function should return JSX
function NavbarLink({ title, route }: NavLink) {
  return (
    <Link href={route}>
      <div className="hover:bg-black text-white hover:bg-opacity-10 rounded-full px-4 py-3 transition-all duration-300">
        {title}
      </div>
    </Link>
  );
}

export default function Navbar({}: Props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSelectLanguage = (language: string) => {
    setSelectedLanguage(language);
    setDropdownOpen(false); // Close dropdown after selection
  };

  const links: NavLink[] = [
    { title: "Contact us", route: "/contact-us" },
    { title: "Questions and answers", route: "/qa" },
  ];

  return (
    <>
      <nav className="w-full px-4 lg:py-[30px] bg-primary-800 lg:px-10">
        <div className="flex flex-col items-center justify-between w-full grid-cols-2 mx-auto lg:grid lg:gap-10 max-w-7xl">
          <div className="flex gap-10 items-center justify-start">
            <Image src={"/logo.png"} alt="Logo" width={137} height={40} />
            <div className="flex gap-4 items-center justify-center">
              {links.map((link) => (
                <NavbarLink
                  key={link.route}
                  title={link.title}
                  route={link.route}
                />
              ))}
            </div>
          </div>
          <div
            className={`${asap.className} flex gap-4 items-center justify-end font-medium`}
          >
            <button
              onClick={toggleDropdown}
              className="text-white py-[14px] transition-all duration-300 flex gap-1 items-center"
            >
              {selectedLanguage}
              <Image
                src={"/icons/down-chev.svg"}
                width={24}
                height={24}
                alt="open language dropdown"
                className={`transform transition-transform duration-300 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Language Dropdown */}

            <Link href={"/sign-in"}>
              <div className="text-white hover:bg-black hover:bg-opacity-10 rounded-xl px-3 py-[14px] transition-all duration-300">
                {"Sign in"}
              </div>
            </Link>

            <Cta text="Create account" link="/create-account" />
          </div>
        </div>
      </nav>
      <div
        className={`transition-all overflow-hidden text-sm font-medium max-h-0 duration-500 ease-in-out ${
          dropdownOpen ? "max-h-96 h-min" : ""
        }`}
      >
        <LanguageDropdown
          languages={languages}
          selectedLanguage={selectedLanguage}
          onSelect={handleSelectLanguage}
        />
      </div>
    </>
  );
}
