import { Card, Player } from "src/interfaces/Interfaces";
import { FC, useState } from "react";
import { CardDialog } from "./CardDialog/CardDialog";
import { CardsOnTable } from "./CardsOnTable/CardsOnTable";
import { BuildDialogProps } from "src/components/GameBoard/PlayingTable/PlayingTable";
import { ReserveFromDeckDialog } from "./ReserveFromDeckDialog/ReserveFromDeckDialog";
import { Box } from "@mui/material";

interface CardsSectionProps {
  build(...args: any[]): void;
  buildDialogProps?: BuildDialogProps;
  cards: Array<Array<Card | undefined>>;
  closeDialog(): void;
  dialogOpen: boolean;
  disabled?: boolean;
  hideAffordableHint?: boolean;

  numCardsInDeck: Array<number>;
  onClick(buildDialogProps: BuildDialogProps): void;
  player: Player;
  reserve(...args: any[]): void;
}

export const CardsSection: FC<CardsSectionProps> = ({
  build,
  reserve,
  dialogOpen,
  closeDialog,
  buildDialogProps,
  player,
  cards,
  numCardsInDeck,
  onClick,
  hideAffordableHint,
  disabled,
}) => {
  const [
    reserveFromDeckDialogOpen,
    setReserveFromDeckDialogOpen,
  ] = useState<boolean>(false);
  const [reserveFromDeckLevel, setReserveFromDeckLevel] = useState<
    number | undefined
  >();
  const deckOnClick = (level: number) => {
    setReserveFromDeckLevel(level);
    setReserveFromDeckDialogOpen(true);
  };
  return (
    <>
      <CardDialog
        build={build}
        buildDialogProps={buildDialogProps}
        closeDialog={closeDialog}
        open={dialogOpen}
        player={player}
        reserve={reserve}
      />
      {reserveFromDeckLevel !== undefined && (
        <ReserveFromDeckDialog
          level={reserveFromDeckLevel}
          onClose={() => {
            setReserveFromDeckDialogOpen(false);
            setReserveFromDeckLevel(undefined);
          }}
          onConfirm={() => {
            reserve(reserveFromDeckLevel, 0);
            setReserveFromDeckDialogOpen(false);
            setReserveFromDeckLevel(undefined);
          }}
          open={reserveFromDeckDialogOpen}
        />
      )}

      <Box sx={{ marginTop: 1 }}>
        <CardsOnTable
          cardOnClick={onClick}
          cards={cards}
          deckOnClick={deckOnClick}
          disabled={disabled}
          hideAffordableHint={hideAffordableHint}
          numCardsInDeck={numCardsInDeck}
          player={player}
        />
      </Box>
    </>
  );
};
