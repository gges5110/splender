import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useAtomValue } from "jotai";
import { gameBoardDebugAtom, matchInfoAtom, playerNameAtom } from "../../Atoms";
import { useQuery } from "@tanstack/react-query";
import { lobbyClient } from "../Lobby";
import { useLeaveMatch } from "../../hooks/UseLeaveMatch";
import { Button, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { LobbyClientError } from "boardgame.io/client";
import { queryClient } from "../../App";
import { LobbyAPI } from "boardgame.io/src/types";
import { PublicPlayerMetadata, useGameClient } from "../../hooks/UseGameClient";
import { GAME_NAME } from "../../config";
import { RoomWaiting } from "./RoomWaiting";

type RoomPhase = "waiting" | "playing";
export const Room = () => {
  const { matchID } = useParams();
  const isLocalAI = matchID === "localAI";
  const matchInfo = useAtomValue(matchInfoAtom);

  const playerCredentials = matchInfo?.playerCredentials;
  const matchType = matchInfo?.matchType;
  const playerName = useAtomValue(playerNameAtom);
  const gameBoardDebug = useAtomValue(gameBoardDebugAtom);

  const [matchError, setMatchError] = useState(false);
  const [roomPhase, setRoomPhase] = useState<RoomPhase>("waiting");

  const { data: matchData, error } = useQuery<LobbyAPI.Match>({
    queryKey: ["match", matchID],
    enabled: !isLocalAI,
    queryFn: () => lobbyClient.getMatch(GAME_NAME, matchID || ""),
    retry: 0,
    refetchInterval: !matchError ? 3000 : false,
    refetchOnWindowFocus: !matchError,
    keepPreviousData: true,
  });

  useEffect(() => {
    if (error instanceof LobbyClientError && !matchError) {
      setMatchError(true);
      enqueueSnackbar("Match dismissed");
    }
  }, [error]);

  const leaveMatch = useLeaveMatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [searchParams] = useSearchParams();
  const defaultNumberOfPlayers = Number(searchParams.get("numPlayers"));
  const userPosition =
    Number(searchParams.get("position")) ||
    Math.floor(Math.random() * defaultNumberOfPlayers) + 1;
  const playerID = isLocalAI ? String(userPosition - 1) : matchInfo?.playerID;

  const getDefaultPlayers = (numPlayers: number): PublicPlayerMetadata[] => {
    const players = [];
    for (let i = 0; i < numPlayers; i++) {
      players.push({
        id: i,
        name: i === userPosition - 1 ? playerName : undefined,
      });
    }

    return players;
  };

  const resolvedMatchData: LobbyAPI.Match | undefined = isLocalAI
    ? {
        matchID: "localAI",
        players: getDefaultPlayers(Number(searchParams.get("numPlayers"))),
        gameName: "splender",
        createdAt: 0,
        updatedAt: 0,
      }
    : matchData;

  const gameSeed = searchParams.get("gameSeed") || undefined;

  const GameClient = useGameClient(
    resolvedMatchData,
    gameBoardDebug,
    gameSeed,
    userPosition
  );
  useEffect(() => {
    return () => {
      if (matchID && !isLocalAI) {
        leaveMatch.mutate(
          { matchID },
          {
            onSettled: () => {
              navigate("/");
            },
          }
        );
      }
    };
  }, [matchID]);

  useEffect(() => {
    if (isLocalAI) {
      setRoomPhase("playing");
    }
  }, [isLocalAI]);

  return (
    <Container maxWidth={"xl"}>
      {matchError ? (
        <>
          Match is no longer available
          <Button
            onClick={() => {
              navigate(-1);
            }}
          >
            Leave
          </Button>
        </>
      ) : (
        <>
          {roomPhase === "waiting" && (
            <RoomWaiting
              matchData={resolvedMatchData}
              matchID={matchID}
              matchType={matchType}
              onLeaveMatch={() => {
                if (matchID) {
                  leaveMatch.mutate(
                    { matchID },
                    {
                      onSettled: () => {
                        navigate("/");
                      },
                    }
                  );
                }
              }}
              onStartMatch={() => {
                setRoomPhase("playing");
                queryClient.invalidateQueries({
                  queryKey: ["match", matchID],
                });
              }}
              playerName={playerName}
            />
          )}

          {roomPhase === "playing" && resolvedMatchData && (
            <GameClient
              credentials={playerCredentials}
              debug={
                gameBoardDebug
                  ? { collapseOnLoad: true, hideToggleButton: false }
                  : false
              }
              match={resolvedMatchData}
              matchID={matchID}
              playerID={playerID}
              seed={gameSeed}
            />
          )}
        </>
      )}
    </Container>
  );
};
