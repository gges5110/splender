import { FC } from "react";
import clsx from "clsx";
import { gemsColorStyle, gemsTextColorStyle } from "../../../SplendorBoard";
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
        if (index === 5) {
          return (
            <button
              key={index}
              className={clsx(
                "gem-size",
                "rounded-full mx-1 select-none",
                gemsTextColorStyle[index],
                gemsColorStyle[index]
              )}
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
            className={clsx(
              "gem-size",
              "rounded-full mx-1 select-none",
              gemsTextColorStyle[index],
              gemsColorStyle[index],
              {
                "opacity-20": disabled,
              }
            )}
            disabled={disabled}
            onClick={() => {
              if (!disabled) {
                onSelect(index);
              }
            }}
          >
            {gemCount - selectedGems[index]}
          </button>
        );
      })}
    </>
  );
};
