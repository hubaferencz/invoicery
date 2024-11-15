"use client";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type ModalProps = {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({
  isOpen,
  title,
  onClose,
  children,
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#F4F4F4]"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#F4F4F4] w-full h-full lg:h-auto lg:rounded lg:max-w-screen-sm lg:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Desktop Header */}
            {isOpen && (
              <div className="hidden lg:block">
                <div className="absolute top-6 left-6">
                  <button
                    onClick={onClose}
                    className="w-10 h-10 aspect-square rounded-full bg-white shadow-lg flex items-center justify-center"
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

            {/* Mobile Header (only for screens below lg) */}
            <div className="lg:hidden grid grid-cols-3 w-full p-4 lg:p-6 items-center z-20 justify-between sm:border-b border-[#EFEFEF] lg:rounded-t-md lg:bg-white lg:text-black bg-[#04567D] text-white pt-10 lg:pt-6">
              <div className="col-span-1 flex items-center justify-start">
                <button
                  onClick={onClose}
                  className="text-sm text-white lg:text-[#5E5C5C] font-normal"
                >
                  Cancel
                </button>
              </div>
              <div className="col-span-1 items-center justify-center text-center flex">
                <h2 className="font-medium text-base hidden lg:block">
                  {title}
                </h2>
              </div>
              <div className="col-span-1 w-full flex items-end justify-end">
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
            <div className="">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
