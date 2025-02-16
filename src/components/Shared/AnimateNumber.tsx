import { AnimatePresence, motion } from "motion/react";
import { FC } from "react";

interface AnimateNumberProps {
  value: number;
}

export const AnimateNumber: FC<AnimateNumberProps> = ({ value }) => {
  return (
    <AnimatePresence mode={"wait"}>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        initial={{ opacity: 0, y: -20 }}
        key={value}
        transition={{ duration: 0.3 }}
      >
        {value}
      </motion.div>
    </AnimatePresence>
  );
};
