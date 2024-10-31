import Image from "next/image";
import Link from "next/link";
import React from "react";

const footerData = [
  {
    title: "Information",
    links: [
      { name: "Privacy Policy", href: "/" },
      { name: "Terms of Service", href: "/" },
    ],
  },
  {
    title: "Contact",
    links: [
      { name: "info@frilansfinans.se", href: "mailto:info@frilansfinans.se" },
      { name: "Telephone:<br/>0771-15 10 00" },
      { name: "Open weekdays:<br/>09.00-17.00" },
      { name: "Sundays:<br/>Chat open 15.00-20.00" },
    ],
  },
  {
    title: "Sitemap",
    links: [
      { name: "Home", href: "/" },
      { name: "Frequently asked questions", href: "/" },
      { name: "Sign in", href: "/" },
    ],
  },
  {
    title: "Social Media",
    links: [
      { name: "Facebook", href: "/" },
      { name: "X", href: "/" },
      { name: "Instagram", href: "/" },
      { name: "LinkedIn", href: "/" },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      aria-labelledby="footer-heading"
      className="bg-primary-800 w-full h-full flex flex-col gap-20 px-4 lg:px-20 pt-[72px] lg:pt-20 pb-10"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-screen-xl w-full mx-auto grid grid-cols-1 lg:grid-cols-4 text-white gap-y-12 gap-8">
        <Image
          src="/logo.png"
          height={52}
          width={177}
          alt="Invoicery Logo"
          className="block mx-auto lg:hidden"
        />
        {footerData.map((column) => (
          <div
            key={column.title}
            className="flex flex-col items-center justify-center lg:items-start lg:justify-start gap-2 lg:gap-6"
          >
            <h5 className="font-semibold text-lg lg:text-base text-center lg:text-start leading-normal">
              {column.title}
            </h5>
            <ul className="flex text-center lg:text-start flex-col gap-4">
              {column.links.map((link) => (
                <li
                  key={link.name}
                  className="text-sm leading-normal py-0.5 font-normal"
                  style={{ letterSpacing: "0.28px" }}
                >
                  {link.href ? (
                    <Link href={link.href} className="hover:underline">
                      <span
                        dangerouslySetInnerHTML={{ __html: link.name }}
                        aria-label={link.name.replace(/<br\/>/g, " ")}
                      />
                    </Link>
                  ) : (
                    <span
                      dangerouslySetInnerHTML={{ __html: link.name }}
                      aria-label={link.name.replace(/<br\/>/g, " ")}
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t-[1px] border-primary-300 border-opacity-50 pt-10 text-center w-full">
        <span
          className="text-white text-sm"
          style={{ letterSpacing: "0.16px" }}
        >
          ©2024 - Invoicery AB
        </span>
      </div>
    </footer>
  );
}
