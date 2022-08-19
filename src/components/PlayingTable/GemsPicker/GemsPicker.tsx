import React, { useState } from "react";
import clsx from "clsx";
import { SelectedGems } from "./SelectedGems/SelectedGems";
import { SelectableGems } from "./SelectableGems/SelectableGems";
import { ActionButton } from "./ActionButton/ActionButton";
import { ResetButton } from "./ResetButton/ResetButton";

export enum GemsPickerMode {
  PICK,
  DISCARD,
}

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
      <div className={"flex"}>
        <SelectableGems
          selectedGems={selectedGems}
          gems={gems}
          onSelect={(index) => {
            setGems(
              Object.assign([], selectedGems, {
                [index]: selectedGems[index] + 1,
              })
            );
          }}
          mode={mode}
        />
        <ActionButton
          actionLabelText={actionLabelText}
          disabled={
            mode === GemsPickerMode.PICK
              ? selectedGems.every((gem) => gem === 0)
              : selectedGems.reduce((p, v) => p + v, 0) < (gemsToDiscard || 0)
          }
          onClick={() => {
            onSelect(selectedGems);
            setGems(Array(5).fill(0));
          }}
        />
      </div>

      <div className={"h-2"} />
      <div className={"flex"}>
        <SelectedGems
          selectedGems={selectedGems}
          selectedGemOnClick={(index) => {
            setGems(
              Object.assign([], selectedGems, {
                [index]: selectedGems[index] - 1,
              })
            );
          }}
        />
        <div className={clsx("gem-size", "mx-1")} key={5} />
        <ResetButton
          disabled={selectedGems.every((gem) => gem === 0)}
          onClick={() => setGems(Array(5).fill(0))}
        />
      </div>
    </>
  );
};

export const reducer = (accumulator: number, currentValue: number) =>
  accumulator + currentValue;
