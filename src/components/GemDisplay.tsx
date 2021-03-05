import { Color } from "../Interfaces";
import React from "react";
import { gemsColorStyle, gemsTextColorStyle } from "./SplendorBoard";

interface GemDisplayProps {
  color: Color;
  count: number;
  size?: "default" | "small";
}

export const GemDisplay: React.FC<GemDisplayProps> = ({
  color,
  count,
  size = "default",
}) => {
  let sizeClassName = "";
  switch (size) {
    case "default": {
      sizeClassName = "w-12 h-12";
      break;
    }
    case "small": {
      sizeClassName = "w-8 h-8";
      break;
    }
  }

  return (
    <div
      className={`rounded-full flex items-center justify-center select-none ${sizeClassName}`}
      style={{
        backgroundColor: gemsColorStyle[color],
        color: gemsTextColorStyle[color],
      }}
    >
      <div>{count}</div>
    </div>
  );
};
