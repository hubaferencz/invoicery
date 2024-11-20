"use client";

import React, { useEffect, useState } from "react";
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
  setIsAssignmentTimeValid: (isValid: boolean) => void;

};

export default function AssignmentTime({
  assignmentTime,
  setIsAssignmentTimeValid
}: AssignmentTimeProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [weeklyHours, setWeeklyHours] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeeklyHours(event.target.value); // Update the state with the input value
  };

  useEffect(() => {
    const isValid = startDate && endDate && weeklyHours !== "";
    setIsAssignmentTimeValid(!!isValid);
  }, [startDate, endDate, weeklyHours, setIsAssignmentTimeValid]);

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
            name={"endDate"}
            onDateChange={(date) => setStartDate(date)}
          />
          <CalendarInput
            placeholder={assignmentTime?.fields?.endLabel || "End date"}
            isStartDate={false}
            pairedDate={startDate}
            name={"startDate"}
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
            value={weeklyHours} // Bind the state value to the input
            onChange={handleChange} // Update the state on input change
    
            name="weeklyHours"
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
