import { useJoinMatch } from "../hooks/UseJoinMatch";
import { useMutation } from "@tanstack/react-query";
import { lobbyClient } from "./Lobby";
import { useState } from "react";
import { Button } from "../components/Shared/Button";
import { queryClient } from "../App";

export const CreateMatchPage = () => {
  const joinMatch = useJoinMatch();

  const createMatch = useMutation({
    mutationFn: ({ numPlayers }: { numPlayers: number }) =>
      lobbyClient.createMatch("splendor", { numPlayers }),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["matches"] });

      if (data.matchID) {
        joinMatch.mutate({ matchID: data.matchID, playerName: "123" });
      }
    },
  });

  const [numberOfPlayers, setNumberOfPlayers] = useState(2);
  console.log(numberOfPlayers);
  return (
    <>
      Number of players:
      <div className={"flex items-center mb-4"}>
        <input
          checked={numberOfPlayers === 2}
          id={"default-radio-1"}
          onChange={(event) => {
            setNumberOfPlayers(Number(event.target.value));
          }}
          type={"radio"}
          value={"2"}
        />
        <label htmlFor={"default-radio-1"}>2</label>
      </div>
      <div className={"flex items-center"}>
        <input
          checked={numberOfPlayers === 3}
          id={"default-radio-2"}
          onChange={(event) => {
            setNumberOfPlayers(Number(event.target.value));
          }}
          type={"radio"}
          value={"3"}
        />
        <label htmlFor={"default-radio-2"}>3</label>
      </div>
      <div className={"flex items-center"}>
        <input
          checked={numberOfPlayers === 4}
          id={"default-radio-3"}
          onChange={(event) => {
            setNumberOfPlayers(Number(event.target.value));
          }}
          type={"radio"}
          value={"4"}
        />
        <label htmlFor={"default-radio-3"}>4</label>
      </div>
      <Button
        onClick={() => {
          createMatch.mutate({
            numPlayers: numberOfPlayers,
          });
        }}
      >
        Create Match
      </Button>
    </>
  );
};
