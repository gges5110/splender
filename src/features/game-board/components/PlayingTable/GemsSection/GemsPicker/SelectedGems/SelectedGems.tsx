import * as React from "react";
import { SelectedGem } from "./SelectedGem";

interface SelectedGemsProps {
  selectedGemOnClick(index: number): void;

  selectedGems: number[];
}

export const SelectedGems: React.FC<SelectedGemsProps> = ({
  selectedGems,
  selectedGemOnClick,
}) => (
  <>
    {selectedGems.map((gemCount, index) => (
      <SelectedGem
        index={index}
        key={index}
        selectedGemOnClick={selectedGemOnClick}
        selectedGems={selectedGems}
      />
    ))}
  </>
);
