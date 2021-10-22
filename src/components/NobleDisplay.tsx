import React from "react";
import { Noble } from "../Interfaces";
import { GemDisplay } from "./GemDisplay";

interface NobleDisplayProps {
  noble: Noble;
  onClick?(): void;
}

export const NobleDisplay: React.FC<NobleDisplayProps> = ({
  noble,
  onClick,
}) => {
  if (!noble) {
    return null;
  }

  return (
    <div
      className="cursor-pointer shadow-xl rounded-xl relative h-20 w-20 sm:h-28 sm:w-28 border-4 border-yellow-300 bg-gradient-to-l from-gray-300 to-gray-200 m-2"
      onClick={onClick}
    >
      <div
        className={
          "absolute top-0 right-0 h-8 w-8 text-center align-middle select-none"
        }
      >
        {noble.points}
      </div>
      <div className={"absolute bottom-0 left-0 p-2 h-18"}>
        <div className={"flex flex-wrap-reverse w-full h-full gap-1"}>
          {noble.cardCountByColors.map(
            (gemCount, index) =>
              gemCount > 0 && (
                <GemDisplay
                  key={index}
                  color={index}
                  count={gemCount}
                  size={"small"}
                />
              )
          )}
        </div>
      </div>
    </div>
  );
};
