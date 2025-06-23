import { FC, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button, Box } from "@mui/material";
import { colorIndexToPalette } from "src/styles/paletteTheme";
import { gameStyles } from "src/styles/gameStyles";

interface SelectedGemProps {
  index: number;

  selectedGemOnClick(index: number): void;

  selectedGems: number[];
}

export const SelectedGem: FC<SelectedGemProps> = ({
  index,
  selectedGems,
  selectedGemOnClick,
}) => {
  const [shouldWaitForExit, setShouldWaitForExit] = useState(false);
  const visible = selectedGems[index] !== 0;
  return (
    <>
      <AnimatePresence
        key={index}
        onExitComplete={() => {
          setShouldWaitForExit(false);
        }}
      >
        {visible && (
          <motion.div
            animate={{
              opacity: 1,
              y: 0,
            }}
            style={{
              width: gameStyles.gemSize.width,
              height: gameStyles.gemSize.height,
              flexShrink: 0,
            }}
            exit={{ opacity: 0, y: -50 }}
            initial={{
              opacity: 0,
              y: -50,
            }}
            onAnimationStart={() => {
              setShouldWaitForExit(true);
            }}
          >
            <Button
              sx={{
                ...gameStyles.gemSize,
                flexShrink: 0,
                borderRadius: "50%",
              }}
              color={colorIndexToPalette[index]}
              onClick={() => {
                selectedGemOnClick(index);
              }}
            >
              {selectedGems[index]}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      {!visible && !shouldWaitForExit && (
        <Box 
          sx={{
            ...gameStyles.gemSize,
            flexShrink: 0,
          }}
          key={"invisible" + index} 
        />
      )}
    </>
  );
};
