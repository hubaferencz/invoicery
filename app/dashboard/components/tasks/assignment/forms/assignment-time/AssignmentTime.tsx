"use client";

import React, { useState } from "react";
import CalendarInput from "./CalendarInput";

export default function AssignmentTime() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <div className="flex flex-col items-start gap-2 justify-normal">
        <h2>Select start and end date</h2>
        <div className="flex gap-4">
          <CalendarInput
            placeholder="Start date"
            isStartDate
            pairedDate={endDate}
            onDateChange={(date) => setStartDate(date)}
          />
          <CalendarInput
            placeholder="End date"
            isStartDate={false}
            pairedDate={startDate}
            onDateChange={(date) => setEndDate(date)}
          />
        </div>
      </div>
      <div className="flex flex-col items-start gap-2 justify-normal">
        <h2>Enter how many hours you plan to work per week</h2>
        <div className="flex gap-4">
          <input
            type="number"
            className="p-4 text-sm font-normal w-full lg:w-min outline outline-1 focus:outline-[#227297] transition-all text-black outline-[#EBEBEB] placeholder:text-[#878484] rounded appearance-none"
            placeholder="Example: 8"
            onInput={(e) => {
              const value = e.currentTarget.value.replace(/[^0-9]/g, "");
              e.currentTarget.value = value;
            }}
          />
        </div>
      </div>
    </div>
  );
}
