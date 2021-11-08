import { Color } from "../Interfaces";
import React from "react";
import { gemsColorStyle, gemsTextColorStyle } from "./SplendorBoard";
import clsx from "clsx";

interface GemDisplayProps {
  color: Color;
  count: number;
  size?: "default" | "small";
  className?: string;
}

export const GemDisplay: React.FC<GemDisplayProps> = ({
  color,
  count,
  size = "default",
  className,
}) => {
  let sizeClassName = "";
  switch (size) {
    case "default": {
      sizeClassName = "gem-size";
      break;
    }
    case "small": {
      sizeClassName = "w-6 sm:w-8 h-6 sm:h-8";
      break;
    }
  }

  return (
    <div
      className={clsx(
        "rounded-full flex items-center justify-center select-none",
        sizeClassName,
        className
      )}
      style={{
        backgroundColor: gemsColorStyle[color],
        color: gemsTextColorStyle[color],
      }}
    >
      <div>{count}</div>
    </div>
  );
};
