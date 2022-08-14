import { Card, Player } from "../../../../Interfaces";
import React, { FC, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CardDisplay } from "../../../CardDisplay";

const variants = {
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
  player: Player;
  elementKey: React.Key;

  onClick(): void;

  hideAffordableHint?: boolean;
}

export const CardOnTable: FC<CardOnTableProps> = ({
  card,
  player,
  hideAffordableHint,
  elementKey,
  onClick,
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
    <motion.div
      className={"col-span-1"}
      key={elementKey}
      variants={variants}
      initial={"stop"}
      animate={state ? "fadeIn" : "stop"}
    >
      <CardDisplay
        player={player}
        card={card}
        enabled={true}
        hideAffordableHint={hideAffordableHint}
        onClick={cardOnClick}
      />
    </motion.div>
  );
};
