import * as React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { gemsColorStyle, gemsTextColorStyle } from "../../../../../../styles";

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
      {selectedGems.map((gemCount, index) => {
        if (selectedGems[index] === 0) {
          return (
            <div
              className={"gem-size gem-button-deselect flex-initial"}
              key={index}
            />
          );
        }

        return (
          <motion.div
            animate={{
              opacity: 1,
              y: 0,
            }}
            className={"gem-size gem-button-deselect flex-initial"}
            initial={{
              opacity: 0,
              y: -50,
            }}
            key={index}
          >
            <button
              className={clsx(
                "gem-size gem-button-deselect flex-initial",
                gemsTextColorStyle[index],
                gemsColorStyle[index]
              )}
              onClick={() => {
                selectedGemOnClick(index);
              }}
            >
              {selectedGems[index]}
            </button>
          </motion.div>
        );
      })}
    </>
  );
};
