

"use client";

import React from "react";
import { useInView } from "react-intersection-observer";
import SlotCounter from "react-slot-counter";

type Stat = {
  start: number;
  finish: number;
  title: string;
  measurement?: string;
};

type StatisticsProps = {
  stats: Stat[];
  headerTitle: string;
  headerTitleSecondLine: string;
  sectionBackgroundImage: string;
};

export default function Statistics({
  stats,
  headerTitle,
  headerTitleSecondLine,
  sectionBackgroundImage,
}: StatisticsProps) {
  return (
    <section
      aria-labelledby="stats-heading"
      className="relative flex flex-col items-center justify-center w-full gap-10 py-[72px] px-4 lg:px-20 lg:py-20"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-center bg-cover grayscale opacity-70"
        style={{
          backgroundImage: `url('${sectionBackgroundImage}')`,
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#3A7663] opacity-70"></div>

      {/* Content */}
      <header className="flex flex-col items-center text-center text-white justify-center gap-2 lg:px-20 font-bold text-[28px] lg:text-[40px] leading-tight z-10">
        <h2 id="stats-heading">{headerTitle}</h2>
        <p aria-hidden="true">{headerTitleSecondLine}</p>
      </header>
      <div className="z-10 grid items-start justify-center grid-cols-1 pt-4 text-center text-white  lg:pt-0 gap-14 md:gap-10 lg:px-40 md:grid-cols-3">
        {stats.map((stat, index) => (
          <SlotMachineStat
            key={index}
            start={stat.start}
            finish={stat.finish}
            title={stat.title}
            measurement={stat.measurement}
          />
        ))}
      </div>
    </section>
  );
}

function SlotMachineStat({ finish, title, measurement }: Stat) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <div ref={ref} className="flex flex-col items-center justify-center gap-2">
      <span
        className="text-[44px] lg:text-[52px] font-bold flex leading-none items-end gap-1.5"
        style={{ letterSpacing: "1.04px" }}
      >
        <span aria-live="polite">
          {inView && (
            <SlotCounter value={String(finish)} duration={3} delay={0} />
          )}
        </span>
        {measurement && <span>{measurement}</span>}
      </span>
      <p className="text-base font-semibold lg:text-lg">{title}</p>
    </div>
  );
}
