import { NobleDisplay } from "../../../../Shared/NobleDisplay/NobleDisplay";
import { CardDisplay } from "../../../../Shared/CardDisplay/CardDisplay";
import { Player } from "../../../../../Interfaces";
import * as React from "react";
import { Modal } from "../../../../Shared/Modal";
import { Dialog } from "@headlessui/react";

interface PlayerDialogProps {
  player: Player;
  playerDialogOpen: boolean;

  closePlayerDialog(): void;
}

export const PlayerDialog: React.FC<PlayerDialogProps> = ({
  playerDialogOpen,
  closePlayerDialog,
  player,
}) => {
  return (
    <Modal onClose={closePlayerDialog} open={playerDialogOpen}>
      <div className={"px-4 pt-5 pb-4 sm:p-6 sm:pb-4"}>
        <Dialog.Title
          as={"h3"}
          className={
            "text-lg font-medium leading-6 text-gray-900 dark:text-white"
          }
        >
          Player nobles and cards
        </Dialog.Title>
        <div className={"sm:flex sm:items-start"}>
          <div className={"flex flex-col justify-center mx-auto gap-2"}>
            <div className={"flex"}>
              {player.nobles.map((noble, index) => (
                <NobleDisplay key={index} noble={noble} />
              ))}
            </div>
            <div
              className={"grid grid-flow-row grid-cols-5 sm:grid-cols-6 gap-2"}
            >
              {player.cards.map((card, index) => (
                <CardDisplay card={card} enabled={false} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
