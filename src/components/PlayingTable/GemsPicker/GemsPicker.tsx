import React, { useState } from "react";
import { gemsColorStyle, gemsTextColorStyle } from "../../SplendorBoard";
import { motion } from "framer-motion";
import clsx from "clsx";

export enum GemsPickerMode {
  PICK,
  DISCARD,
}

export const GemSizeClassName = "w-8 sm:w-12 h-8 sm:h-12";

interface GemsPickerProps {
  gems: number[];
  mode: GemsPickerMode;
  gemsToDiscard?: number;

  onSelect(gems: number[]): void;
}

export const GemsPicker: React.FC<GemsPickerProps> = ({
  gems,
  onSelect,
  mode,
  gemsToDiscard,
}) => {
  const [selectedGems, setGems] = useState<number[]>(Array(5).fill(0));

  let actionLabelText = "";
  switch (mode) {
    case GemsPickerMode.DISCARD: {
      actionLabelText = "Discard";
      break;
    }
    case GemsPickerMode.PICK: {
      actionLabelText = "Pick";
      break;
    }
  }

  return (
    <>
      {gems.map((gemCount: number, index: number) => {
        if (index === 5) {
          return (
            <button
              key={index}
              className={clsx(
                GemSizeClassName,
                "rounded-full mx-1 select-none"
              )}
              style={{
                backgroundColor: gemsColorStyle[index],
                color: gemsTextColorStyle[index],
              }}
              disabled={true}
            >
              {gemCount}
            </button>
          );
        }
        const disabled = !gemsSelectable(selectedGems, gemCount, index, mode);
        return (
          <button
            key={index}
            className={clsx(GemSizeClassName, "rounded-full mx-1 select-none", {
              "opacity-20": disabled,
            })}
            style={{
              backgroundColor: gemsColorStyle[index],
              color: gemsTextColorStyle[index],
            }}
            disabled={disabled}
            onClick={() => {
              if (!disabled) {
                setGems(
                  Object.assign([], selectedGems, {
                    [index]: selectedGems[index] + 1,
                  })
                );
              }
            }}
          >
            {gemCount - selectedGems[index]}
          </button>
        );
      })}
      <button
        disabled={
          mode === GemsPickerMode.PICK
            ? selectedGems.every((gem) => gem === 0)
            : selectedGems.reduce((p, v) => p + v, 0) < (gemsToDiscard || 0)
        }
        onClick={() => {
          onSelect(selectedGems);
          setGems(Array(5).fill(0));
        }}
        className={
          "w-20 sm:w-24 h-8 sm:h-10 inline-flex items-center bg-indigo-600 text-white text-base font-semibold py-2 px-4 rounded-full shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200 disabled:opacity-50"
        }
      >
        <svg
          className="w-4 h-4 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <span className={"select-none"}>{actionLabelText}</span>
      </button>

      <div className={"h-2"} />
      <div className={"flex"}>
        {selectedGems.map((gemCount: number, index: number) => {
          if (selectedGems[index] !== 0) {
            return (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: -50,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
              >
                <button
                  className={clsx(
                    GemSizeClassName,
                    "rounded-full mx-1 select-none"
                  )}
                  style={{
                    backgroundColor: gemsColorStyle[index],
                    color: gemsTextColorStyle[index],
                  }}
                  onClick={() => {
                    setGems(
                      Object.assign([], selectedGems, {
                        [index]: selectedGems[index] - 1,
                      })
                    );
                  }}
                >
                  {selectedGems[index]}
                </button>
              </motion.div>
            );
          } else {
            return (
              <div
                className={clsx(
                  GemSizeClassName,
                  "rounded-full mx-1 select-none"
                )}
                key={index}
              />
            );
          }
        })}
        <div className={clsx(GemSizeClassName, "mx-1")} key={5} />
        <button
          disabled={selectedGems.every((gem) => gem === 0)}
          onClick={() => setGems(Array(5).fill(0))}
          className={
            "w-20 sm:w-24 h-8 sm:h-10 inline-flex items-center bg-purple-600 text-white text-base font-semibold py-2 px-4 rounded-full shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200 disabled:opacity-50"
          }
        >
          <svg
            className="w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>

          <span>Reset</span>
        </button>
      </div>
    </>
  );
};

export const reducer = (accumulator: number, currentValue: number) =>
  accumulator + currentValue;

const gemsSelectable = (
  selectedGems: number[],
  gemCount: number,
  index: number,
  mode: GemsPickerMode
): boolean => {
  if (gemCount <= selectedGems[index]) {
    return false;
  }

  if (mode === GemsPickerMode.DISCARD) {
    return true;
  }

  // if there are more than one color, disable those colors.
  const totalCount = selectedGems.reduce(reducer);

  if (totalCount > 1 && selectedGems[index] > 0) {
    return false;
  }

  // Select 2 gems of the same color
  if (selectedGems.some((gemCount) => gemCount === 2)) {
    return false;
  }

  // Must have more than 4 gems to pick 2 of the same color.
  if (selectedGems[index] === 1 && gemCount < 4) {
    return false;
  }

  // Select 3 gems of different colors
  if (selectedGems.every((gemCount) => gemCount <= 1) && totalCount <= 2) {
    return true;
  }

  return selectedGems[index] <= 1 && totalCount <= 2;
};
