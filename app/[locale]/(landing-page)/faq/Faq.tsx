"use client";

import React, { useState } from "react";
import Image from "next/image";
import Search from "./Search";
import { Collapse } from "react-collapse";
import Cta from "./Cta";

type FaqCategory = {
  category: string;
  questions: {
    id: string;
    text: string;
    answer: string;
    optionalImage?: string;
  }[];
};

type FaqProps = {
  mainTitle: string;
  subTitle: string;
  searchPlaceholder: string;
  faqCategories: FaqCategory[];
  contactSection: {
    contactTitle: string;
    contactDescription: string | null;
    ctaText: string;
    ctaLink: string;
  };
};

function Collapsible({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: React.ReactNode;
}) {
  return (
    <Collapse
      isOpened={isOpen}
      theme={{
        collapse: "ReactCollapse--collapse",
      }}
    >
      <div>{children}</div>
    </Collapse>
  );
}

// CSS in JSX for ReactCollapse Transition
const styles = (
  <style jsx global>{`
    .ReactCollapse--collapse {
      transition: height 0.5s ease;
      overflow: hidden;
    }
    mark {
      background-color: #04567d; /* Custom background color */
      color: white; /* Custom text color */
    }
  `}</style>
);

export default function Faq({
  mainTitle,
  subTitle,
  searchPlaceholder,
  faqCategories,
  contactSection,
}: FaqProps) {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [expandedCategories, setExpandedCategories] = useState<{
    [key: number]: boolean;
  }>({});
  const [activeQuestions, setActiveQuestions] = useState<{
    [key: number]: number | null;
  }>({});
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredData = faqCategories
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (question) =>
          question.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
          question.answer.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

  const isSearching = searchTerm.length > 2;

  const toggleQuestion = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  const selectCategory = (index: number) => {
    setActiveCategory(index);
    setActiveQuestion(null);
  };

  const toggleCategory = (categoryIndex: number) => {
    setExpandedCategories((prevState) => ({
      ...prevState,
      [categoryIndex]: !prevState[categoryIndex],
    }));
    if (expandedCategories[categoryIndex]) {
      setActiveQuestions((prevState) => ({
        ...prevState,
        [categoryIndex]: null,
      }));
    }
  };

  const toggleSmallScreenQuestion = (
    categoryIndex: number,
    questionIndex: number
  ) => {
    setActiveQuestions((prevState) => ({
      ...prevState,
      [categoryIndex]:
        prevState[categoryIndex] === questionIndex ? null : questionIndex,
    }));
  };

  const clearSearch = () => {
    setSearchTerm("");
    setActiveCategory(0);
    setActiveQuestion(null);
  };

  return (
    <>
      {styles} {/* Include the CSS transition styles */}
      <div className="absolute w-full h-28 bg-[#04567D] top-0 hidden lg:block"></div>

      {/* Hero Section */}
      <section className="w-full px-4 py-20 bg-[#04567D] text-white lg:px-10 pt-40 lg:pt-20">
        <div className="flex flex-col items-start justify-start w-full gap-10 max-w-screen-md mx-auto">
          <div className="flex flex-col items-start justify-start gap-4 text-start">
            <h1 className="text-[24px] lg:text-2xl font-medium leading-normal">
              {mainTitle}
            </h1>
            <h2 className="text-[32px] leading-tight lg:text-[56px] font-bold">
              {subTitle}
            </h2>
          </div>
          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            clearSearch={clearSearch}
            searchPlaceholder={searchPlaceholder}
          />
        </div>
      </section>

      {/* FAQ Content */}
      <div className="bg-white w-full px-4 py-10 lg:py-20 lg:px-10">
        {/* Desktop Version */}
        <div className="hidden lg:flex gap-10 items-start justify-center mx-auto max-w-7xl lg:gap-20">
          <div className="lg:w-[220px] flex flex-col items-start gap-6 justify-start">
            <h3 className="text-lg font-semibold">Category</h3>
            <ul className="flex flex-col gap-4">
              {faqCategories.map((category, index) => (
                <li
                  key={category.category}
                  onClick={() => selectCategory(index)}
                  className={`text-base font-normal cursor-pointer ${
                    !isSearching && activeCategory === index
                      ? "text-[#04567D] underline"
                      : "text-black"
                  } transition-all duration-300`}
                  role="button"
                  tabIndex={0}
                >
                  {category.category}
                </li>
              ))}
            </ul>
          </div>

          {/* Questions */}
          <div className="w-full flex flex-col items-start justify-start gap-8">
            <h3 className="text-lg font-semibold">
              {isSearching
                ? `Results for "${searchTerm}"`
                : faqCategories[activeCategory].category}
            </h3>
            <div className="flex flex-col items-start justify-start w-full">
              {(isSearching ? filteredData : [faqCategories[activeCategory]]).map(
                (category, catIdx) =>
                  category.questions.map((question, idx) => (
                    <div
                      key={`${catIdx}-${idx}`}
                      className="border-t border-[#CECECE] w-full"
                      onClick={() => toggleQuestion(idx)}
                      role="button"
                      tabIndex={0}
                      aria-expanded={activeQuestion === idx}
                    >
                      <div className="flex items-center justify-between py-6 cursor-pointer">
                        <span
                          className={`${
                            activeQuestion === idx && "text-teal-600"
                          } text-2xl font-medium leading-normal`}
                          dangerouslySetInnerHTML={{
                            __html: question.text.replace(
                              new RegExp(searchTerm, "gi"),
                              (match) => `<mark>${match}</mark>`
                            ),
                          }}
                        />
                        <Image
                          src="/icons/down-chev.svg"
                          width={24}
                          height={24}
                          alt={
                            activeQuestion === idx
                              ? "Collapse answer"
                              : "Expand answer"
                          }
                          className={`invert transform transition-transform ${
                            activeQuestion === idx ? "rotate-180" : ""
                          }`}
                        />
                      </div>

                      <Collapsible
                        isOpen={isSearching || activeQuestion === idx}
                      >
                        <div className="grid grid-cols-2 items-start justify-between gap-10">
                          <p
                            className="mb-6 text-gray-700 max-w-screen-sm"
                            dangerouslySetInnerHTML={{
                              __html: question.answer.replace(
                                new RegExp(searchTerm, "gi"),
                                (match) => `<mark>${match}</mark>`
                              ),
                            }}
                          />
                          {question.optionalImage && (
                            <div className="mb-6">
                              <Image
                                src={question.optionalImage}
                                alt="FAQ image"
                                width={500}
                                height={300}
                                className="w-full h-auto max-h-96 object-cover rounded-xl"
                              />
                            </div>
                          )}
                        </div>
                      </Collapsible>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>

        {/* Mobile Version */}
        <div className="flex flex-col lg:hidden items-start justify-center mx-auto max-w-7xl">
          {(isSearching ? filteredData : faqCategories).map(
            (category, categoryIdx) => (
              <div
                key={categoryIdx}
                className="border-t border-[#CECECE] w-full"
              >
                <div
                  onClick={() => toggleCategory(categoryIdx)}
                  className="flex items-center justify-between py-6 cursor-pointer"
                  role="button"
                  tabIndex={0}
                  aria-expanded={expandedCategories[categoryIdx]}
                >
                  <span className="text-2xl font-medium leading-normal">
                    {category.category}
                  </span>
                  <Image
                    src="/icons/down-chev.svg"
                    width={24}
                    height={24}
                    alt="chevron"
                    className={`invert transform transition-transform ${
                      expandedCategories[categoryIdx] ? "rotate-180" : ""
                    }`}
                  />
                </div>

                <Collapsible
                  isOpen={isSearching || expandedCategories[categoryIdx]}
                >
                  <div className="px-4">
                    {category.questions.map((question, idx) => (
                      <div
                        key={idx}
                        className="border-t border-[#CECECE] w-full"
                      >
                        <div
                          onClick={() =>
                            toggleSmallScreenQuestion(categoryIdx, idx)
                          }
                          className="flex items-center justify-between py-6 gap-4 cursor-pointer"
                          role="button"
                          tabIndex={0}
                          aria-expanded={activeQuestions[categoryIdx] === idx}
                        >
                          <span
                            className={`${
                              activeQuestions[categoryIdx] === idx &&
                              "text-teal-600"
                            } text-base font-normal lg:text-xl lg:font-medium leading-normal`}
                            dangerouslySetInnerHTML={{
                              __html: question.text.replace(
                                new RegExp(searchTerm, "gi"),
                                (match) => `<mark>${match}</mark>`
                              ),
                            }}
                          />
                          <Image
                            src="/icons/down-chev.svg"
                            width={20}
                            height={20}
                            alt="chevron"
                            className={`invert transform transition-transform ${
                              activeQuestions[categoryIdx] === idx
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </div>

                        <Collapsible
                          isOpen={
                            isSearching || activeQuestions[categoryIdx] === idx
                          }
                        >
                          <div className="py-4">
                            <p
                              className="mb-4"
                              dangerouslySetInnerHTML={{
                                __html: question.answer.replace(
                                  new RegExp(searchTerm, "gi"),
                                  (match) => `<mark>${match}</mark>`
                                ),
                              }}
                            />
                            {question.optionalImage && (
                              <div className="mb-4">
                                <Image
                                  src={question.optionalImage}
                                  alt="FAQ image"
                                  width={500}
                                  height={300}
                                  className="w-full h-auto max-h-96 object-cover rounded-xl"
                                />
                              </div>
                            )}
                          </div>
                        </Collapsible>
                      </div>
                    ))}
                  </div>
                </Collapsible>
              </div>
            )
          )}
        </div>
      </div>

      {/* Contact Section */}
      <section
        aria-labelledby="faq-contact"
        className="w-full px-4 py-20 bg-primary-500 text-white lg:px-10"
      >
        <div className="flex flex-col items-start justify-start w-full gap-10">
          <div className="flex flex-col items-center justify-center gap-6 text-center max-w-screen-lg mx-auto">
            <h2
              id="faq-contact"
              className="text-[28px] leading-tight lg:text-[40px] font-extrabold"
            >
              {contactSection.contactTitle}
            </h2>
            {contactSection.contactDescription && (
              <p className="text-base font-normal leading-normal">
                {contactSection.contactDescription}
              </p>
            )}
          </div>
          <Cta
            text={contactSection.ctaText}
            link={contactSection.ctaLink}
          />
        </div>
      </section>
    </>
  );
}
