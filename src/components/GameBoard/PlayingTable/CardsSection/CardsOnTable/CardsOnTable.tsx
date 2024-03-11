import { Card, Player } from "src/interfaces/Interfaces";
import * as React from "react";
import { CardOnTable } from "./CardOnTable/CardOnTable";
import { BuildDialogProps } from "src/components/GameBoard/PlayingTable/PlayingTable";
import { DeckPile } from "./DeckPile/DeckPile";
import { Box } from "@mui/material";

interface CardsOnTableProps {
  cardOnClick(buildDialogProps: BuildDialogProps): void;
  cards: Array<Array<Card | undefined>>;
  deckOnClick(level: number): void;

  disabled?: boolean;
  hideAffordableHint?: boolean;
  numCardsInDeck: Array<number>;
  player: Player;
}

export const CardsOnTable: React.FC<CardsOnTableProps> = ({
  cards: cardsPerLevel,
  numCardsInDeck,
  player,
  cardOnClick,
  deckOnClick,
  hideAffordableHint,
  disabled,
}) => {
  return (
    <Box
      display={"grid"}
      gap={{ xs: 1, sm: 2 }}
      gridAutoFlow={"row"}
      gridTemplateColumns={"repeat(9, minmax(0, 1fr))"}
      gridTemplateRows={"repeat(3, minmax(0, 1fr))"}
      justifyItems={{ xs: "unset", sm: "center" }}
      width={"100%"}
    >
      {cardsPerLevel
        .map((cards, level: number) => (
          <React.Fragment key={level}>
            <DeckPile
              deckOnClick={deckOnClick}
              disabled={disabled}
              level={level}
              numCardsInDeck={numCardsInDeck}
            />
            {cards.map((card, index) => {
              const onClick = () => {
                if (card) {
                  cardOnClick({
                    level,
                    index,
                    card,
                  });
                }
              };

              return (
                <CardOnTable
                  card={card}
                  disabled={disabled}
                  elementKey={level + index}
                  hideAffordableHint={hideAffordableHint}
                  key={level + index}
                  onClick={onClick}
                  player={player}
                />
              );
            })}
          </React.Fragment>
        ))
        .reverse()}
    </Box>
  );
};
