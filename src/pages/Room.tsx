import { useParams } from "react-router-dom";
import { useAtomValue } from "jotai";
import { playerIDAtom } from "../Atoms";
import { useQuery } from "@tanstack/react-query";
import { lobbyClient } from "./Lobby";
import { Button } from "../components/Shared/Button";
import { useLeaveMatch } from "../hooks/UseLeaveMatch";

export const Room = () => {
  const { matchID } = useParams();
  const playerID = useAtomValue(playerIDAtom);

  const { data } = useQuery({
    queryKey: ["match", matchID],
    queryFn: () => lobbyClient.getMatch("splendor", matchID || ""),
  });

  const leaveMatch = useLeaveMatch();

  return (
    <>
      <div>Room for {matchID}</div>
      <div>Player ID: {playerID}</div>
      <div>Players: {JSON.stringify(data?.players)}</div>
      <Button
        onClick={() => {
          if (matchID) {
            leaveMatch.mutate({ matchID });
          }
        }}
      >
        Leave
      </Button>
    </>
  );
};
