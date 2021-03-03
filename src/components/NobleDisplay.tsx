import React from "react";
import { Noble } from "../Interfaces";
import { gemsColorStyle, gemsTextColorStyle } from "./SplendorBoard";

interface NobleDisplayProps {
  noble: Noble;
}

export const NobleDisplay: React.FC<NobleDisplayProps> = ({ noble }) => {
  return (
    <div className="shadow-xl rounded-xl relative h-28 w-28 border-4 border-yellow-300 bg-gradient-to-l from-gray-300 to-gray-200 m-2">
      <div
        className={"absolute top-0 right-0 h-8 w-8 text-center align-middle"}
      >
        {noble.points}
      </div>
      <div className={"absolute bottom-0 left-0 p-2 h-18"}>
        <div
          className={
            "grid grid-cols-2 justify-end flex-wrap-reverse w-full h-full gap-1"
          }
        >
          {noble.cardCountByColors.map(
            (gemCount, index) =>
              gemCount > 0 && (
                <div
                  key={index}
                  className={"rounded-full h-8 w-8 text-center"}
                  style={{
                    backgroundColor: gemsColorStyle[index],
                    color: gemsTextColorStyle[index],
                  }}
                >
                  {gemCount}
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};
