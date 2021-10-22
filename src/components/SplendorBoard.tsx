import React, { useState } from "react";
import type { Card, GameState } from "../Interfaces";
import { PlayerCards } from "./PlayerCards";
import { GemsPicker, GemsPickerMode } from "./GemsPicker";
import { NobleDisplay } from "./NobleDisplay";
import { PlayerGems } from "./PlayerGems";
import { CardsOnTable } from "./CardsOnTable";
import { CardDialog } from "./CardDialog";
import { getVisitingNobleIndexArray } from "../Moves";
import { GameEndDialog } from "./GameEndDialog";
import { DiscardGemsDialog } from "./DiscardGemsDialog";
import type { BoardProps } from "boardgame.io/dist/types/packages/react";

export const SplendorBoard: React.FC<BoardProps<GameState>> = ({
  ctx,
  G,
  moves,
}) => {
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
    <div className={"flex h-screen"}>
      <div className="container mx-auto my-auto shadow-lg rounded-xl sm:bg-gray-100 p-2 sm:p-8 w-screen sm:w-auto">
        <GameEndDialog winner={ctx.gameover?.winner} />

        <div className="flex flex-wrap justify-center">
          <div className={"w-max p-1 sm:p-4 sm:m-2"}>
            <div
              className={
                "rounded-t-xl overflow-hidden bg-green-100 p-1 sm:p-4 shadow-xl"
              }
            >
              <div className={"flex justify-center h-auto sm:h-32"}>
                {G.nobles.map((noble, index) => (
                  <NobleDisplay noble={noble} key={index} />
                ))}
              </div>
            </div>

            <DiscardGemsDialog
              open={
                ctx.activePlayers?.[Number(ctx.currentPlayer)] ===
                  "DiscardGems" && currentPlayerActive
              }
              playerGems={G.players[Number(ctx.currentPlayer)].gems}
              discardGems={moves.discardGems}
            />

            <dialog
              className={
                "rounded-xl overflow-hidden bg-gray-300 p-4 mx-auto shadow-lg"
              }
              open={
                ctx.activePlayers?.[Number(ctx.currentPlayer)] === "PickNoble"
              }
            >
              Pick Noble
              <div className={"flex justify-center"}>
                {getVisitingNobleIndexArray(
                  G.players[Number(ctx.currentPlayer)],
                  G.nobles
                ).map((nobleIndex) => {
                  return (
                    <NobleDisplay
                      noble={G.nobles[nobleIndex]}
                      onClick={() => moves.pickNoble(nobleIndex)}
                    />
                  );
                })}
              </div>
            </dialog>

            <div
              className={"overflow-hidden bg-green-200 p-4 mx-auto shadow-xl"}
            >
              <CardDialog
                open={dialogOpen}
                closeDialog={resetDialog}
                buildDialogProps={buildDialogProps}
                player={G.players[Number(ctx.currentPlayer)]}
                build={moves.build}
                reserve={moves.reserve}
              />
              <CardsOnTable
                cards={G.cardsOnTable}
                player={G.players[Number(ctx.currentPlayer)]}
                cardsInDeck={G.cardsInDeck}
                onClick={(buildDialogProps) => {
                  setDialogOpen(true);
                  setBuildDialogProps(buildDialogProps);
                }}
                hideAffordableHint={currentPlayerActive}
              />
            </div>

            <div
              className={
                "rounded-b-xl overflow-hidden bg-gray-300 p-4 shadow-lg"
              }
            >
              <div className={"w-max mx-auto"}>
                <GemsPicker
                  gems={G.gems}
                  onSelect={moves.pick}
                  mode={GemsPickerMode.PICK}
                />
              </div>
            </div>
          </div>

          <div className={"flex-initial p-4 m-2"}>
            <div
              className={
                "rounded-xl bg-red-100 p-4 px-6 mx-auto mb-8 shadow-xl"
              }
            >
              <div className={"mx-auto"}>
                {G.players.map((player, index: number) => (
                  <div
                    key={index}
                    className={
                      Number(ctx.currentPlayer) === index
                        ? "flex items-center bg-red-200 my-4 rounded-xl relative p-2 ring-2 ring-gray-400"
                        : "flex items-center bg-red-200 my-4 rounded-xl relative p-2 "
                    }
                  >
                    <div
                      className={
                        "absolute leading-8 -top-2 -left-4 text-center w-8 h-8 rounded-lg bg-blue-300"
                      }
                    >
                      {index + 1}
                    </div>
                    <div className={"w-2"} />
                    <div className={"text-center"}>
                      <PlayerGems gems={player.gems} />
                      <div className={"h-2"} />
                      <PlayerCards
                        isActivePlayer={Number(ctx.currentPlayer) === index}
                        player={player}
                        cards={player.cards}
                        reservedCards={player.reservedCards}
                        buildFromReserve={moves.buildFromReserve}
                      />
                    </div>
                    <div className={"w-8"} />
                    <div
                      className={
                        "absolute leading-8 top-1 right-1 text-center w-8 h-8 rounded-xl font-semibold text-yellow-500"
                      }
                    >
                      {(player.cards.length > 0 &&
                        player.cards
                          .map((card) => card.points)
                          .reduce((p, c) => p + c, 0) +
                          player.nobles
                            .map((noble) => noble.points)
                            .reduce((p, c) => p + c, 0)) ||
                        0}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export interface BuildDialogProps {
  level: number;
  index: number;
  card: Card;
}

export const gemsColorStyle: string[] = [
  "white",
  "#2196f3",
  "#4caf50",
  "#dc004e",
  "black",
  "gold",
];
export const gemsTextColorStyle: string[] = [
  "black",
  "white",
  "white",
  "white",
  "white",
  "black",
];
