import { Card, Player } from "src/interfaces/Interfaces";
import { FC, useEffect, useRef, useState } from "react";
import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Variants } from "motion/react";
import { CardDisplay } from "src/components/Shared/CardDisplay/CardDisplay";
import { playerCanAffordCard } from "src/engine/MovesUtil";
import { Box } from "@mui/material";

const variants: Variants = {
  fadeIn: {
    opacity: [0, 1],
    x: [-100, 0],
    transition: { duration: 0.5, ease: "easeIn" },
  },
  stop: {
    opacity: 1,
    x: 0,
  },
};

interface CardOnTableProps {
  card: Card | undefined;
  disabled?: boolean;
  elementKey: React.Key;

  hideAffordableHint?: boolean;
  onClick(): void;
  player: Player;
}

export const CardOnTable: FC<CardOnTableProps> = ({
  card,
  player,
  hideAffordableHint,
  elementKey,
  onClick,
  disabled,
}) => {
  const cardOnClick = () => {
    if (card) {
      onClick();
    }
  };

  const firstUpdate = useRef(true);
  useEffect(() => {
    // Avoid initial render
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    if (card !== undefined) {
      setState(true);
      setTimeout(() => {
        setState(false);
      }, 250);
    }
  }, [card]);

  const [state, setState] = useState<boolean>(false);

  return (
    <AnimatePresence>
      {card == null ? (
        <Box gridColumn={"span 2 / span 2"} />
      ) : (
        <motion.div
          animate={state ? "fadeIn" : "stop"}
          exit={{ opacity: 0, scale: 0 }}
          initial={"stop"}
          key={elementKey}
          style={{ gridColumn: "span 2 / span 2" }}
          variants={variants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <CardDisplay
            affordable={
              hideAffordableHint !== true && playerCanAffordCard(card, player)
            }
            card={card}
            enabled={!disabled}
            onClick={cardOnClick}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
