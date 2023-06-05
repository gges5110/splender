import { useState } from "react";
import * as React from "react";
import { SelectedGems } from "./SelectedGems/SelectedGems";
import { SelectableGems } from "./SelectableGems/SelectableGems";
import { ActionButton } from "./ActionButton/ActionButton";
import { ResetButton } from "./ResetButton/ResetButton";

export enum GemsPickerMode {
  PICK,
  DISCARD,
}

interface GemsPickerProps {
  disabled?: boolean;
  gems: number[];
  gemsToDiscard?: number;
  mode: GemsPickerMode;
  onSelect(gems: number[]): void;
}

export const GemsPicker: React.FC<GemsPickerProps> = ({
  gems,
  onSelect,
  mode,
  gemsToDiscard,
  disabled,
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
      <div className={"flex justify-between items-center gap-2"}>
        <SelectableGems
          disabled={disabled}
          gems={gems}
          mode={mode}
          onSelect={(index) => {
            setGems(
              Object.assign([], selectedGems, {
                [index]: selectedGems[index] + 1,
              })
            );
          }}
          selectedGems={selectedGems}
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

      <div className={"flex justify-between items-center gap-2"}>
        <SelectedGems
          selectedGemOnClick={(index) => {
            setGems(
              Object.assign([], selectedGems, {
                [index]: selectedGems[index] - 1,
              })
            );
          }}
          selectedGems={selectedGems}
        />
        <div className={"gem-size gem-button flex-initial"} key={5} />
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
