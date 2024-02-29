import { useJoinMatch } from "./UseJoinMatch";
import { useAtomValue, useSetAtom } from "jotai";
import { matchInfoAtom, MatchType, playerNameAtom } from "../Atoms";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { lobbyClient } from "../pages/Lobby";
import { queryClient } from "../App";
import { useState } from "react";
import { GAME_NAME } from "../config";

interface CreateMatchArgs {
  matchType: MatchType;
  numPlayers: number;
}
export const useCreateMatch = () => {
  const joinMatch = useJoinMatch();
  const playerName = useAtomValue(playerNameAtom) || "";
  const navigate = useNavigate();
  const [matchType, setMatchType] = useState<MatchType | undefined>(undefined);

  const setMatchInfo = useSetAtom(matchInfoAtom);
  const createMatchMutation = useMutation({
    mutationFn: ({ numPlayers, matchType }: CreateMatchArgs) => {
      setMatchType(matchType);
      return lobbyClient.createMatch(GAME_NAME, {
        numPlayers,
        unlisted: matchType !== "online" ? true : undefined,
      });
    },
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["matches"] }).then((r) => {
        if (data.matchID !== undefined) {
          setTimeout(() => {
            const matchID = data.matchID;
            joinMatch.mutate(
              { matchID, playerName },
              {
                onSuccess: (data) => {
                  if (matchType) {
                    setMatchInfo({
                      matchID: matchID,
                      matchType: matchType,
                      playerCredentials: data.playerCredentials,
                      playerID: data.playerID,
                    });
                  }

                  navigate(`/room/${matchID}`);
                },
              }
            );
          }, 200);
        }
      });
    },
  });

  const resetLocalAI = () => {
    localStorage.removeItem("bgio_metadata");
    localStorage.removeItem("bgio_state");
    localStorage.removeItem("bgio_initial");
  };
  return (createMatchArgs: CreateMatchArgs) => {
    if (createMatchArgs.matchType === "localAI") {
      resetLocalAI();
      navigate(`/room/localAI?numPlayers=${createMatchArgs.numPlayers}`);
    } else {
      createMatchMutation.mutate(createMatchArgs);
    }
  };
};
