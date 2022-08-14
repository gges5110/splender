import React from "react";
import { Noble } from "../Interfaces";
import { GemDisplay } from "./GemDisplay";
import clsx from "clsx";

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
      className={clsx(
        "shadow-xl rounded-xl relative h-20 w-20 sm:h-28 sm:w-28 border-4 border-yellow-300 bg-gradient-to-l from-gray-300 to-gray-200 m-2",
        {
          "cursor-pointer": onClick !== undefined,
        }
      )}
      onClick={onClick}
    >
      <div
        className={
          "absolute top-0 right-0 h-6 leading-6 sm:h-8 sm:leading-8 w-6 sm:w-8 text-center align-middle select-none"
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
