import { Player } from "src/shared/types";
import { PlayerGems } from "./PlayerGems/PlayerGems";
import { PlayerCards } from "./PlayerCards/PlayerCards";
import { FC, useState } from "react";
import { PlayerDialog } from "./PlayerCards/PlayerDialog/PlayerDialog";
import { LobbyAPI } from "boardgame.io/src/types";
import { Box, Button, Paper } from "@mui/material";
import { blueGrey, grey, orange } from "@mui/material/colors";

interface PlayerBoardsProps {
  buildFromReserve(cardIdx: number): void;
  currentPlayer: string;
  gameEnded: boolean;
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
  gameEnded,
}) => {
  const [playerDialogIndex, setPlayerDialogIndex] = useState<
    number | undefined
  >(undefined);
  return (
    <Box
      display={"flex"}
      flexDirection={{ xs: "row", sm: "column" }}
      flexWrap={"nowrap"}
      gap={4}
      pb={{ xs: 2, sm: 4 }}
      pl={{ xs: 2, sm: 4 }}
      pt={4}
      sx={{ overflowY: "hidden" }}
    >
      {players.map((player, index: number) => {
        const playerName =
          match?.players[index].name || `Bot ${match?.players[index].id}`;
        return (
          <Box
            bgcolor={(theme) => {
              if (Number(currentPlayer) === index && !gameEnded) {
                return theme.palette.mode === "dark"
                  ? blueGrey[700]
                  : grey[500];
              }
              return theme.palette.mode === "dark" ? blueGrey[300] : grey[300];
            }}
            borderRadius={"12px"}
            display={"flex"}
            justifyItems={"center"}
            key={index}
            p={2}
            pl={{ xs: 0, sm: 2 }}
            position={"relative"}
            pt={4}
            sx={{ boxShadow: 3 }}
          >
            <Button
              onClick={() => setPlayerDialogIndex(index)}
              sx={{
                position: "absolute",
                lineHeight: 2,
                top: -20,
                left: -16,
                width: "fit-content",
                height: 32,
                borderRadius: 2,
                bgcolor: "#93c5fd",
                px: 1.5,
              }}
            >
              <span style={{ color: "#334155" }}>
                {playerName}
                {match?.players[index].id === Number(playerID) && <> (you)</>}
              </span>
            </Button>
            <PlayerDialog
              closePlayerDialog={() => {
                setPlayerDialogIndex(undefined);
              }}
              player={players[index]}
              playerDialogOpen={playerDialogIndex === index}
              playerName={playerName}
            />
            <Box width={"0.5rem"} />
            <Box textAlign={"center"}>
              <PlayerGems gems={player.gems} />
              <Box height={"0.5rem"} />
              <PlayerCards
                buildFromReserve={buildFromReserve}
                cards={player.cards}
                isActivePlayer={Number(currentPlayer) === index}
                onCardClick={() => setPlayerDialogIndex(index)}
                player={player}
                reservedCards={player.reservedCards}
              />
            </Box>
            <Box width={{ sm: "2rem" }} />
            <Box
              color={orange[500]}
              fontWeight={600}
              height={32}
              lineHeight={"32px"}
              position={"absolute"}
              right={8}
              top={4}
            >
              {getPlayerPoints(player)} points
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

const getPlayerPoints = (player: Player): number => {
  return (
    (player.cards.length > 0 &&
      player.cards.map((card) => card.points).reduce((p, c) => p + c, 0) +
        player.nobles.length * 3) ||
    0
  );
};
