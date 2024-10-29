"use client";
import React, { useState, useRef, useEffect } from "react";
import Search from "./Search";
import Image from "next/image";

import { Collapse } from "react-collapse";
const faqData = [
  {
    category: "10 most frequently asked questions",
    questions: [
      {
        text: "How does Frilans Finans calculate my salary?",
        answer:
          "We calculate your salary based on the total invoice amount. We calculate your salary based on the total invoice amount. We calculate your salary based on the total invoice amount.",
        image: "/hero/bg.png", // Optional image
      },
      {
        text: "What expenses can I deduct as a freelancer?",
        answer: "You can deduct expenses that are necessary for your work.",
      },
    ],
  },
  {
    category: "Billing",
    questions: [
      {
        text: "How do I receive my invoices?",
        answer: "Invoices are sent to your registered email address.",
      },
    ],
  },
  {
    category: "Self-employment",
    questions: [
      {
        text: "What is considered self-employment income?",
        answer:
          "Self-employment income includes all earnings from freelance or contract work.",
      },
      {
        text: "How do I report my self-employment earnings?",
        answer:
          "You report self-employment earnings on a Schedule C form attached to your tax return.",
      },
    ],
  },
  {
    category: "Deductions and expenses",
    questions: [
      {
        text: "Can I deduct home office expenses?",
        answer:
          "Yes, you can deduct expenses for a home office if it is exclusively used for work.",
      },
      {
        text: "What are allowable travel expenses?",
        answer:
          "Travel expenses, like transport and accommodation related to work, can be deducted if they are necessary for your business.",
      },
    ],
  },
  {
    category: "Health care allowance",
    questions: [
      {
        text: "How does the health care allowance work?",
        answer:
          "The health care allowance provides coverage for certain medical expenses under specific conditions.",
      },
      {
        text: "What does the health care allowance cover?",
        answer:
          "It generally covers routine medical expenses, depending on the plan you have with us.",
      },
    ],
  },
  {
    category: "Insurances",
    questions: [
      {
        text: "What type of insurance is provided?",
        answer:
          "We offer liability and health insurance options tailored to freelancers.",
      },
      {
        text: "How do I file an insurance claim?",
        answer:
          "You can file a claim through your online account portal or by contacting our support team.",
      },
    ],
  },
];

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
        background-color: #04567D; /* Custom background color */
        color: white; /* Custom text color */
      }
    `}</style>
  )

export default function Faq() {
    const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
    const [activeCategory, setActiveCategory] = useState<number>(0);
    const [expandedCategories, setExpandedCategories] = useState<{
      [key: number]: boolean;
    }>({});
    const [activeQuestions, setActiveQuestions] = useState<{
      [key: number]: number | null;
    }>({});
    const [searchTerm, setSearchTerm] = useState<string>("");
  
    const filteredData = faqData
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
        <section className="w-full px-4 py-20 bg-[#04567D] text-white lg:px-10 pt-40 lg:pt-20">
          <div className="flex flex-col items-start justify-start w-full gap-10 max-w-screen-md mx-auto">
            <div className="flex flex-col items-start justify-start gap-4 text-start">
              <span className="text-[24px] lg:text-2xl font-medium leading-normal">
                Our most common
              </span>
              <span className="text-[32px] leading-tight lg:text-[56px] font-bold">
                Questions and answers
              </span>
            </div>
            <Search
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              clearSearch={clearSearch}
            />
          </div>
        </section>
  
        <div className="bg-white w-full px-4 py-10 lg:py-20 lg:px-10">
          <div className="hidden lg:flex gap-10 items-start justify-center mx-auto max-w-7xl lg:gap-20">
            <div className="lg:w-[220px] flex flex-col items-start gap-6 justify-start">
              <h3 className="text-lg font-semibold">Category</h3>
              <ul className="flex flex-col gap-4">
                {faqData.map((category, index) => (
                  <li
                    key={category.category}
                    onClick={() => selectCategory(index)}
                    className={`text-base font-normal cursor-pointer ${
                      !isSearching && activeCategory === index
                        ? "text-[#04567D] underline"
                        : "text-black"
                    } transition-all duration-300`}
                  >
                    {category.category}
                  </li>
                ))}
              </ul>
            </div>
  
            {/* FAQ Section */}
            <div className="w-full flex flex-col items-start justify-start gap-8">
              <h3 className="text-lg font-semibold">
                {isSearching
                  ? `Results for "${searchTerm}"`
                  : faqData[activeCategory].category}
              </h3>
              <div className="flex flex-col items-start justify-start w-full">
                {(isSearching ? filteredData : [faqData[activeCategory]]).map(
                  (category, catIdx) =>
                    category.questions.map((question, idx) => (
                      <div
                        key={`${catIdx}-${idx}`}
                        className="border-t border-[#CECECE] w-full"
                        onClick={() => toggleQuestion(idx)}
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
                            alt="chevron"
                            className={`invert transform transition-transform ${
                              activeQuestion === idx ? "rotate-180" : ""
                            }`}
                          />
                        </div>
  
                        {/* Collapsible Answer with Image */}
                        <Collapsible isOpen={isSearching || activeQuestion === idx}>
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
                            {question.image && (
                              <div className="mb-6">
                                <Image
                                  src={question.image}
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
  
          <div className="flex flex-col lg:hidden items-start justify-center mx-auto max-w-7xl">
            {(isSearching ? filteredData : faqData).map(
              (category, categoryIdx) => (
                <div
                  key={categoryIdx}
                  className="border-t border-[#CECECE] w-full"
                >
                  <div
                    onClick={() => toggleCategory(categoryIdx)}
                    className="flex items-center justify-between py-6 cursor-pointer"
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
  
                  {/* Collapsible Category Section */}
                  <Collapsible isOpen={isSearching || expandedCategories[categoryIdx]}>
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
  
                          {/* Collapsible Answer with Image */}
                          <Collapsible
                            isOpen={isSearching || activeQuestions[categoryIdx] === idx}
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
                              {question.image && (
                                <div className="mb-4">
                                  <Image
                                    src={question.image}
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
      </>
    );
  }
  