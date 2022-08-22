import { Noble } from "../../../Interfaces";
import { FC } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NobleDisplay } from "../../Shared/NobleDisplay/NobleDisplay";

interface NoblesSectionProps {
  nobles: Array<Noble>;
  isVisible: boolean;
}

export const NoblesSection: FC<NoblesSectionProps> = ({
  nobles,
  isVisible,
}) => {
  return (
    // @ts-ignore
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial="collapsed"
          animate="open"
          exit="collapsed"
          variants={{
            open: { opacity: 1, height: "auto" },
            collapsed: { opacity: 0, height: 0 },
          }}
          transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          className={"flex justify-between gap-2 mt-2"}
        >
          {nobles.map((noble, index) => (
            <NobleDisplay noble={noble} key={index} />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
