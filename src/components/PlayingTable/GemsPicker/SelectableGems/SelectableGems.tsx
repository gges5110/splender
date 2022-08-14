import { FC } from "react";
import clsx from "clsx";
import {
  gemsColorStyle,
  gemsHoverColorStyle,
  gemsTextColorStyle,
} from "../../../SplendorBoard";
import { gemsSelectable } from "../../../../utils/GemUtils";
import { GemsPickerMode } from "../GemsPicker";

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
      {gems.map((gemCount: number, index: number) => {
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
