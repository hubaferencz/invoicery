"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Asap } from "next/font/google";
import Cta from "../Cta";

import HeroCta from "@/app/(hero)/HeroCta";
import LanguageDropdown from "./LanguageDropdown";
import SignIn from "./SignIn";
import { usePathname } from "next/navigation";

const asap = Asap({ subsets: ["latin"] });

type NavLink = {
  title: string;
  route: string;
};

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

function NavbarLink({ title, route }: NavLink) {
  return (
    <Link
      href={route}
      className="px-4 py-3 text-white transition-all duration-300 rounded-full hover:bg-black hover:bg-opacity-10 whitespace-nowrap"
    >
      {title}
    </Link>
  );
}

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const pathname = usePathname();
  const heroImage =
    pathname === "/contact-us"
      ? "/contact-page.png"
      : pathname === "/"
      ? "/hero/hero.png"
      : null;

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const handleSelectLanguage = (language: string) => {
    setSelectedLanguage(language);
    setDropdownOpen(false);
    setIsLanguageOpen(false);
  };

  const links: NavLink[] = [
    { title: "Contact us", route: "/contact-us" },
    { title: "Questions and answers", route: "/faq" },
  ];
  useEffect(() => {
    setIsMenuOpen(false);
    setIsLanguageOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        aria-label="Primary navigation"
        className="w-full pt-12 pb-4 lg:pt-[30px] lg:pb-[30px] bg-black bg-opacity-50 lg:bg-transparent px-4 lg:px-10 fixed lg:absolute top-0 left-0 right-0 z-30"
      >
        <div className="flex items-center justify-between w-full gap-10 mx-auto max-w-7xl">
          <Link href="/" className="flex items-center" aria-label="Homepage">
            <Image src="/logo.png" alt="Logo" width={137} height={40} />
          </Link>
          <div className="items-center justify-between flex-1 hidden gap-10 lg:flex">
            <div className="flex items-center gap-4">
              {links.map((link) => (
                <NavbarLink
                  key={link.route}
                  title={link.title}
                  route={link.route}
                />
              ))}
            </div>
            <div
              className={`${asap.className} flex items-center gap-4 font-medium`}
              style={{ letterSpacing: "0.32px" }}
            >
              <button
                onClick={toggleDropdown}
                className="text-white py-[14px] transition-all duration-300 flex gap-1 items-center"
                aria-expanded={dropdownOpen}
              >
                {selectedLanguage}
                <Image
                  src="/icons/down-chev.svg"
                  width={24}
                  height={24}
                  alt="Open language dropdown"
                  className={`transform hidden lg:block transition-transform duration-300 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <Link href="/sign-in" aria-label="Sign in">
                <div className="text-white hover:bg-black hover:bg-opacity-10 rounded-xl px-3 py-[14px] transition-all duration-300">
                  Sign in
                </div>
              </Link>
              <Cta text="Create account" link="/create-account" />
            </div>
          </div>
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="text-white focus:outline-none"
              aria-label="Open mobile menu"
            >
              <Image
                src="/icons/open.svg"
                width={48}
                height={48}
                alt="Open menu"
              />
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`hidden lg:block mt-28 transition-all overflow-hidden text-sm font-medium max-h-0 duration-500 ease-in-out ${
          dropdownOpen ? "max-h-96 h-min" : ""
        }`}
        aria-expanded={dropdownOpen}
      >
        <LanguageDropdown
          languages={languages}
          selectedLanguage={selectedLanguage}
          onSelect={handleSelectLanguage}
        />
      </div>

      <div
        className={`fixed inset-0 z-40 transition-transform transform ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        } duration-500`}
      >
        <div
          className="fixed inset-0 bg-black bg-opacity-5"
          onClick={() => {
            setIsMenuOpen(false);
            setIsLanguageOpen(false);
          }}
          aria-hidden="true"
        ></div>
        <div className="fixed top-0 bottom-0 left-0 right-0 px-4 pt-8 overflow-hidden bg-primary-800">
          <div
            className={`transform transition-transform duration-300 ${
              isLanguageOpen ? "-translate-y-full" : "translate-y-0"
            }`}
          >
            <div className="flex flex-col items-center justify-center w-full h-full">
              <div
                className={`${asap.className} flex flex-col items-center gap-8 w-full mb-8`}
                style={{ letterSpacing: "0.32px" }}
              >
                <Link href={"/"}>
                  <Image src="/logo.png" alt="Logo" width={190} height={56} />
                </Link>
                <div className="flex flex-col items-center justify-center w-full gap-4">
                  <HeroCta text="Create account" link="/create-account" />
                  <SignIn />
                </div>
              </div>
              <div className="flex flex-col items-center w-full gap-8 py-8 mb-4 border-t border-b border-primary-500">
                {links.map((link) => (
                  <Link
                    href={link.route}
                    key={link.route}
                    className="text-2xl font-medium text-center text-white "
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
              <button
                onClick={() => setIsLanguageOpen(true)}
                className="text-white py-[14px] transition-all duration-300 flex gap-1 items-center"
              >
                {selectedLanguage}
                <Image
                  src="/icons/down-chev.svg"
                  width={24}
                  height={24}
                  alt="Open language dropdown"
                  className="block lg:hidden -rotate-90"
                />
              </button>
            </div>
          </div>

          <div
            className={`absolute top-0 left-0 px-4 right-0 bottom-0 bg-primary-800 pt-8 overflow-hidden transform transition-transform duration-300 ${
              isLanguageOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex flex-col h-full">
              <div className="py-1.5 border-b border-primary-500 w-full border-opacity-30">
                <button
                  onClick={() => setIsLanguageOpen(false)}
                  className="flex items-center gap-2 px-4 py-4 text-primary-300"
                  aria-label="Back to main menu"
                >
                  <Image
                    src="/icons/down-chev.svg"
                    width={24}
                    height={24}
                    alt="Back"
                    className="block lg:hidden rotate-90"
                  />
                  Back
                </button>
              </div>
              <div className="flex-1 overflow-y-auto text-white">
                <div className="flex flex-col items-center gap-4 py-4 pb-40">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      className={`py-0.5 font-bold select-none ${
                        selectedLanguage === language.name
                          ? "text-secondary-500"
                          : ""
                      }`}
                      onClick={() => handleSelectLanguage(language.name)}
                      aria-label={`Select ${language.name}`}
                    >
                      {language.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute w-full h-10 -mb-1 transform -translate-x-1/2 bottom-24 left-1/2 bg-gradient-to-t from-primary-800 to-transparent"></div>
          </div>

          <button
            onClick={() => {
              setIsMenuOpen(false);
              setIsLanguageOpen(false);
            }}
            className="absolute bottom-0 flex items-start justify-center w-full pt-4 pb-8 transform -translate-x-1/2 bg-primary-800 left-1/2 "
            aria-label="Close menu"
          >
            <Image
              src="/icons/close.svg"
              width={48}
              height={48}
              alt="Close menu"
            />
          </button>
        </div>
      </div>

      {heroImage && (
        <Image
          src={heroImage}
          alt="Hero Image"
          width={620}
          height={500}
          className="block w-full lg:hidden"
        />
      )}
    </>
  );
}
