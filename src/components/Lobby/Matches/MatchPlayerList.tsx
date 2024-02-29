import { LobbyAPI } from "boardgame.io";
import { FC } from "react";
import { Avatar, Box } from "@mui/material";
import { green } from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/Person";

interface MatchPlayerListProps {
  players: LobbyAPI.Match["players"];
}

export const MatchPlayerList: FC<MatchPlayerListProps> = ({ players }) => {
  return (
    <>
      <div>Players:</div>
      <Box display={"flex"} flexDirection={"column"} gap={1}>
        {players.map((player) => {
          return (
            <Box alignItems={"center"} display={"flex"} gap={1} key={player.id}>
              <Avatar
                sx={{
                  width: 30,
                  height: 30,
                  bgcolor: player.name ? green[500] : undefined,
                }}
              >
                <PersonIcon />
              </Avatar>

              {player.name || "Waiting"}
            </Box>
          );
        })}
      </Box>
    </>
  );
};
