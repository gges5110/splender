import { FC } from "react";
import { GemsPicker, GemsPickerMode } from "./GemsPicker/GemsPicker";
import { SectionCollapse } from "../../../Shared/SectionCollapse/SectionCollapse";

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
    <div className={"p-2"}>
      <GemsPicker
        disabled={disabled}
        gems={gems}
        mode={GemsPickerMode.PICK}
        onSelect={onSelect}
      />
    </div>
  </SectionCollapse>
);
