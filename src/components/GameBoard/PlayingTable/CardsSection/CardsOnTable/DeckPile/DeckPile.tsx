import * as React from "react";
import { Button, Tooltip } from "@mui/material";

interface DeckPileProps {
  deckOnClick(level: number): void;

  disabled?: boolean;
  level: number;
  numCardsInDeck: Array<number>;
}

export const DeckPile: React.FC<DeckPileProps> = ({
  level,
  numCardsInDeck,
  deckOnClick,
  disabled,
}) => (
  <Tooltip placement={"left"} title={"Deck"}>
    <Button
      color={"neutral"}
      disabled={numCardsInDeck[level] === 0 || disabled}
      key={level}
      onClick={() => {
        deckOnClick(level);
      }}
      sx={{ mx: "auto", width: "100%" }}
    >
      <div>{numCardsInDeck[level]}</div>
    </Button>
  </Tooltip>
);
