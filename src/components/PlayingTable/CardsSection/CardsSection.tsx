import { Card, Player } from "../../../Interfaces";
import { FC, useState } from "react";
import { CardDialog } from "./CardDialog/CardDialog";
import { CardsOnTable } from "./CardsOnTable/CardsOnTable";
import { BuildDialogProps } from "../PlayingTable";
import { ReserveFromDeckDialog } from "./ReserveFromDeckDialog/ReserveFromDeckDialog";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { NobleDisplay } from "../../Shared/NobleDisplay/NobleDisplay";

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

      <Disclosure defaultOpen={true}>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-slate-200 px-4 py-2 text-left font-medium text-slate-900 hover:bg-slate-300 focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75">
              <span className={"title"}>Cards</span>
              <ChevronUpIcon
                className={`${
                  open ? "rotate-180 transform" : ""
                } h-5 w-5 text-slate-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel>
              <div className={"flex justify-between gap-2 mt-2 mb-4"}>
                <CardsOnTable
                  cards={cards}
                  player={player}
                  cardsInDeck={cardsInDeck}
                  onClick={onClick}
                  deckOnClick={deckOnClick}
                  hideAffordableHint={hideAffordableHint}
                />
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};
