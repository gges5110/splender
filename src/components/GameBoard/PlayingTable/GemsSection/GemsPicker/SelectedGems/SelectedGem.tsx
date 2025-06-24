import { FC, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button, Box } from "@mui/material";
import { colorIndexToPalette } from "src/styles/paletteTheme";

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
            exit={{ opacity: 0, y: -50 }}
            initial={{
              opacity: 0,
              y: -50,
            }}
            onAnimationStart={() => {
              setShouldWaitForExit(true);
            }}
            style={{
              width: 48,
              height: 48,
              aspectRatio: 1,
              flex: "0 1 auto",
            }}
          >
            <Button
              color={colorIndexToPalette[index]}
              onClick={() => {
                selectedGemOnClick(index);
              }}
              sx={{
                width: 48,
                height: 48,
                aspectRatio: 1,
                flex: "0 1 auto",
                borderRadius: "100%",
              }}
            >
              {selectedGems[index]}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      {!visible && !shouldWaitForExit && (
        <Box
          key={"invisible" + index}
          sx={{
            width: 48,
            height: 48,
            aspectRatio: 1,
            flex: "0 1 auto",
          }}
        />
      )}
    </>
  );
};
