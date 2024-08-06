import { useParams } from "react-router-dom";
import { useAtomValue } from "jotai/index";
import { gameBoardDebugAtom, playerNameAtom } from "src/Atoms";
import { useLocalMatchInfo } from "src/hooks/UseLocalMatchInfo";
import {
  PublicPlayerMetadata,
  useCreateGameClient,
} from "src/components/Room/UseCreateGameClient";
import { LobbyAPI } from "boardgame.io/src/types";
import { Container } from "@mui/material";
import { GAME_NAME } from "src/config";

export const Room = () => {
  const { matchID } = useParams();

  const playerName = useAtomValue(playerNameAtom);
  const gameBoardDebug = useAtomValue(gameBoardDebugAtom);
  const localMatchInfo = useLocalMatchInfo();

  const userPosition = localMatchInfo?.position || 1;

  const getDefaultPlayers = (numPlayers: number): PublicPlayerMetadata[] => {
    const players = [];
    for (let i = 0; i < numPlayers; i++) {
      players.push({
        id: i,
        name: i === userPosition - 1 ? playerName : `Bot ${i}`,
      });
    }

    return players;
  };

  const resolvedMatchData: LobbyAPI.Match = {
    matchID: matchID || "",
    players: getDefaultPlayers(localMatchInfo?.numPlayers || 1), // TODO: store this in local storage
    gameName: GAME_NAME,
    createdAt: 0,
    updatedAt: 0,
  };

  const GameClient = useCreateGameClient(
    resolvedMatchData,
    gameBoardDebug,
    localMatchInfo?.seed || 0,
    userPosition
  );

  return (
    <Container
      maxWidth={"xl"}
      sx={{
        paddingLeft: { xs: 0, sm: 2 },
        paddingRight: { xs: 0, sm: 2 },
      }}
    >
      <GameClient
        credentials={undefined}
        debug={
          gameBoardDebug
            ? { collapseOnLoad: true, hideToggleButton: false }
            : false
        }
        match={resolvedMatchData}
        matchID={matchID}
        playerID={String(userPosition - 1)}
        seed={localMatchInfo?.seed || 0}
      />
    </Container>
  );
};
