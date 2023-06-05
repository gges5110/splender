import { Card, Player } from "../../../../../../Interfaces";
import { FC, useEffect, useRef, useState } from "react";
import * as React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { CardDisplay } from "../../../../../Shared/CardDisplay/CardDisplay";
import { playerCanAffordCard } from "../../../../../../engine/MovesUtil";

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

  if (card == null) {
    return <div className={"col-span-1"} />;
  }

  return (
    <motion.div
      animate={state ? "fadeIn" : "stop"}
      className={"col-span-1"}
      initial={"stop"}
      key={elementKey}
      variants={variants}
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
  );
};
