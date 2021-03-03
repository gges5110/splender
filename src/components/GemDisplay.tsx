import { Color } from "../Interfaces";
import React from "react";
import { gemsColorStyle, gemsTextColorStyle } from "./SplendorBoard";

interface GemDisplayProps {
  color: Color;
  count: number;
}

export const GemDisplay: React.FC<GemDisplayProps> = ({ color, count }) => {
  return (
    <div
      className={"rounded-full w-12 h-12 mx-2 flex items-center justify-center"}
      style={{
        backgroundColor: gemsColorStyle[color],
        color: gemsTextColorStyle[color],
      }}
    >
      <div>{count}</div>
    </div>
  );
};
