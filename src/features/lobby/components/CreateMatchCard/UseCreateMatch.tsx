import { useNavigate } from "react-router-dom";
import {
  resetLocalGame,
  useSetLocalMatchInfo,
} from "src/shared/hooks/useLocalMatchInfo";
import { nanoid } from "nanoid";

interface CreateMatchArgs {
  numPlayers: number;
  position: number;
  seed: string;
}
export const useCreateMatch = () => {
  const navigate = useNavigate();
  const setLocalMatchInfo = useSetLocalMatchInfo();

  return (createMatchArgs: CreateMatchArgs) => {
    resetLocalGame();
    const matchID = nanoid();

    setLocalMatchInfo({
      matchID,
      position: createMatchArgs.position,
      numPlayers: createMatchArgs.numPlayers,
      seed: createMatchArgs.seed,
    });
    navigate(`/room/${matchID}`);
  };
};
