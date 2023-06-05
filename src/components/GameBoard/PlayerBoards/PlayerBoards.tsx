import { Player } from "../../../Interfaces";
import { PlayerGems } from "./PlayerGems/PlayerGems";
import { PlayerCards } from "./PlayerCards/PlayerCards";
import { FC, useState } from "react";
import clsx from "clsx";
import { PlayerDialog } from "./PlayerCards/PlayerDialog/PlayerDialog";
import { LobbyAPI } from "boardgame.io/src/types";
import { Badge, Box, Button, Paper } from "@mui/material";

interface PlayerBoardsProps {
  buildFromReserve(cardIdx: number): void;
  currentPlayer: string;
  match: LobbyAPI.Match;
  playerID: string | null;
  players: Player[];
}

export const PlayerBoards: FC<PlayerBoardsProps> = ({
  players,
  currentPlayer,
  playerID,
  buildFromReserve,
  match,
}) => {
  const [playerDialogOpen, setPlayerDialogOpen] = useState(false);
  return (
    <Paper className={"sections-container"} elevation={6}>
      <Box
        className={
          "flex flex-row gap-6 flex-nowrap sm:flex-col h-full pt-2 pl-4"
        }
        sx={{ overflowY: "hidden" }}
      >
        {players.map((player, index: number) => (
          <div
            className={clsx(
              "flex items-center bg-slate-200 my-4 rounded-xl relative p-2 pt-8 shadow-md",
              { "bg-slate-400": Number(currentPlayer) === index }
            )}
            key={index}
          >
            <Button
              className={clsx(
                "absolute leading-8 -top-5 -left-4 w-fit h-8 rounded-lg bg-blue-300 px-3"
              )}
              onClick={() => setPlayerDialogOpen(true)}
            >
              <Badge
                color={"success"}
                invisible={!match.players[index]?.isConnected}
                variant={"dot"}
              >
                <span className={"text-slate-700"}>
                  {match?.players[index].name ||
                    `Bot ${match?.players[index].id}`}
                  {match?.players[index].id === Number(playerID) && <> (you)</>}
                </span>
              </Badge>
            </Button>
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
      </Box>
    </Paper>
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
