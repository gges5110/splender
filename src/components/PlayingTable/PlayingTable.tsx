import { GameState } from "../../Interfaces";
import { NobleDisplay } from "../NobleDisplay";
import { DiscardGemsDialog } from "./DiscardGemsDialog/DiscardGemsDialog";
import { getVisitingNobleIndexArray } from "../../Moves";
import { CardDialog } from "./CardDialog/CardDialog";
import { CardsOnTable } from "./CardsOnTable/CardsOnTable";
import { GemsPicker, GemsPickerMode } from "./GemsPicker/GemsPicker";
import { BuildDialogProps } from "../SplendorBoard";
import { Ctx } from "boardgame.io";
import { FC, useState } from "react";

interface PlayingTableProps {
  G: GameState;
  ctx: Ctx;
  moves: Record<string, (...args: any[]) => void>;
}

export const PlayingTable: FC<PlayingTableProps> = ({ G, ctx, moves }) => {
  const { nobles, cardsOnTable, cardsInDeck, gems, players } = G;
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [buildDialogProps, setBuildDialogProps] = useState<
    BuildDialogProps | undefined
  >(undefined);

  const resetDialog = () => {
    setDialogOpen(false);
    setBuildDialogProps(undefined);
  };

  // TODO: fix the issue where playerID is always undefined
  const currentPlayerActive = ctx.playerID === ctx.currentPlayer;

  return (
    <>
      <div
        className={
          "rounded-t-xl overflow-hidden bg-green-100 p-1 sm:p-4 shadow-xl"
        }
      >
        <div className={"flex justify-center h-auto sm:h-32"}>
          {nobles.map((noble, index) => (
            <NobleDisplay noble={noble} key={index} />
          ))}
        </div>
      </div>

      <DiscardGemsDialog
        open={
          ctx.activePlayers?.[Number(ctx.currentPlayer)] === "DiscardGems" &&
          currentPlayerActive
        }
        playerGems={players[Number(ctx.currentPlayer)].gems}
        discardGems={moves.discardGems}
      />

      <dialog
        className={
          "rounded-xl overflow-hidden bg-gray-300 p-4 mx-auto shadow-lg"
        }
        open={ctx.activePlayers?.[Number(ctx.currentPlayer)] === "PickNoble"}
      >
        Pick Noble
        <div className={"flex justify-center"}>
          {getVisitingNobleIndexArray(
            players[Number(ctx.currentPlayer)],
            nobles
          ).map((nobleIndex) => {
            return (
              <NobleDisplay
                noble={nobles[nobleIndex]}
                onClick={() => moves.pickNoble(nobleIndex)}
              />
            );
          })}
        </div>
      </dialog>

      <div className={"overflow-hidden bg-green-200 p-4 mx-auto shadow-xl"}>
        <CardDialog
          open={dialogOpen}
          closeDialog={resetDialog}
          buildDialogProps={buildDialogProps}
          player={players[Number(ctx.currentPlayer)]}
          build={moves.build}
          reserve={moves.reserve}
        />
        <CardsOnTable
          cards={cardsOnTable}
          player={players[Number(ctx.currentPlayer)]}
          cardsInDeck={cardsInDeck}
          onClick={(buildDialogProps) => {
            setDialogOpen(true);
            setBuildDialogProps(buildDialogProps);
          }}
          hideAffordableHint={currentPlayerActive}
        />
      </div>

      <div className={"rounded-b-xl overflow-hidden bg-gray-300 p-4 shadow-lg"}>
        <div className={"w-max mx-auto"}>
          <GemsPicker
            gems={gems}
            onSelect={moves.pick}
            mode={GemsPickerMode.PICK}
          />
        </div>
      </div>
    </>
  );
};
