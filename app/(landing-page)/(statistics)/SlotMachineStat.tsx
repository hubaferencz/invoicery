import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import SlotCounter from "react-slot-counter";

type Stat = {
  start?: number;
  finish: number;
  title: string;
  measurement?: string;
};

function SlotMachineStat({ finish, title, measurement }: Stat) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    if (inView) {
      setStartAnimation(true);
    }
  }, [inView]);

  const formatNumberAsArray = (value: number): string[] => {
    const valueString = value.toString();
    if (valueString.length === 6) {
      // Insert a space after the third digit
      const formattedValue = valueString.replace(/(\d{3})(\d{3})/, "$1 $2");
      // Return as an array of individual digits and space
      return formattedValue.split("");
    }
    // Otherwise return each digit as an array element
    return valueString.split("");
  };

  return (
    <div ref={ref} className="flex flex-col items-center justify-center gap-2">
      <div
        className="text-[52px] font-bold"
        style={{ letterSpacing: "1.04px" }}
      >
        {startAnimation && (
          <SlotCounter
            value={formatNumberAsArray(finish)} // Formatted number as array
            duration={2}
            delay={0}
            charClassName="text-white" // Customize as needed
            separatorClassName="text-white" // Customize as needed
            autoAnimationStart={false} // We'll control animation manually
            animateUnchanged={true} // Animate all digits
          />
        )}
        {measurement && ` ${measurement}`}
      </div>
      <div className="text-lg font-semibold">{title}</div>
    </div>
  );
}

export default SlotMachineStat;
