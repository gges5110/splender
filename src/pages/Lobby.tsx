import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../components/Shared/Button";
import { LobbyClient } from "boardgame.io/client";
import { useQuery } from "@tanstack/react-query";
import { useJoinMatch } from "../hooks/UseJoinMatch";

export const lobbyClient = new LobbyClient({ server: "http://localhost:8000" });

export const Lobby = () => {
  const navigate = useNavigate();

  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["matches"],
    queryFn: () => lobbyClient.listMatches("splendor"),
  });

  const joinMatch = useJoinMatch();
  return (
    <div>
      Welcome to the lobby!
      <div>
        Matches:{" "}
        {data?.matches.map((match) => {
          return (
            <>
              <div>Match ID: {match.matchID}</div>
              <div>Players: {JSON.stringify(match.players)}</div>
              <div>gameover?: {match.gameover}</div>
              <Button
                onClick={() => {
                  joinMatch.mutate({
                    matchID: match.matchID,
                    playerName: "2",
                  });
                }}
              >
                Join
              </Button>
            </>
          );
        })}
      </div>
      <Button
        onClick={() => {
          navigate("/createMatch");
        }}
      >
        Create Match
      </Button>
      <NavLink to={"/game"}>
        <Button>Single Player Game</Button>
      </NavLink>
    </div>
  );
};
