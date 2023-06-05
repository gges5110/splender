import { useAtom } from "jotai";
import { matchInfoAtom } from "../Atoms";
import { useMutation } from "@tanstack/react-query";
import { lobbyClient } from "../pages/Lobby";
import { queryClient } from "../App";

interface LeaveMatchArgs {
  matchID: string;
}

export const useLeaveMatch = () => {
  const [matchInfo, setMatchInfo] = useAtom(matchInfoAtom);

  return useMutation({
    mutationFn: ({ matchID }: LeaveMatchArgs) =>
      lobbyClient.leaveMatch("splendor", matchID, {
        playerID: matchInfo?.playerID || "",
        credentials: matchInfo?.playerCredentials || "",
      }),
    onSuccess: () => {
      setMatchInfo(undefined);
      queryClient.invalidateQueries({ queryKey: ["matches"] });
    },
  });
};
