import { Card, Player } from "../../../Interfaces";
import React, { useState } from "react";
import { gemsColorStyle, gemsTextColorStyle } from "../../SplendorBoard";
import { playerCanAffordCard } from "../../PlayingTable/CardDialog/CardDialog";
import { PlayerDialog } from "./PlayerDialog/PlayerDialog";
import { ReservedCardsDialog } from "./ReservedCardsDialog/ReservedCardsDialog";

interface PlayerCardsProps {
  player: Player;
  cards: Card[];
  reservedCards: Card[];
  isActivePlayer: boolean;

  buildFromReserve(cardIdx: number): void;
}

export const PlayerCards: React.FC<PlayerCardsProps> = ({
  cards,
  reservedCards,
  player,
  isActivePlayer,
  buildFromReserve,
}) => {
  const [reserveDialogOpen, setReserveDialogOpen] = useState<boolean>(false);
  const [playerDialogOpen, setPlayerDialogOpen] = useState<boolean>(false);

  const cardCountByColor = getCardCountByColor(cards);
  return (
    <div className={"flex justify-start gap-1 sm:gap-4"}>
      {cardCountByColor.map((cardCount, index) => (
        <div className={"w-8 sm:w-12 h-16 sm:h-20"} key={index}>
          {cardCount > 0 && (
            <button
              // disabled={true}
              className={"w-full h-full rounded-md"}
              style={{
                backgroundColor: gemsColorStyle[index],
                color: gemsTextColorStyle[index],
              }}
              onClick={() => setPlayerDialogOpen(true)}
            >
              {cardCount}
            </button>
          )}
        </div>
      ))}
      <div className={"w-8 sm:w-12 h-16 sm:h-20"}>
        {reservedCards.length > 0 && (
          <button
            className={"w-full h-full rounded-md"}
            onClick={() => setReserveDialogOpen(true)}
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

      <ReservedCardsDialog
        reservedCards={reservedCards}
        reservedCardsDialogOpen={reserveDialogOpen}
        reservedCardOnClick={(reservedCard, index) => {
          if (playerCanAffordCard(reservedCard, player)) {
            buildFromReserve(index);
            setReserveDialogOpen(false);
          }
        }}
        player={player}
        closeReservedCardsDialog={() => {
          setReserveDialogOpen(false);
        }}
      />

      <PlayerDialog
        player={player}
        playerDialogOpen={playerDialogOpen}
        closePlayerDialog={() => {
          setPlayerDialogOpen(false);
        }}
      />
    </div>
  );
};

const getCardCountByColor = (cards: Card[]): number[] => {
  const cardCountByColor: number[] = Array(5).fill(0);
  cards.map((card) => cardCountByColor[card.color]++);
  return cardCountByColor;
};
