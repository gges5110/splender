import { Card, Player } from "../../../../Interfaces";
import { FC, useState } from "react";
import { CardDialog } from "./CardDialog/CardDialog";
import { CardsOnTable } from "./CardsOnTable/CardsOnTable";
import { BuildDialogProps } from "../PlayingTable";
import { ReserveFromDeckDialog } from "./ReserveFromDeckDialog/ReserveFromDeckDialog";
import { SectionCollapse } from "../../../Shared/SectionCollapse/SectionCollapse";

interface CardsSectionProps {
  build(...args: any[]): void;
  buildDialogProps?: BuildDialogProps;
  cards: Array<Array<Card | undefined>>;
  cardsInDeck: Array<Array<Card>>;
  closeDialog(): void;
  dialogOpen: boolean;
  disabled?: boolean;

  hideAffordableHint?: boolean;
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
  cardsInDeck,
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

      <SectionCollapse title={"Cards"}>
        <div className={"mt-2"}>
          <CardsOnTable
            cardOnClick={onClick}
            cards={cards}
            cardsInDeck={cardsInDeck}
            deckOnClick={deckOnClick}
            disabled={disabled}
            hideAffordableHint={hideAffordableHint}
            player={player}
          />
        </div>
      </SectionCollapse>
    </>
  );
};
