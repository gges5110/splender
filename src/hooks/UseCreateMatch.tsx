import { useNavigate } from "react-router-dom";
import { resetLocalGame, useSetLocalAiInfo } from "src/hooks/UseLocalAiInfo";

interface CreateMatchArgs {
  localAiInfo: {
    position: number;
    seed: string;
  };
  numPlayers: number;
}
export const useCreateMatch = () => {
  const navigate = useNavigate();
  const setLocalAiUserPosition = useSetLocalAiInfo();

  return (createMatchArgs: CreateMatchArgs) => {
    resetLocalGame();

    if (createMatchArgs.localAiInfo !== undefined) {
      setLocalAiUserPosition(createMatchArgs.localAiInfo);
    } else {
      setLocalAiUserPosition(undefined);
    }
    navigate(`/room/localAI?numPlayers=${createMatchArgs.numPlayers}`);
  };
};
