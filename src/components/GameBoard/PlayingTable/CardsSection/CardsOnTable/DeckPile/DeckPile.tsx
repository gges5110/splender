import * as React from "react";
import { Box, Button, Tooltip } from "@mui/material";

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
    <Box>
      <Button
        color={"neutral"}
        disabled={numCardsInDeck[level] === 0 || disabled}
        key={level}
        onClick={() => {
          deckOnClick(level);
        }}
        sx={{ width: "100%", height: "100%" }}
      >
        <div>{numCardsInDeck[level]}</div>
      </Button>
    </Box>
  </Tooltip>
);
