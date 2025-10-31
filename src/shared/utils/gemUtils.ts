// Note: GemsPickerMode and reducer will be imported from feature-specific location
// This creates a temporary dependency that we'll address when we move GemsPicker

import {
  GemsPickerMode,
  reducer,
} from "src/features/game-board/components/PlayingTable/GemsSection/GemsPicker/GemsPicker";

export const gemsSelectable = (
  selectedGems: number[],
  gemCount: number,
  index: number,
  mode: GemsPickerMode
): boolean => {
  if (gemCount <= selectedGems[index]) {
    return false;
  }

  if (mode === GemsPickerMode.DISCARD) {
    return true;
  }

  // if there are more than one color, disable those colors.
  const totalCount = selectedGems.reduce(reducer);

  if (totalCount > 1 && selectedGems[index] > 0) {
    return false;
  }

  // Select 2 gems of the same color
  if (selectedGems.some((gemCount) => gemCount === 2)) {
    return false;
  }

  // Must have more than 4 gems to pick 2 of the same color.
  if (selectedGems[index] === 1 && gemCount < 4) {
    return false;
  }

  // Select 3 gems of different colors
  if (selectedGems.every((gemCount) => gemCount <= 1) && totalCount <= 2) {
    return true;
  }

  return selectedGems[index] <= 1 && totalCount <= 2;
};
