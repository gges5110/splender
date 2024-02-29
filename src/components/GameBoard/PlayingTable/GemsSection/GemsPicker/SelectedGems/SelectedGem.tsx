import { FC, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@mui/material";
import clsx from "clsx";
import { colorIndexToPalette } from "../../../../../../styles/paletteTheme";

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
            className={"gem-size flex-initial"}
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
              className={clsx("gem-size flex-initial")}
              color={colorIndexToPalette[index]}
              onClick={() => {
                selectedGemOnClick(index);
              }}
              sx={{ borderRadius: "100%" }}
            >
              {selectedGems[index]}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      {!visible && !shouldWaitForExit && (
        <div className={"gem-size flex-initial"} key={"invisible" + index} />
      )}
    </>
  );
};
