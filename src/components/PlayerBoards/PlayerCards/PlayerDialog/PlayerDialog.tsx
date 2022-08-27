import { NobleDisplay } from "../../../Shared/NobleDisplay/NobleDisplay";
import { CardDisplay } from "../../../Shared/CardDisplay/CardDisplay";
import { Button } from "../../../Shared/Button";
import { Player } from "../../../../Interfaces";
import * as React from "react";
import { Modal } from "../../../Shared/Modal";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface PlayerDialogProps {
  playerDialogOpen: boolean;

  closePlayerDialog(): void;

  player: Player;
}

export const PlayerDialog: React.FC<PlayerDialogProps> = ({
  playerDialogOpen,
  closePlayerDialog,
  player,
}) => {
  return (
    <Modal open={playerDialogOpen} onClose={closePlayerDialog}>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className={"flex flex-col justify-center mx-auto gap-2"}>
            <div className={"flex"}>
              {player.nobles.map((noble, index) => (
                <NobleDisplay noble={noble} key={index} />
              ))}
            </div>
            <div
              className={"grid grid-flow-row grid-cols-5 sm:grid-cols-6 gap-2"}
            >
              {player.cards.map((card, index) => (
                <CardDisplay key={index} card={card} enabled={false} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
