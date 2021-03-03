import { Card, Player } from "../Interfaces";
import React, { useState } from "react";
import { gemsColorStyle, gemsTextColorStyle } from "./SplendorBoard";
import { CardDisplay } from "./CardDisplay";
import { playerCanAffordCard } from "./CardDialog";

interface PlayerCardsProps {
  player: Player;
  cards: Card[];
  reservedCards: Card[];
  isActivePlayer: boolean;
  buildFromReserve(cardIdx: number): void;
}

const getCardCountByColor = (cards: Card[]) => {
  const cardCountByColor: number[] = Array(5).fill(0);
  cards.map((card) => cardCountByColor[card.color]++);
  return cardCountByColor;
};

export const PlayerCards: React.FC<PlayerCardsProps> = ({
  cards,
  reservedCards,
  player,
  isActivePlayer,
  buildFromReserve,
}) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const cardCountByColor = getCardCountByColor(cards);
  return (
    <div className={"flex justify-start"}>
      <dialog open={dialogOpen} className={"rounded-lg bg-pink-200 shadow-lg"}>
        {reservedCards.map((reservedCard, index) => (
          <CardDisplay
            player={player}
            card={reservedCard}
            enabled={playerCanAffordCard(reservedCard, player)}
            onClick={() => {
              if (playerCanAffordCard(reservedCard, player)) {
                buildFromReserve(index);
                setDialogOpen(false);
              }
            }}
          />
        ))}
        <button
          className={
            "bg-gray-100 text-base font-semibold py-2 px-4 rounded-lg shadow-md inline-flex items-center"
          }
          onClick={() => setDialogOpen(false)}
        >
          Close
        </button>
      </dialog>

      {cardCountByColor.map((cardCount, index) => (
        <div className={"w-12 h-20 mx-2"} key={index}>
          {cardCount > 0 && (
            <button
              disabled={true}
              className={"w-full h-full rounded-md"}
              style={{
                backgroundColor: gemsColorStyle[index],
                color: gemsTextColorStyle[index],
              }}
            >
              {cardCount}
            </button>
          )}
        </div>
      ))}
      <div className={"w-12 h-20 mx-2"}>
        {reservedCards.length > 0 && (
          <button
            className={"w-full h-full rounded-md"}
            onClick={() => setDialogOpen(true)}
            disabled={reservedCards.length === 0 || !isActivePlayer}
            style={{
              backgroundColor: gemsColorStyle[5],
              color: gemsTextColorStyle[5],
            }}
          >
            {reservedCards.length}
          </button>
        )}
      </div>
    </div>
  );
};
