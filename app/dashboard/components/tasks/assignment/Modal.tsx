"use client";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type ModalProps = {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
  contentRef?: React.Ref<HTMLDivElement>;
};

export default function Modal({
  isOpen,
  title,
  onClose,
  children,
  contentRef,
}: ModalProps) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-start bg-[#F4F4F4]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#F4F4F4] w-full h-full lg:h-auto lg:rounded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Desktop Header */}
            {isOpen && (
              <div className="hidden lg:block">
                <div className="absolute z-50 top-6 left-6">
                  <button
                    onClick={onClose}
                    className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg aspect-square"
                  >
                    <Image
                      src={"/icons/close-blue.svg"}
                      width={16}
                      height={16}
                      alt="close"
                    />
                  </button>
                </div>
              </div>
            )}

            {/* Mobile Header */}
            <div className="lg:hidden grid grid-cols-3 w-full p-4 lg:p-6 items-center z-20 justify-between sm:border-b border-[#EFEFEF] lg:rounded-t-md lg:bg-white lg:text-black bg-[#04567D] text-white pt-10 lg:pt-6">
              <div className="flex items-center justify-start col-span-1">
                <button
                  onClick={onClose}
                  className="text-sm text-white lg:text-[#5E5C5C] font-normal"
                >
                  Cancel
                </button>
              </div>
              <div className="flex items-center justify-center col-span-1 text-center">
                <h2 className="hidden text-base font-medium lg:block">
                  {title}
                </h2>
              </div>
              <div className="flex items-end justify-end w-full col-span-1">
                <div className="cursor-pointer bg-white bg-opacity-20 w-10 h-10 rounded-full p-[5px] flex lg:block items-center justify-center">
                  <Image
                    src={"/icons/chat.svg"}
                    width={20}
                    height={21}
                    alt="support"
                  />
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div
              ref={contentRef}
              className="relative flex w-full max-h-screen gap-8 pt-32 overflow-y-scroll"
            >
              {/* Horizontal Line for testing */}
              <div
                style={{
                  position: "absolute",
                  top: "112px",
                  left: 0,
                  right: 0,
                  height: "2px",
                  backgroundColor: "transparent",
                  zIndex: 9999,
                }}
              />
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
