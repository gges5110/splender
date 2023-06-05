import { Card, Player } from "../../../../Interfaces";
import { useState } from "react";
import * as React from "react";
import { ReservedCardsDialog } from "./ReservedCardsDialog/ReservedCardsDialog";
import clsx from "clsx";
import { gemsColorStyle, gemsTextColorStyle } from "../../../../styles";
import {
  getCardCountByColor,
  playerCanAffordCard,
} from "../../../../engine/MovesUtil";

interface PlayerCardsProps {
  buildFromReserve(cardIdx: number): void;
  cards: Card[];
  isActivePlayer: boolean;
  player: Player;

  reservedCards: Card[];
}

export const PlayerCards: React.FC<PlayerCardsProps> = ({
  cards,
  reservedCards,
  player,
  isActivePlayer,
  buildFromReserve,
}) => {
  const [reserveDialogOpen, setReserveDialogOpen] = useState<boolean>(false);

  const cardCountByColor = getCardCountByColor(cards);
  return (
    <div className={"flex justify-start gap-1 sm:gap-4"}>
      {cardCountByColor.map((cardCount, index) => (
        <div className={"w-8 sm:w-12 h-16 sm:h-20"} key={index}>
          {cardCount > 0 && (
            <button
              className={clsx(
                "w-full h-full rounded-md",
                gemsTextColorStyle[index],
                gemsColorStyle[index]
              )}
            >
              {cardCount}
            </button>
          )}
        </div>
      ))}
      <div className={"w-8 sm:w-12 h-16 sm:h-20"}>
        {reservedCards.length > 0 && (
          <button
            className={`w-full h-full rounded-md ${gemsTextColorStyle[5]} ${gemsColorStyle[5]}`}
            disabled={reservedCards.length === 0 || !isActivePlayer}
            onClick={() => setReserveDialogOpen(true)}
          >
            {reservedCards.length}
          </button>
        )}
      </div>

      <ReservedCardsDialog
        closeReservedCardsDialog={() => {
          setReserveDialogOpen(false);
        }}
        player={player}
        reservedCardOnClick={(reservedCard, index) => {
          if (playerCanAffordCard(reservedCard, player)) {
            buildFromReserve(index);
            setReserveDialogOpen(false);
          }
        }}
        reservedCards={reservedCards}
        reservedCardsDialogOpen={reserveDialogOpen}
      />
    </div>
  );
};
