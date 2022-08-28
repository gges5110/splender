import { FC } from "react";
import clsx from "clsx";
import { gemsSelectable } from "../../../../../utils/GemUtils";
import { GemsPickerMode } from "../GemsPicker";
import {
  gemsColorStyle,
  gemsHoverColorStyle,
  gemsTextColorStyle,
} from "../../../../../styles";

interface SelectableGemsProps {
  gems: number[];
  selectedGems: number[];
  mode: GemsPickerMode;

  onSelect(index: number): void;
}

export const SelectableGems: FC<SelectableGemsProps> = ({
  gems,
  selectedGems,
  mode,
  onSelect,
}) => {
  return (
    <>
      {gems.map((gemCount, index) => {
        const disabled =
          index === 5 || !gemsSelectable(selectedGems, gemCount, index, mode);
        const availableCount =
          gemCount - (index === 5 ? 0 : selectedGems[index]);
        return (
          <button
            key={index}
            className={clsx(
              "gem-size gem-button",
              gemsTextColorStyle[index],
              gemsHoverColorStyle[index],
              gemsColorStyle[index],
              {
                "opacity-20": index !== 5 && disabled,
              }
            )}
            disabled={disabled}
            onClick={() => {
              if (!disabled) {
                onSelect(index);
              }
            }}
          >
            {availableCount}
          </button>
        );
      })}
    </>
  );
};
