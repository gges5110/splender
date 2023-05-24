import { FC } from "react";
import { NobleDisplay } from "../../../../Shared/NobleDisplay/NobleDisplay";
import { Noble, Player } from "../../../../../Interfaces";
import { getVisitingNobleIndexArray } from "../../../../../engine/MovesUtil";
import { Modal } from "../../../../Shared/Modal";
import { Dialog } from "@headlessui/react";

interface PickNobleDialogProps {
  open: boolean;
  players: Array<Player>;
  nobles: Array<Noble>;
  currentPlayer: string;

  pick(index: number): void;
}

export const PickNobleDialog: FC<PickNobleDialogProps> = ({
  open,
  players,
  nobles,
  currentPlayer,
  pick,
}) => {
  return (
    <Modal onClose={() => {}} open={open}>
      <div className={"bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4"}>
        <Dialog.Title
          as={"h3"}
          className={"text-lg leading-6 font-medium text-gray-700"}
        >
          Pick Noble
        </Dialog.Title>
        <div className={"flex justify-center gap-2"}>
          {getVisitingNobleIndexArray(
            players[Number(currentPlayer)],
            nobles
          ).map((nobleIndex) => (
            <NobleDisplay
              key={nobleIndex}
              noble={nobles[nobleIndex]}
              onClick={() => pick(nobleIndex)}
            />
          ))}
        </div>
      </div>
    </Modal>
  );
};
