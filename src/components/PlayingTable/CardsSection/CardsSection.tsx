import { Card, Player } from "../../../Interfaces";
import { FC, useState } from "react";
import { CardDialog } from "./CardDialog/CardDialog";
import { CardsOnTable } from "./CardsOnTable/CardsOnTable";
import { BuildDialogProps } from "../PlayingTable";
import { ReserveFromDeckDialog } from "./ReserveFromDeckDialog/ReserveFromDeckDialog";

interface CardsSectionProps {
  dialogOpen: boolean;
  buildDialogProps?: BuildDialogProps;
  player: Player;
  cards: Array<Array<Card | undefined>>;
  cardsInDeck: Array<Array<Card>>;
  hideAffordableHint?: boolean;

  closeDialog(): void;
  onClick(buildDialogProps: BuildDialogProps): void;
  build(...args: any[]): void;
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
  cardsInDeck,
  onClick,
  hideAffordableHint,
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
        open={dialogOpen}
        closeDialog={closeDialog}
        buildDialogProps={buildDialogProps}
        player={player}
        build={build}
        reserve={reserve}
      />
      {reserveFromDeckLevel !== undefined && (
        <ReserveFromDeckDialog
          open={reserveFromDeckDialogOpen}
          level={reserveFromDeckLevel}
          onConfirm={() => {
            reserve(reserveFromDeckLevel, 0);
            setReserveFromDeckDialogOpen(false);
            setReserveFromDeckLevel(undefined);
          }}
          onClose={() => {
            setReserveFromDeckDialogOpen(false);
            setReserveFromDeckLevel(undefined);
          }}
        />
      )}

      <span className={"title"}>Cards</span>
      <CardsOnTable
        cards={cards}
        player={player}
        cardsInDeck={cardsInDeck}
        onClick={onClick}
        deckOnClick={deckOnClick}
        hideAffordableHint={hideAffordableHint}
      />
    </>
  );
};
