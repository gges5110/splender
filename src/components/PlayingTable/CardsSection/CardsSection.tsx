import { Card, Player } from "../../../Interfaces";
import { FC } from "react";
import { CardDialog } from "./CardDialog/CardDialog";
import { CardsOnTable } from "./CardsOnTable/CardsOnTable";
import { BuildDialogProps } from "../PlayingTable";

interface CardsSectionProps {
  build: (...args: any[]) => void;
  reserve: (...args: any[]) => void;
  dialogOpen: boolean;
  buildDialogProps?: BuildDialogProps;
  player: Player;
  cards: Array<Array<Card | undefined>>;
  cardsInDeck: Array<Array<Card>>;
  hideAffordableHint?: boolean;

  closeDialog(): void;

  onClick(buildDialogProps: BuildDialogProps): void;
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
      <span className={"title"}>Cards</span>
      <CardsOnTable
        cards={cards}
        player={player}
        cardsInDeck={cardsInDeck}
        onClick={onClick}
        hideAffordableHint={hideAffordableHint}
      />
    </>
  );
};
