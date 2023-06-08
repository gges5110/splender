import { useAtom } from "jotai";
import { matchInfoAtom } from "../Atoms";
import { useMutation } from "@tanstack/react-query";
import { lobbyClient } from "../pages/Lobby";
import { queryClient } from "../App";
import { GAME_NAME } from "../config";

interface LeaveMatchArgs {
  matchID: string;
}

export const useLeaveMatch = () => {
  const [matchInfo, setMatchInfo] = useAtom(matchInfoAtom);

  return useMutation({
    mutationFn: ({ matchID }: LeaveMatchArgs) =>
      lobbyClient.leaveMatch(GAME_NAME, matchID, {
        playerID: matchInfo?.playerID || "",
        credentials: matchInfo?.playerCredentials || "",
      }),
    onSuccess: () => {
      setMatchInfo(undefined);
      queryClient.invalidateQueries({ queryKey: ["matches"] });
    },
  });
};
