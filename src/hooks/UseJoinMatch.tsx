import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { lobbyClient } from "src/pages/Lobby";
import { matchInfoAtom } from "src/Atoms";
import { GAME_NAME } from "src/config";

export interface JoinMatchArgs {
  matchID: string;
  playerName: string;
}

export const useJoinMatch = () => {
  const navigate = useNavigate();
  const setMatchInfo = useSetAtom(matchInfoAtom);
  const [selectedMatchID, setSelectedMatchID] = useState<string | undefined>(
    undefined
  );

  return useMutation({
    mutationFn: ({ matchID, playerName }: JoinMatchArgs) => {
      setSelectedMatchID(matchID);
      return lobbyClient.joinMatch(GAME_NAME, matchID, {
        playerName,
      });
    },
    onSuccess: (data) => {
      if (selectedMatchID) {
        setMatchInfo({
          matchID: selectedMatchID,
          matchType: "online",
          playerCredentials: data.playerCredentials,
          playerID: data.playerID,
        });
        navigate(`/room/${selectedMatchID}`);
      }
    },
  });
};
