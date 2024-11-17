import Image from "next/image";
import Link from "next/link";
import React from "react";

interface FooterProps {
  logo: {
    src: string;
    alt: string;
  };
  sections: {
    title: string;
    links: { name: string; href: string | null }[];
  }[];
  contactInfo: {
    type: string;
    contactValue: string | null;
    hoursDescription: string | null;
    linkText: string | null;
    linkURL: string | null;
  }[];
  socialMedia: {
    name: string;
    link: string;
  }[];
  copyrightText: string;
}

export default function Footer({
  logo,
  sections,
  contactInfo,
  socialMedia,
  copyrightText,
}: FooterProps) {
  return (
    <footer
      aria-labelledby="footer-heading"
      className="bg-primary-800 w-full h-full flex flex-col gap-20 px-4 lg:px-20 pt-[72px] lg:pt-20 pb-10"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-screen-xl w-full mx-auto grid grid-cols-1 lg:grid-cols-4 text-white gap-y-12 gap-8">
        {/* Logo */}
        <Image
          src={logo.src}
          height={52}
          width={177}
          alt={logo.alt || ""}
          className="block mx-auto lg:hidden"
        />

        {/* Dynamic Sections */}
        {sections.map((section) => (
          <div
            key={section.title}
            className="flex flex-col items-center justify-center lg:items-start lg:justify-start gap-2 lg:gap-6"
          >
            <h5 className="font-semibold text-lg lg:text-base text-center lg:text-start leading-normal">
              {section.title}
            </h5>
            <ul className="flex text-center lg:text-start flex-col gap-4">
              {section.links.map((link) => (
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

        {/* Contact Section */}
        <div className="flex flex-col items-center justify-center lg:items-start lg:justify-start gap-2 lg:gap-6">
          <h5 className="font-semibold text-lg lg:text-base text-center lg:text-start leading-normal">
            Contact
          </h5>
          <ul className="flex text-center lg:text-start flex-col gap-4">
            {contactInfo.map((info, index) => (
              // this is crude but if its explicitly 0771-15 10 00 dont display it
              <li
                key={index}
                className="text-sm leading-normal py-0.5 font-normal"
                style={{ letterSpacing: "0.28px" }}
              >
                {info.contactValue && (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: info.contactValue.replace(/\n/g, "<br/>"),
                    }}
                  />
                )}
                {info.hoursDescription && (
                  <p
                    className="text-xs mt-1"
                    dangerouslySetInnerHTML={{
                      __html: info.hoursDescription.replace(/\n/g, "<br/>"),
                    }}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center justify-center lg:items-start lg:justify-start gap-2 lg:gap-6">
          <h5 className="font-semibold text-lg lg:text-base text-center lg:text-start leading-normal">
            Social Media
          </h5>
          <ul className="flex text-center lg:text-start flex-col gap-4">
            {socialMedia.map((social) => (
              <li key={social.name}>
                <Link
                  href={social.link}
                  className="text-sm hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t-[1px] border-primary-300 border-opacity-50 pt-10 text-center w-full">
        <span
          className="text-white text-sm"
          style={{ letterSpacing: "0.16px" }}
        >
          {copyrightText}
        </span>
      </div>
    </footer>
  );
}
