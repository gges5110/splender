import { FC } from "react";
import { GemsPicker, GemsPickerMode } from "./GemsPicker/GemsPicker";
import { SectionCollapse } from "src/components/Shared/SectionCollapse/SectionCollapse";
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
  <SectionCollapse title={"Gems"}>
    <Box p={1}>
      <GemsPicker
        disabled={disabled}
        gems={gems}
        mode={GemsPickerMode.PICK}
        onSelect={onSelect}
      />
    </Box>
  </SectionCollapse>
);
