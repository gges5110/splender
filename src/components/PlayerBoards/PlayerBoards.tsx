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
    <>
      {players.map((player, index: number) => (
        <div
          key={index}
          className={clsx(
            "flex items-center bg-red-200 my-4 rounded-xl relative p-2",
            { "ring-2 ring-gray-400": Number(currentPlayer) === index }
          )}
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
    </>
  );
};
