import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { lobbyClient } from "../pages/Lobby";
import { playerCredentialsAtom, playerIDAtom } from "../Atoms";

export interface JoinMatchArgs {
  matchID: string;
  playerName: string;
}

export const useJoinMatch = () => {
  const navigate = useNavigate();
  const setPlayerID = useSetAtom(playerIDAtom);
  const setPlayerCredentials = useSetAtom(playerCredentialsAtom);
  const [selectedMatchID, setSelectedMatchID] = useState<string | undefined>(
    undefined
  );

  return useMutation({
    mutationFn: ({ matchID, playerName }: JoinMatchArgs) => {
      setSelectedMatchID(matchID);
      return lobbyClient.joinMatch("splendor", matchID, {
        playerName,
      });
    },
    onSuccess: (data) => {
      setPlayerID(data.playerID);
      setPlayerCredentials(data.playerCredentials);
      navigate(`/room/${selectedMatchID}`);
    },
  });
};
