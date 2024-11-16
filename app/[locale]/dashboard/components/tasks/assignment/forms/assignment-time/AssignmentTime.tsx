"use client";

import React, { useState } from "react";
import CalendarInput from "./CalendarInput";

type AssignmentTimeProps = {
  assignmentTime: {
    title: string;
    subtitle: string;
    fields: {
      startLabel: string;
      endLabel: string;
      hoursTitle: string;
      hoursPlaceholder: string;
    };
  };
};

export default function AssignmentTime({
  assignmentTime,
}: AssignmentTimeProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      {/* Start and End Date Section */}
      <div className="flex flex-col items-start gap-2 justify-normal">
        <h2>
          {assignmentTime?.fields?.startLabel || "Select start and end date"}
        </h2>
        <div className="flex gap-4">
          <CalendarInput
            placeholder={assignmentTime?.fields?.startLabel || "Start date"}
            isStartDate
            pairedDate={endDate}
            onDateChange={(date) => setStartDate(date)}
          />
          <CalendarInput
            placeholder={assignmentTime?.fields?.endLabel || "End date"}
            isStartDate={false}
            pairedDate={startDate}
            onDateChange={(date) => setEndDate(date)}
          />
        </div>
      </div>

      {/* Weekly Hours Section */}
      <div className="flex flex-col items-start gap-2 justify-normal">
        <h2>{assignmentTime?.fields?.hoursTitle || "Enter weekly hours"}</h2>
        <div className="flex gap-4">
          <input
            type="number"
            className="p-4 text-sm font-normal w-full lg:w-min outline outline-1 focus:outline-[#227297] transition-all text-black outline-[#EBEBEB] placeholder:text-[#878484] rounded appearance-none"
            placeholder={
              assignmentTime?.fields?.hoursPlaceholder || "Example: 8"
            }
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
