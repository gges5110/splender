import { NobleDisplay } from "../../../NobleDisplay";
import { CardDisplay } from "../../../CardDisplay";
import { Button } from "../../../Shared/Button";
import { Player } from "../../../../Interfaces";
import React from "react";
import { Modal } from "../../../Shared/Modal";
import { CloseSVGPath } from "../../../Shared/SVGPaths";

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
          <div className={"flex justify-center mx-auto"}>
            <div className={"flex"}>
              {player.nobles.map((noble, index) => (
                <NobleDisplay noble={noble} key={index} />
              ))}
            </div>
            <div className={"grid grid-flow-row grid-cols-6 gap-2"}>
              {player.cards.map((card, index) => (
                <CardDisplay key={index} card={card} enabled={false} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6">
        <div className={"flex my-2"}>
          <Button svgPath={CloseSVGPath} onClick={closePlayerDialog}>
            <span>Cancel</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};
