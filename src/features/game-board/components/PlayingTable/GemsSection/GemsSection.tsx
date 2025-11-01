import { FC } from "react";
import { GemsPicker, GemsPickerMode } from "./GemsPicker/GemsPicker";
import { Box } from "@mui/material";

interface GemsSectionProps {
  disabled?: boolean;
  gems: number[];
  onSelect(gems: number[]): void;
}

export const GemsSection: FC<GemsSectionProps> = ({
  gems,
  onSelect,
  disabled,
}) => (
  <Box p={1}>
    <GemsPicker
      disabled={disabled}
      gems={gems}
      mode={GemsPickerMode.PICK}
      onSelect={onSelect}
    />
  </Box>
);
