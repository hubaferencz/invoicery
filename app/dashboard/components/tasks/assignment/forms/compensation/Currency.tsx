"use client";

import ChevronIcon from "@/app/components/ChevronIcon";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const currencies = [
  { code: "eur", name: "Euro" },
  { code: "usd", name: "USD" },
  { code: "sek", name: "SEK" },
  { code: "dkk", name: "DKK" },
  { code: "nok", name: "NOK" },
];

type Props = {
  selectedCurrency: string; // Added prop
  setSelectedCurrency: (currency: string) => void; // Added prop
};

export default function Currency({ selectedCurrency, setSelectedCurrency }: Props) {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const handleCurrencyChange = (currencyCode: string) => {
    setSelectedCurrency(currencyCode);
    setShowPopup(false); // close on selection
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setShowPopup(false); // close on outside click
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-end">
      <div
        className="flex items-center justify-center gap-2 p-2 bg-white rounded-full cursor-pointer"
        onClick={() => setShowPopup(!showPopup)}
      >
        <Image
          width={20}
          height={20}
          alt={selectedCurrency}
          className="rounded-full"
          src={`/flags/${selectedCurrency}.svg`}
        />
        <span className="text-sm text-black uppercase">
          {currencies.find((c) => c.code === selectedCurrency)?.name}
        </span>
        <ChevronIcon width="16" height="16" />
      </div>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            className={`fixed inset-0 z-50 flex ${
              window.innerWidth >= 768
                ? "items-center justify-center"
                : "items-end justify-center"
            } bg-black bg-opacity-50`}
            onClick={() => setShowPopup(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              ref={popupRef}
              onClick={(e) => e.stopPropagation()}
              className="bg-white md:max-w-[556px] rounded-md z-10 w-full"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="grid grid-cols-3 w-full p-4 md:p-6 items-center border-b border-[#EFEFEF] rounded-t-md bg-white text-black">
                <div className="flex md:hidden items-center justify-start col-span-1">
                  <button
                    onClick={() => setShowPopup(false)}
                    className="text-sm text-[#5E5C5C] font-normal"
                  >
                    Cancel
                  </button>
                </div>
                <div className="flex items-center justify-center col-span-1 md:col-span-3 text-center">
                  <h2 className="text-base font-medium">Select currency</h2>
                </div>
                <div className="flex md:hidden items-end justify-end w-full col-span-1"></div>
              </div>

              <div className="flex flex-col gap-2 p-4 md:p-6">
                {currencies.map((currency) => (
                  <div
                    key={currency.code}
                    className={`flex items-center justify-between py-3 px-4 rounded-lg cursor-pointer ${
                      selectedCurrency === currency.code ? "bg-[#34a8c51a]" : ""
                    }`}
                    onClick={() => handleCurrencyChange(currency.code)}
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        width={32}
                        height={32}
                        alt={currency.name}
                        className="rounded-full shadow-xl"
                        src={`/flags/${currency.code}.svg`}
                      />
                      <span className="text-base text-black uppercase">
                        {currency.name}
                      </span>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        selectedCurrency === currency.code
                          ? "bg-white border-[6px] border-[#34a8c5]"
                          : "border border-[#cecece]"
                      }`}
                    >
                      {selectedCurrency === currency.code && (
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
