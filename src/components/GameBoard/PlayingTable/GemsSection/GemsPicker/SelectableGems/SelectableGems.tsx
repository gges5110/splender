import { FC } from "react";
import { gemsSelectable } from "src/utils/GemUtils";
import { GemsPickerMode } from "src/components/GameBoard/PlayingTable/GemsSection/GemsPicker/GemsPicker";
import { Button } from "@mui/material";
import { colorIndexToPalette } from "src/styles/paletteTheme";
import { motion } from "motion/react";

interface SelectableGemsProps {
  disabled?: boolean;
  gems: number[];
  mode: GemsPickerMode;
  onSelect(index: number): void;
  selectedGems: number[];
}

export const SelectableGems: FC<SelectableGemsProps> = ({
  gems,
  selectedGems,
  mode,
  onSelect,
  disabled,
}) => {
  return (
    <>
      {gems.map((gemCount, index) => {
        const isDisabled =
          index === 5 ||
          !gemsSelectable(selectedGems, gemCount, index, mode) ||
          disabled;
        const availableCount =
          gemCount - (index === 5 ? 0 : selectedGems[index]);

        return (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              color={colorIndexToPalette[index]}
              disabled={isDisabled}
              key={index}
              onClick={() => {
                if (!isDisabled) {
                  onSelect(index);
                }
              }}
              style={{
                width: "48px",
                aspectRatio: "1/1",
                borderRadius: "100%",
                flex: "0 1 auto",
              }}
            >
              {availableCount}
            </Button>
          </motion.div>
        );
      })}
    </>
  );
};
