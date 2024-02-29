import { Card, Player } from "../../../../../interfaces/Interfaces";
import * as React from "react";
import { CardOnTable } from "./CardOnTable/CardOnTable";
import { BuildDialogProps } from "../../PlayingTable";
import { Button, Tooltip } from "@mui/material";

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
    <div
      className={
        "grid grid-flow-row grid-cols-5 grid-rows-3 gap-4 sm:gap-2 w-full"
      }
    >
      {cardsPerLevel
        .map((cards, level: number) => (
          <React.Fragment key={level}>
            <Tooltip placement={"left"} title={"Deck"}>
              <Button
                color={"neutral"}
                disabled={numCardsInDeck[level] === 0 || disabled}
                key={level}
                onClick={() => {
                  deckOnClick(level);
                }}
                sx={{ width: "60%", mx: "auto" }}
              >
                <div>{numCardsInDeck[level]}</div>
              </Button>
            </Tooltip>
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
    </div>
  );
};