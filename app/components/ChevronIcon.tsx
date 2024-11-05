// components/ChevronIcon.tsx
import React from "react";

type Props = {
  color?: string;
  width?: string;
  height?: string;
  className?: string;
};

const ChevronIcon: React.FC<Props> = ({
  color = "#5E5C5C",
  width = "24",
  height = "24",
  className,
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    className={` ${className}`}

    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.2812 15.7188L6.28125 10.7188C5.875 10.3438 5.875 9.6875 6.28125 9.3125C6.65625 8.90625 7.3125 8.90625 7.6875 9.3125L12 13.5938L16.2812 9.3125C16.6562 8.90625 17.3125 8.90625 17.6875 9.3125C18.0938 9.6875 18.0938 10.3438 17.6875 10.7188L12.6875 15.7188C12.3125 16.125 11.6562 16.125 11.2812 15.7188Z"
      fill={color}
    />
  </svg>
);

export default ChevronIcon;
