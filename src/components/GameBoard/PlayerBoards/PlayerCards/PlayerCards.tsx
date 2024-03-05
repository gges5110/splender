import { Card, Player } from "src/interfaces/Interfaces";
import { useState } from "react";
import * as React from "react";
import { ReservedCardsDialog } from "./ReservedCardsDialog/ReservedCardsDialog";
import { getCardCountByColor, playerCanAffordCard } from "src/engine/MovesUtil";
import { Box, Button } from "@mui/material";
import { colorIndexToPalette } from "src/styles/paletteTheme";

interface PlayerCardsProps {
  buildFromReserve(cardIdx: number): void;
  cards: Card[];
  isActivePlayer: boolean;
  onCardClick(): void;

  player: Player;
  reservedCards: Card[];
}

export const PlayerCards: React.FC<PlayerCardsProps> = ({
  cards,
  reservedCards,
  player,
  isActivePlayer,
  buildFromReserve,
  onCardClick,
}) => {
  const [reserveDialogOpen, setReserveDialogOpen] = useState<boolean>(false);

  const cardCountByColor = getCardCountByColor(cards);
  return (
    <Box
      className={"gap-1 sm:gap-4"}
      display={"flex"}
      justifyContent={"flex-start"}
    >
      {cardCountByColor.map((cardCount, index) => (
        <div className={"w-12 h-20"} key={index}>
          {cardCount > 0 && (
            <Button
              color={colorIndexToPalette[index]}
              onClick={onCardClick}
              sx={{ height: "100%", width: "100%", borderRadius: 2 }}
            >
              {cardCount}
            </Button>
          )}
        </div>
      ))}
      <div className={"w-12 h-20"}>
        {reservedCards.length > 0 && (
          <Button
            color={colorIndexToPalette[5]}
            disabled={reservedCards.length === 0 || !isActivePlayer}
            onClick={() => setReserveDialogOpen(true)}
            sx={{ height: "100%", width: "100%", borderRadius: 2 }}
          >
            {reservedCards.length}
          </Button>
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
    </Box>
  );
};
