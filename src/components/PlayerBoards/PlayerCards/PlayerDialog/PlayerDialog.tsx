import { NobleDisplay } from "../../../NobleDisplay";
import { CardDisplay } from "../../../CardDisplay";
import { Button } from "../../../Button";
import { Player } from "../../../../Interfaces";
import React from "react";

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
    <dialog
      open={playerDialogOpen}
      className={"fixed top-1/4 rounded-lg bg-pink-200 shadow-lg w-max"}
    >
      <div className={"flex"}>
        {player.nobles.map((noble, index) => (
          <NobleDisplay noble={noble} key={index} />
        ))}
      </div>
      <div className={"grid grid-flow-row grid-cols-6 gap-2"}>
        {player.cards.map((card, index) => (
          <CardDisplay
            key={index}
            player={player}
            card={card}
            enabled={false}
            hideAffordableHint={true}
          />
        ))}
      </div>
      <div className={"my-2"}>
        <Button
          svgPath={
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          }
          onClick={closePlayerDialog}
        >
          <span>Close</span>
        </Button>
      </div>
    </dialog>
  );
};
