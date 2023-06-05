import { FC } from "react";
import clsx from "clsx";
import { gemsSelectable } from "../../../../../../utils/GemUtils";
import { GemsPickerMode } from "../GemsPicker";
import {
  gemsColorStyle,
  gemsHoverColorStyle,
  gemsTextColorStyle,
} from "../../../../../../styles";
import { Button } from "@mui/material";

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
          <Button
            className={clsx(
              "w-12 aspect-square sm:w-12 sm:h-12 rounded-full shadow-sm flex-initial",
              gemsTextColorStyle[index],
              gemsHoverColorStyle[index],
              gemsColorStyle[index],
              {
                "opacity-20": index !== 5 && isDisabled,
              }
            )}
            disabled={isDisabled}
            key={index}
            onClick={() => {
              if (!isDisabled) {
                onSelect(index);
              }
            }}
            sx={{ minWidth: 0 }}
          >
            {availableCount}
          </Button>
        );
      })}
    </>
  );
};
