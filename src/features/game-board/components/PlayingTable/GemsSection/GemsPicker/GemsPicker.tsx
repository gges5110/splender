import { useState, useEffect } from "react";
import * as React from "react";
import { SelectedGems } from "./SelectedGems/SelectedGems";
import { SelectableGems } from "./SelectableGems/SelectableGems";
import { ActionButton } from "./ActionButton";
import { ResetButton } from "./ResetButton";
import { Box } from "@mui/material";

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
  turn?: number;
}

export const GemsPicker: React.FC<GemsPickerProps> = ({
  gems,
  onSelect,
  mode,
  gemsToDiscard,
  disabled,
  turn,
}) => {
  const [selectedGems, setGems] = useState<number[]>(Array(5).fill(0));

  // Reset gem picker when turn changes
  useEffect(() => {
    setGems(Array(5).fill(0));
  }, [turn]);

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
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={1}
      justifyContent={"space-between"}
    >
      <Box
        display={"grid"}
        gap={1}
        gridTemplateColumns={"repeat(8, minmax(0, 1fr))"}
      >
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
              : selectedGems.reduce((p, v) => p + v, 0) !== (gemsToDiscard || 0)
          }
          onClick={() => {
            onSelect(selectedGems);
            setGems(Array(5).fill(0));
          }}
        />
      </Box>

      <Box
        display={"grid"}
        gap={1}
        gridTemplateColumns={"repeat(8, minmax(0, 1fr))"}
      >
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
        <Box
          key={5}
          sx={{
            width: 48,
            height: 48,
            aspectRatio: 1,
            borderRadius: "50%",
            userSelect: "none",
            flex: "0 1 auto",
          }}
        />
        <ResetButton
          disabled={selectedGems.every((gem) => gem === 0)}
          onClick={() => setGems(Array(5).fill(0))}
        />
      </Box>
    </Box>
  );
};

export const reducer = (accumulator: number, currentValue: number) =>
  accumulator + currentValue;
