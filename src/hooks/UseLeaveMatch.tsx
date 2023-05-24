import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { playerCredentialsAtom, playerIDAtom } from "../Atoms";
import { useMutation } from "@tanstack/react-query";
import { lobbyClient } from "../pages/Lobby";

interface LeaveMatchArgs {
  matchID: string;
}

export const useLeaveMatch = () => {
  const navigate = useNavigate();
  const [playerID, setPlayerID] = useAtom(playerIDAtom);
  const [playerCredentials, setPlayerCredentials] = useAtom(
    playerCredentialsAtom
  );

  return useMutation({
    mutationFn: ({ matchID }: LeaveMatchArgs) =>
      lobbyClient.leaveMatch("splendor", matchID, {
        playerID: playerID || "",
        credentials: playerCredentials || "",
      }),
    onSuccess: () => {
      setPlayerID(undefined);
      setPlayerCredentials(undefined);
      navigate("/");
    },
  });
};
