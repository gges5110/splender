import { FC } from "react";
import clsx from "clsx";
import { gemsSelectable } from "../../../../../../utils/GemUtils";
import { GemsPickerMode } from "../GemsPicker";
import {
  gemsColorStyle,
  gemsHoverColorStyle,
  gemsTextColorStyle,
} from "../../../../../../styles";

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
            className={clsx(
              "gem-size gem-button flex-initial",
              gemsTextColorStyle[index],
              gemsHoverColorStyle[index],
              gemsColorStyle[index],
              {
                "opacity-20": index !== 5 && disabled,
              }
            )}
            disabled={disabled}
            key={index}
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
