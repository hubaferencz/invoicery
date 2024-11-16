"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Step {
  id: string;
  title: string;
  linkText: string;
  bgImage: string;
  description: string;
}

interface HowProps {
  verified: boolean;
  closeText: string;
  title: string;
  items: {
    id: string;
    title: string;
    description: string;
    image: {
      src: string;
      alt: string;
    };
    ctaText: string;
  }[];
}

export default function How({ verified, title, items, closeText }: HowProps) {
  const [selectedStep, setSelectedStep] = useState<Step | null>(null);

  const steps: Step[] = items.map((item) => ({
    id: item.id,
    title: item.title,
    linkText: item.ctaText,
    bgImage: item.image.src,
    description: item.description,
  }));

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedStep(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div
      className={`bg-white max-w-[778px] p-6 w-full mx-auto lg:mx-0 ${
        verified ? "flex xl:hidden" : "flex"
      } flex-col gap-6 rounded-sm`}
    >
      <h2
        className="leading-normal text-xl font-medium py-0.5"
        style={{ letterSpacing: "0.20px" }}
      >
        {title}
      </h2>

      {/* Wrapper with horizontal scroll on smaller screens */}
      <div className="flex gap-3 overflow-x-auto grid-cols-3">
        {steps.map((step, index) => (
          <div
            key={step.id}
            onClick={() => setSelectedStep(step)}
            className="aspect-square max-h-60 h-full min-w-[235px] flex-shrink-0 flex items-start flex-col text-start justify-end p-4 text-white rounded-[16px] cursor-pointer"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.4) 70%, rgba(0, 0, 0, 0.90) 100%), url(${step.bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <h2
              className="font-bold text-lg"
              style={{ letterSpacing: "0.18px" }}
            >
              {index + 1}. {step.title}
            </h2>
            <p
              className="font-semibold text-xs"
              style={{ letterSpacing: "0.18px" }}
            >
              {step.linkText}
            </p>
          </div>
        ))}
      </div>

      {/* Popup overlay and content */}
      <AnimatePresence>
        {selectedStep && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={() => setSelectedStep(null)} // Close on clicking outside
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="bg-white sm:max-w-[556px] rounded-t-lg sm:rounded-lg flex flex-col w-full"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.2 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 50 }}
              dragElastic={0.1}
              onDragEnd={(e, info) => {
                if (info.offset.y > 100) setSelectedStep(null);
              }}
              style={{
                ...(window.innerWidth >= 640
                  ? {
                      position: "relative",
                      maxWidth: "xl",
                      margin: "auto",
                    }
                  : { bottom: 0, position: "absolute", width: "100%" }),
              }}
            >
              {/* Close button and mobile drag handle */}
              <div className="p-4 sm:p-6  flex items-center justify-between sm:border-b border-[#EFEFEF]">
                <button
                  onClick={() => setSelectedStep(null)}
                  className="text-sm text-[#5E5C5C] font-normal hidden sm:block"
                >
                  {closeText}
                </button>

                {/* Mobile Drag Handle */}
                <div className="sm:hidden flex justify-center w-full">
                  <div className="w-8 h-1.5 bg-[#CECECE] rounded-full"></div>
                </div>
              </div>

              {/* Popup content */}
              <div className="flex flex-col items-start p-4 sm:p-6 gap-6">
                <div className="relative overflow-hidden w-full h-[150px] rounded-lg">
                  <img
                    src={selectedStep.bgImage}
                    alt={selectedStep.title}
                    className="rounded-lg w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0 flex flex-col justify-end p-4 text-white"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.4) 70%, rgba(0, 0, 0, 0.90) 100%)",
                    }}
                  >
                    <h2
                      className="font-bold text-xl"
                      style={{ letterSpacing: "0.2px" }}
                    >
                      {selectedStep.title}
                    </h2>
                  </div>
                </div>

                <p
                  className="text-sm font-normal leading-snug"
                  style={{ letterSpacing: "0.14px" }}
                >
                  {selectedStep.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
