import { useAtom } from "jotai";
import { matchInfoAtom } from "src/Atoms";
import { useMutation } from "@tanstack/react-query";
import { lobbyClient } from "src/pages/Lobby";
import { queryClient } from "src/App";
import { GAME_NAME } from "src/config";

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
