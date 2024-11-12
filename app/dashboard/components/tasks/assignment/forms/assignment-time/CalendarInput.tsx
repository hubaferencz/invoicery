"use client";

import React, { useEffect, useState } from "react";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./custom-styles.css";
import { motion, AnimatePresence } from "framer-motion";
import { enUS } from "date-fns/locale";
import ChevronIcon from "@/app/components/ChevronIcon";

registerLocale("en-US", enUS);
setDefaultLocale("en-US");

type CalendarInputProps = {
  placeholder: string;
  isStartDate: boolean;
  pairedDate?: Date | null;
  onDateChange: (date: Date | null) => void;
};

const CalendarInput: React.FC<CalendarInputProps> = ({
  placeholder,
  isStartDate,
  pairedDate,
  onDateChange,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    onDateChange(date);
    setShowPopup(false);
  };

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    : "";

  const minDate = isStartDate ? new Date() : pairedDate || new Date();
  const maxDate = isStartDate && pairedDate ? pairedDate : undefined;

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShowPopup(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      <input
        type="text"
        className="p-4 text-sm font-normal w-full outline outline-1 focus:outline-[#227297] transition-all text-black outline-[#EBEBEB] placeholder:text-[#878484] rounded appearance-none"
        placeholder={placeholder}
        value={formattedDate}
        onClick={() => setShowPopup(true)}
        readOnly
      />
      <AnimatePresence>
        {showPopup && (
          <motion.div
          className={`fixed inset-0 z-50 flex ${
            window.innerWidth >= 1024 ? "items-center justify-center" : "items-end justify-center"
          } bg-black bg-opacity-50`}
          
            onClick={() => setShowPopup(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="bg-white lg:max-w-[556px] rounded-md z-10 w-full"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Close button and header styling */}
              <div className="grid grid-cols-3 w-full p-4 md:p-6 items-center border-b border-[#EFEFEF] rounded-t-md bg-white text-black">
                <div className="flex items-center justify-start col-span-1">
                  <button
                    onClick={() => setShowPopup(false)}
                    className="text-sm text-[#5E5C5C] font-normal"
                  >
                    Cancel
                  </button>
                </div>
                <div className="flex items-center justify-center col-span-1 text-center">
                  <h2 className="text-base font-medium">
                    {isStartDate ? "Start" : "End"} Date
                  </h2>
                </div>
                <div className="flex md:hidden items-end justify-end w-full col-span-1"></div>
              </div>

              {/* Popup content */}
              <div className="flex flex-col items-center p-6 px-4 md:px-6">
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  minDate={minDate}
                  maxDate={maxDate}
                  selectsStart={isStartDate}
                  selectsEnd={!isStartDate}
                  startDate={
                    isStartDate ? (selectedDate as Date) : (pairedDate as Date)
                  }
                  endDate={
                    !isStartDate ? (selectedDate as Date) : (pairedDate as Date)
                  }
                  inline
                  locale="en-US"
                  renderCustomHeader={({
                    date,
                    decreaseMonth,
                    increaseMonth,
                  }) => (
                    <div className="react-datepicker__header--custom">
                      <button onClick={decreaseMonth}>
                        <ChevronIcon className="w-5 h-5 text-gray-500 rotate-90" />
                      </button>
                      <span className="text-base font-medium text-black">
                        {date.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                        })}
                      </span>
                      <button onClick={increaseMonth}>
                        <ChevronIcon className="w-5 h-5 text-gray-500 -rotate-90" />
                      </button>
                    </div>
                  )}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CalendarInput;
