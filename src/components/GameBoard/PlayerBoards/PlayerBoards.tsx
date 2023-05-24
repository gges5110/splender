import { Player } from "../../../Interfaces";
import { PlayerGems } from "./PlayerGems/PlayerGems";
import { PlayerCards } from "./PlayerCards/PlayerCards";
import { FC, useState } from "react";
import clsx from "clsx";
import { PlayerDialog } from "./PlayerCards/PlayerDialog/PlayerDialog";

interface PlayerBoardsProps {
  players: Player[];
  currentPlayer: string;
  playerID: string | null;
  buildFromReserve(cardIdx: number): void;
}

export const PlayerBoards: FC<PlayerBoardsProps> = ({
  players,
  currentPlayer,
  buildFromReserve,
}) => {
  const [playerDialogOpen, setPlayerDialogOpen] = useState<boolean>(false);

  return (
    <div className={"sections-container"}>
      <div
        className={
          "flex flex-row gap-6 flex-nowrap overflow-y-scroll sm:overflow-y-auto sm:flex-col h-full pt-2 pl-4"
        }
      >
        {players.map((player, index: number) => (
          <div
            className={clsx(
              "flex items-center bg-slate-200 my-4 rounded-xl relative p-2 pt-8",
              { "bg-slate-400": Number(currentPlayer) === index }
            )}
            key={index}
          >
            <button
              className={
                "absolute leading-8 -top-5 -left-4 w-fit h-8 rounded-lg bg-blue-300 px-3"
              }
              onClick={() => setPlayerDialogOpen(true)}
            >
              <span className={"text-slate-700"}>Player {index + 1}</span>
            </button>
            <PlayerDialog
              closePlayerDialog={() => {
                setPlayerDialogOpen(false);
              }}
              player={player}
              playerDialogOpen={playerDialogOpen}
            />
            <div className={"w-2"} />
            <div className={"text-center"}>
              <PlayerGems gems={player.gems} />
              <div className={"h-2"} />
              <PlayerCards
                buildFromReserve={buildFromReserve}
                cards={player.cards}
                isActivePlayer={Number(currentPlayer) === index}
                player={player}
                reservedCards={player.reservedCards}
              />
            </div>
            <div className={"w-8"} />
            <div
              className={
                "absolute leading-8 top-1 right-2 text-center w-18 h-8 rounded-xl font-semibold text-yellow-500"
              }
            >
              {getPlayerPoints(player)} points
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const getPlayerPoints = (player: Player): number => {
  return (
    (player.cards.length > 0 &&
      player.cards.map((card) => card.points).reduce((p, c) => p + c, 0) +
        player.nobles
          .map((noble) => noble.points)
          .reduce((p, c) => p + c, 0)) ||
    0
  );
};
