import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { gemsColorStyle, gemsTextColorStyle } from "../../../SplendorBoard";

interface SelectedGemsProps {
  selectedGems: number[];

  selectedGemOnClick(index: number): void;
}

export const SelectedGems: React.FC<SelectedGemsProps> = ({
  selectedGems,
  selectedGemOnClick,
}) => {
  return (
    <>
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
                className={clsx("gem-size", "rounded-full mx-1 select-none")}
                style={{
                  backgroundColor: gemsColorStyle[index],
                  color: gemsTextColorStyle[index],
                }}
                onClick={() => {
                  selectedGemOnClick(index);
                }}
              >
                {selectedGems[index]}
              </button>
            </motion.div>
          );
        } else {
          return (
            <div
              className={clsx("gem-size", "rounded-full mx-1 select-none")}
              key={index}
            />
          );
        }
      })}
    </>
  );
};
