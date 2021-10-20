import React, { Children, Fragment, useRef } from "react";
import { Card, Player } from "../Interfaces";
import { BuildDialogProps } from "./SplendorBoard";
import { CardDisplay } from "./CardDisplay";
import { Button } from "./Button";
import { Dialog, Transition } from "@headlessui/react";

interface CardDialogProps {
  open: boolean;
  buildDialogProps?: BuildDialogProps;
  player: Player;

  closeDialog(): void;

  build(level: number, index: number): void;

  reserve(level: number, index: number): void;
}

export const CardDialog: React.FC<CardDialogProps> = ({
  open,
  closeDialog,
  buildDialogProps,
  build,
  reserve,
  player,
}) => {
  const cancelButtonRef = useRef(null);
  return (
    <Modal open={open} onClose={closeDialog}>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className={"flex justify-center mx-auto"}>
            {buildDialogProps && (
              <CardDisplay
                player={player}
                card={buildDialogProps.card}
                enabled={true}
              />
            )}
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6">
        <div className={"flex my-2"}>
          <button
            className={
              "bg-gray-100 text-base font-semibold py-2 px-4 rounded-lg shadow-md inline-flex items-center disabled:opacity-50 focus:outline-none focus:ring-2 hover:bg-gray-100"
            }
            disabled={
              buildDialogProps
                ? !playerCanAffordCard(buildDialogProps.card, player)
                : true
            }
            onClick={() => {
              if (buildDialogProps) {
                build(buildDialogProps.level, buildDialogProps.index);
                closeDialog();
              }
            }}
          >
            <svg
              className="w-4 h-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span>Purchase</span>
          </button>
          <button
            className={
              "bg-gray-100 text-base font-semibold py-2 px-4 rounded-lg shadow-md inline-flex items-center disabled:opacity-50 focus:outline-none focus:ring-2 hover:bg-gray-100 mx-2"
            }
            disabled={player.reservedCards.length >= 3}
            onClick={() => {
              if (buildDialogProps && player.reservedCards.length <= 3) {
                reserve(buildDialogProps.level, buildDialogProps.index);
                closeDialog();
              }
            }}
          >
            <svg
              className="w-4 h-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
              />
            </svg>
            <span>Reserve</span>
          </button>
          <Button
            svgPath={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            }
            onClick={closeDialog}
          >
            <span>Cancel</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

interface ModalProps {
  open: boolean;
  onClose(): void;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={onClose}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export const playerCanAffordCard = (card: Card, player: Player): boolean => {
  let goldCount = player.gems[5];
  for (let i = 0; i < 5; ++i) {
    const gemCost =
      card.cost[i] -
      player.cards.filter((card: Card) => card.color === i).length;
    const diff = gemCost - player.gems[i];
    if (diff > 0) {
      if (goldCount >= diff) {
        goldCount -= diff;
      } else {
        return false;
      }
    }
  }

  return true;
};
