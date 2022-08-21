import { Player } from "../../Interfaces";
import { PlayerGems } from "./PlayerGems/PlayerGems";
import { PlayerCards } from "./PlayerCards/PlayerCards";
import { FC } from "react";
import clsx from "clsx";

interface PlayerBoardsProps {
  players: Player[];
  currentPlayer: string;

  buildFromReserve(cardIdx: number): void;
}

export const PlayerBoards: FC<PlayerBoardsProps> = ({
  players,
  currentPlayer,
  buildFromReserve,
}) => {
  return (
    <div
      className={"rounded-xl bg-slate-100 p-8 mx-auto mb-8 shadow-xl h-full"}
    >
      <div className={"flex flex-col h-full"}>
        {players.map((player, index: number) => (
          <div
            key={index}
            className={clsx(
              "flex items-center bg-slate-200 my-4 rounded-xl relative p-2 pt-8",
              { "bg-slate-400": Number(currentPlayer) === index }
            )}
          >
            <div
              className={
                "absolute leading-8 -top-5 -left-4 text-center w-20 h-8 rounded-lg bg-blue-300"
              }
            >
              <span className={"text-slate-700"}>Player {index + 1}</span>
            </div>
            <div className={"w-2"} />
            <div className={"text-center"}>
              <PlayerGems gems={player.gems} />
              <div className={"h-2"} />
              <PlayerCards
                isActivePlayer={Number(currentPlayer) === index}
                player={player}
                cards={player.cards}
                reservedCards={player.reservedCards}
                buildFromReserve={buildFromReserve}
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
