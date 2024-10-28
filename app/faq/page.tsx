"use client";
import React, { useState, useRef, useEffect } from "react";
import Search from "./Search";
import Image from "next/image";

// FAQ data structure with optional image
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
];

// Collapsible Component
function Collapsible({
  isOpen,
  children,
  dependency, // Add a dependency prop
}: {
  isOpen: boolean;
  children: React.ReactNode;
  dependency?: any; // Accept a dependency to re-run useEffect
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string>("0px");

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        // Temporarily set height to 'auto' to get the full height
        contentRef.current.style.height = "auto";
        const fullHeight = `${contentRef.current.scrollHeight}px`;
        contentRef.current.style.height = height; // Reset to previous height
        // Force reflow
        void contentRef.current.offsetHeight;
        // Then set to full height for the transition
        setHeight(fullHeight);
      } else {
        setHeight("0px");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, dependency]); // Add dependency to useEffect dependencies

  return (
    <div
      ref={contentRef}
      style={{
        overflow: "hidden",
        height: height,
        transition: "height 0.5s ease-in-out",
      }}
    >
      {children}
    </div>
  );
}

export default function Faq() {
  // State for larger screens
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<number>(0);

  // State for smaller screens
  const [expandedCategories, setExpandedCategories] = useState<{
    [key: number]: boolean;
  }>({});
  const [activeQuestions, setActiveQuestions] = useState<{
    [key: number]: number | null;
  }>({});

  // Toggle functions for larger screens
  const toggleQuestion = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  const selectCategory = (index: number) => {
    setActiveCategory(index);
    setActiveQuestion(null);
  };

  // Toggle functions for smaller screens
  const toggleCategory = (categoryIndex: number) => {
    setExpandedCategories((prevState) => ({
      ...prevState,
      [categoryIndex]: !prevState[categoryIndex],
    }));
    // Reset active question when category is collapsed
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

  return (
    <>
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
          <Search />
        </div>
      </section>

      <div className="bg-white w-full px-4 py-10 lg:py-20 lg:px-10">
        {/* Large Screens Layout */}
        <div className="hidden lg:flex gap-10 items-start justify-center mx-auto max-w-7xl lg:gap-20">
          {/* Categories Section */}
          <div className="lg:w-[220px] flex flex-col items-start gap-6 justify-start">
            <h3 className="text-lg font-semibold">Category</h3>
            <ul className="flex flex-col gap-4">
              {faqData.map((category, index) => (
                <li
                  key={category.category}
                  onClick={() => selectCategory(index)}
                  className={`text-base font-normal cursor-pointer ${
                    activeCategory === index
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
              {faqData[activeCategory].category}
            </h3>
            <div className="flex flex-col items-start justify-start w-full">
              {faqData[activeCategory].questions.map((question, idx) => (
                <div
                  key={idx}
                  className="border-t w-full"
                  onClick={() => toggleQuestion(idx)}
                >
                  <div className="flex items-center justify-between py-6 cursor-pointer">
                    <span
                      className={`${
                        activeQuestion === idx && "text-teal-600"
                      } text-2xl font-medium leading-normal`}
                    >
                      {question.text}
                    </span>
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
                  <Collapsible isOpen={activeQuestion === idx}>
                    <div className="grid grid-cols-2 items-start justify-between gap-10">
                      <p className="mb-6 text-gray-700 max-w-screen-sm">
                        {question.answer}
                      </p>
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
              ))}
            </div>
          </div>
        </div>

        {/* Small Screens Layout */}
        <div className="flex flex-col lg:hidden items-start justify-center mx-auto max-w-7xl">
          {faqData.map((category, categoryIdx) => (
            <div key={categoryIdx} className="border-t w-full">
              {/* Category Header */}
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
              <Collapsible
                isOpen={expandedCategories[categoryIdx]}
                // Pass activeQuestions[categoryIdx] as a dependency
                dependency={activeQuestions[categoryIdx]}
              >
                <div className="pl-4">
                  {category.questions.map((question, idx) => (
                    <div key={idx} className="border-t w-full">
                      <div
                        onClick={() =>
                          toggleSmallScreenQuestion(categoryIdx, idx)
                        }
                        className="flex items-center justify-between py-4 cursor-pointer"
                      >
                        <span
                          className={`${
                            activeQuestions[categoryIdx] === idx &&
                            "text-teal-600"
                          } text-xl font-medium leading-normal`}
                        >
                          {question.text}
                        </span>
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
                        isOpen={activeQuestions[categoryIdx] === idx}
                      >
                        <div className="py-4 pl-4">
                          <p className="mb-4 text-gray-700">
                            {question.answer}
                          </p>
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
          ))}
        </div>
      </div>
    </>
  );
}
