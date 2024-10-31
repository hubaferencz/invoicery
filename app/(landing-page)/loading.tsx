import React from "react";

export default function Loading() {
  return (
    <div className=" bg-primary-800 min-h-screen flex flex-col">
      {/* Hero Section Skeleton */}
      <section className="w-full px-4 py-10 bg-primary-800 lg:py-20 lg:px-10">
        <div className="flex flex-col items-start justify-between w-full grid-cols-2 mx-auto lg:grid lg:gap-10 max-w-7xl">
          <div className="flex flex-col w-full gap-10 text-center lg:gap-12 lg:text-start">
            {/* Title Skeleton */}
            <div className="flex flex-col gap-4 items-center lg:items-start">
              <div className="w-2/3 h-10 bg-primary-700 animate-pulse rounded-lg lg:w-1/2 lg:h-16"></div>
              <div className="w-3/4 h-6 bg-primary-700 animate-pulse rounded-lg lg:w-2/3 lg:h-8"></div>
            </div>

            {/* CTA Skeleton */}
            <div className="flex flex-col items-center gap-4 lg:items-start">
              <div className="w-40 h-10 bg-primary-700 animate-pulse rounded-lg"></div>
              <div className="w-64 h-4 bg-primary-700 animate-pulse rounded-lg"></div>
            </div>

            {/* Trustpilot and Star Rating Skeleton (hidden for now) */}
            <div className="flex flex-col items-center gap-6 lg:justify-start lg:flex-row">
              <div className="w-16 h-16 bg-primary-700 animate-pulse rounded-lg"></div>
            </div>
          </div>

          {/* Hero Image Skeleton */}
          <div className="w-full h-64 bg-primary-700 animate-pulse rounded-2xl lg:w-[620px] lg:h-[500px] hidden lg:block"></div>
        </div>
      </section>
    </div>
  );
}
