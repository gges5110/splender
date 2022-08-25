import * as React from "react";
import { Player } from "../../../../Interfaces";
import { CardDisplay } from "../../../Shared/CardDisplay/CardDisplay";
import { Button } from "../../../Shared/Button";
import { Modal } from "../../../Shared/Modal";
import { CloseSVGPath } from "../../../Shared/SVGPaths";
import { BuildDialogProps } from "../../PlayingTable";
import { playerCanAffordCard } from "../../../../engine/MovesUtil";

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
    <Modal open={open} onClose={closeDialog}>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className={"flex justify-center mx-auto"}>
            {buildDialogProps && (
              <CardDisplay card={buildDialogProps.card} enabled={true} />
            )}
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6">
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
            svgPath={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            }
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
            svgPath={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
              />
            }
          >
            <span>Reserve</span>
          </Button>
          <Button svgPath={CloseSVGPath} onClick={closeDialog}>
            <span>Cancel</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};
