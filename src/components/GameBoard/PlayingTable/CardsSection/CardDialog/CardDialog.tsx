import * as React from "react";
import { Player } from "../../../../../Interfaces";
import { CardDisplay } from "../../../../Shared/CardDisplay/CardDisplay";
import { Button } from "../../../../Shared/Button";
import { Modal } from "../../../../Shared/Modal";
import { BuildDialogProps } from "../../PlayingTable";
import { playerCanAffordCard } from "../../../../../engine/MovesUtil";
import {
  ArrowDownOnSquareStackIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

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
  return (
    <Modal onClose={closeDialog} open={open}>
      <div className={"px-4 pt-5 pb-4 sm:p-6 sm:pb-4"}>
        <div className={"sm:flex sm:items-start"}>
          <div className={"flex justify-center mx-auto"}>
            {buildDialogProps && (
              <CardDisplay card={buildDialogProps.card} enabled={true} />
            )}
          </div>
        </div>
      </div>
      <div className={"bg-gray-50 px-4 py-3 sm:px-6 dark:bg-slate-800"}>
        <div className={"flex gap-2"}>
          <Button
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
            svgPath={<PlusIcon />}
          >
            <span>Purchase</span>
          </Button>
          <Button
            disabled={player.reservedCards.length >= 3}
            onClick={() => {
              if (buildDialogProps && player.reservedCards.length <= 3) {
                reserve(buildDialogProps.level, buildDialogProps.index);
                closeDialog();
              }
            }}
            svgPath={<ArrowDownOnSquareStackIcon />}
          >
            <span>Reserve</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};
