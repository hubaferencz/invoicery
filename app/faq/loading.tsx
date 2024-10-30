import React from "react";

export default function Loading() {
  return (
    <div className="bg-[#04567D] min-h-screen flex flex-col">
      {/* Hero Section Skeleton */}
      <section className="w-full px-4 py-20 bg-[#04567D] text-white lg:px-10 pt-40 lg:pt-20">
        <div className="flex flex-col items-start justify-start w-full gap-10 max-w-screen-md mx-auto">
          <div className="flex flex-col items-start justify-start gap-4 text-start">
            {/* Title Skeleton */}
            <div className="w-[250px] lg:w-[300px] h-8 bg-primary-800 animate-pulse rounded-lg"></div>
            <div className="w-[300px] lg:w-[400px] h-10 bg-primary-800 animate-pulse rounded-lg"></div>
          </div>

          {/* Search Bar Skeleton */}
          <div className="flex items-center rounded-xl p-4 bg-primary-800 animate-pulse w-full justify-start gap-2">
            <div className="w-5 h-5 bg-[#04567D] rounded-lg"></div>
            <div className="flex-1 h-6 bg-[#04567D] rounded-lg"></div>
          </div>
        </div>
      </section>

      {/* Content Section Skeleton */}
      <div className="bg-white w-full px-4 py-10 lg:py-20 lg:px-10">
        <div className="hidden lg:flex gap-10 items-start justify-center mx-auto max-w-7xl lg:gap-20">
          {/* Categories Skeleton */}
          <div className="lg:w-[220px] flex flex-col items-start gap-6 justify-start">
            <div className="w-2/3 h-8 bg-neutral-200 animate-pulse rounded-lg"></div>
            <ul className="flex flex-col gap-4 w-full">
              {[...Array(5)].map((_, i) => (
                <li
                  key={i}
                  className="w-full h-6 bg-neutral-200 animate-pulse rounded-lg"
                ></li>
              ))}
            </ul>
          </div>

          {/* FAQ Items Skeleton */}
          <div className="w-full flex flex-col items-start justify-start gap-8">
            <div className="w-1/2 h-8 bg-neutral-200 animate-pulse rounded-lg"></div>
            <div className="flex flex-col items-start justify-start w-full">
              {[...Array(3)].map((_, idx) => (
                <div
                  key={idx}
                  className="border-t border-[#CECECE] w-full py-6 animate-pulse"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-2/3 h-6 bg-neutral-200 rounded-lg"></div>
                    <div className="w-5 h-5 bg-neutral-200 rounded-lg"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-10 mt-4">
                    <div className="h-5 bg-neutral-200 rounded-lg w-full"></div>
                    <div className="h-40 bg-neutral-200 rounded-xl w-full hidden lg:block"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile FAQ Skeleton */}
        <div className="flex flex-col lg:hidden items-start justify-center mx-auto max-w-7xl">
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="border-t border-[#CECECE] w-full py-6">
              <div className="flex items-center justify-between">
                <div className="w-2/3 h-6 bg-neutral-200 animate-pulse rounded-lg"></div>
                <div className="w-5 h-5 bg-neutral-200 animate-pulse rounded-lg"></div>
              </div>
              <div className="h-5 bg-neutral-200 animate-pulse rounded-lg mt-4"></div>
              <div className="h-40 bg-neutral-200 animate-pulse rounded-xl mt-6"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
