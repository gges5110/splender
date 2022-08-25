import { Color } from "../../../Interfaces";
import * as React from "react";
import clsx from "clsx";
import { gemsColorStyle, gemsTextColorStyle } from "../../../styles";

interface GemDisplayProps {
  color: Color;
  count: number;
  className?: string;
}

export const GemDisplay: React.FC<GemDisplayProps> = ({
  color,
  count,
  className,
}) => {
  return (
    <div
      className={clsx(
        "rounded-full flex items-center justify-center select-none gem-size",
        gemsTextColorStyle[color],
        gemsColorStyle[color],
        className
      )}
    >
      {count}
    </div>
  );
};
