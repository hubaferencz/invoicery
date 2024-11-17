"use client";
import ChevronIcon from "@/app/[locale]/components/ChevronIcon";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

type Props = {};

// Define the type for each PDF item
type PDFItem = {
  id: number;
  name: string;
  date: string;
};

// Define the type for each category
type PDFCategory = {
  title: string;
  items: PDFItem[];
};

export default function UploadPDFs({}: Props) {
  // Data for the categories
  const pdfCategories: PDFCategory[] = [
    {
      title: "Invoices",
      items: [
        { id: 1, name: "Invoice 001.pdf", date: "2023-10-01" },
        { id: 2, name: "Invoice 002.pdf", date: "2023-09-01" },
        { id: 3, name: "Invoice 003.pdf", date: "2023-08-01" },
      ],
    },
    {
      title: "Salary specifications",
      items: [
        { id: 4, name: "Salary Spec 001.pdf", date: "2023-07-01" },
        { id: 5, name: "Salary Spec 002.pdf", date: "2023-06-01" },
      ],
    },
    {
      title: "Assignment agreement",
      items: [],
    },
    {
      title: "Employment contract",
      items: [],
    },
    {
      title: "Other PDFs",
      items: [{ id: 6, name: "Other Document 001.pdf", date: "2023-05-01" }],
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {pdfCategories.map((category, index) => (
        <PDFCategoryComponent key={index} category={category} />
      ))}
    </div>
  );
}

type CategoryProps = {
  category: PDFCategory;
};

function PDFCategoryComponent({ category }: CategoryProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-[#CECECE] p-6 rounded-md flex flex-col items-start justify-start w-full">
      {/* Header */}
      <div className="flex flex-col gap-4 md:gap-0 md:flex-row items-center justify-between h-12 w-full">
        <h3 className="text-sm font-medium text-black">
          {category.title} ({category.items.length})
        </h3>
        <div className="flex gap-4 h-full">
          <Link
            href=""
            className="h-full min-h-full rounded hover:bg-neutral-100 transition-all text-black border border-[#808080] px-6 flex items-center justify-center"
          >
            <span>Upload PDF</span>
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="h-full min-h-full font-medium rounded-xl bg-primary-300 transition-all text-[#04567D] border border-primary-300 px-6 gap-3 flex items-center justify-center"
          >
            <span>{isOpen ? "Hide all" : "Show all"}</span>
            <ChevronIcon
              color="#04567D"
              className={`transform transition-transform duration-300 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
        </div>
      </div>
      {/* Dropdown Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[1000px]" : "max-h-0"
        } w-full`}
      >
        {category.items.length > 0 ? (
          <ul className="mt-6 flex flex-col gap-2 w-full">
            {category.items.map((item) => (
              <li
                key={item.id}
                className=" p-1 md:p-4 bg-[#F4F4F4] rounded-md flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-black">{item.name}</p>
                  <p className="text-xs text-neutral-500">{item.date}</p>
                </div>
                <div className="flex gap-6 items-center justify-center">
                  <Link
                    href="#"
                    className="text-neutral-400 hover:text-primary-600 transition-all hover:underline"
                  >
                    Download
                  </Link>
                  <Image
                    src={"/trash.svg"}
                    width={16}
                    height={16}
                    alt=""
                    className="cursor-pointer"
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-4 w-full text-center text-sm text-neutral-500">
            No uploaded PDFs yet.
          </div>
        )}
      </div>
    </div>
  );
}
