import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useAtomValue } from "jotai";
import { gameBoardDebugAtom, matchInfoAtom, playerNameAtom } from "../Atoms";
import { useQuery } from "@tanstack/react-query";
import { lobbyClient } from "./Lobby";
import { useLeaveMatch } from "../hooks/UseLeaveMatch";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { LobbyClientError } from "boardgame.io/client";
import { queryClient } from "../App";
import { LobbyAPI } from "boardgame.io/src/types";
import { PublicPlayerMetadata, useGameClient } from "../hooks/UseGameClient";
import { MatchPlayerList } from "../components/Lobby/Matches/MatchPlayerList";
import { GameName } from "../engine/SplendorGame";

type RoomPhase = "waiting" | "playing";
export const Room = () => {
  const { matchID } = useParams();
  const isLocalAI = matchID === "localAI";
  const matchInfo = useAtomValue(matchInfoAtom);
  const playerID = isLocalAI ? "0" : matchInfo?.playerID;
  const playerCredentials = matchInfo?.playerCredentials;
  const matchType = matchInfo?.matchType;
  const playerName = useAtomValue(playerNameAtom);
  const gameBoardDebug = useAtomValue(gameBoardDebugAtom);

  const [matchError, setMatchError] = useState(false);
  const [roomPhase, setRoomPhase] = useState<RoomPhase>("waiting");

  const { data: matchData, error } = useQuery<LobbyAPI.Match>({
    queryKey: ["match", matchID],
    enabled: !isLocalAI,
    queryFn: () => lobbyClient.getMatch(GameName, matchID || ""),
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

  const getDefaultPlayers = (numPlayers: number): PublicPlayerMetadata[] => {
    const players = [];
    for (let i = 0; i < numPlayers; i++) {
      players.push({ id: i, name: i === 0 ? playerName : undefined });
    }

    return players;
  };

  const [searchParams] = useSearchParams();
  const resolvedMatchData: LobbyAPI.Match | undefined = isLocalAI
    ? {
        matchID: "localAI",
        players: getDefaultPlayers(Number(searchParams.get("numPlayers"))),
        gameName: "splender",
        createdAt: 0,
        updatedAt: 0,
      }
    : matchData;

  const GameClient = useGameClient(resolvedMatchData, gameBoardDebug);

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
            <Container maxWidth={"sm"}>
              <Card>
                <CardHeader
                  subheader={<div>Player: {playerName}</div>}
                  title={<span>Room ID: {matchID}</span>}
                ></CardHeader>
                <CardContent>
                  <MatchPlayerList players={resolvedMatchData?.players || []} />
                </CardContent>
                <CardActions>
                  <Button
                    disabled={
                      !resolvedMatchData?.players.every(
                        (player) => player.name
                      ) && matchType === "online"
                    }
                    onClick={() => {
                      setRoomPhase("playing");
                      queryClient.invalidateQueries({
                        queryKey: ["match", matchID],
                      });
                    }}
                  >
                    Start Match
                  </Button>
                  <Button
                    onClick={() => {
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
                    variant={"outlined"}
                  >
                    Leave
                  </Button>
                  {matchType === "online" && (
                    <Button
                      onClick={() => {
                        navigator.clipboard
                          .writeText(window.location.href)
                          .then(() => {
                            enqueueSnackbar("Match URL copied!");
                          });
                      }}
                    >
                      Share
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Container>
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
            />
          )}
        </>
      )}
    </Container>
  );
};
