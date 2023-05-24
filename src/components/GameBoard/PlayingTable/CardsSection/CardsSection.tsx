import { Card, Player } from "../../../../Interfaces";
import { FC, useState } from "react";
import { CardDialog } from "./CardDialog/CardDialog";
import { CardsOnTable } from "./CardsOnTable/CardsOnTable";
import { BuildDialogProps } from "../PlayingTable";
import { ReserveFromDeckDialog } from "./ReserveFromDeckDialog/ReserveFromDeckDialog";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";

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

      <Disclosure defaultOpen={true}>
        {({ open }) => (
          <>
            <Disclosure.Button className={"playing-table-subsections-title"}>
              <span className={"title"}>Cards</span>
              <ChevronUpIcon
                className={`${
                  open ? "rotate-180 transform" : ""
                } h-5 w-5 text-slate-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel>
              <div className={"mt-2 mb-4"}>
                <CardsOnTable
                  cardOnClick={onClick}
                  cards={cards}
                  cardsInDeck={cardsInDeck}
                  deckOnClick={deckOnClick}
                  hideAffordableHint={hideAffordableHint}
                  player={player}
                />
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};
