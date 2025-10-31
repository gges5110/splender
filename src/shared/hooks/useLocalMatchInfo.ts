import { LocalMatchInfo } from 'src/features/lobby/types';

export const useLocalMatchInfo = (): LocalMatchInfo | undefined => {
  const localStorageLocalMatchInfo = localStorage.getItem("localMatchInfo");

  if (!localStorageLocalMatchInfo) {
    return undefined;
  }

  const parsedLocalMatchInfo = JSON.parse(localStorageLocalMatchInfo);

  const seed: string = parsedLocalMatchInfo.seed;
  const position: number = parsedLocalMatchInfo.position;
  const matchID: string = parsedLocalMatchInfo.matchID;
  const numPlayers: number = parsedLocalMatchInfo.numPlayers;

  return {
    seed,
    position,
    matchID,
    numPlayers,
  };
};

export const useSetLocalMatchInfo = () => {
  return (localMatchInfo: LocalMatchInfo | undefined) => {
    if (!localMatchInfo) {
      return;
    }
    localStorage.setItem("localMatchInfo", JSON.stringify(localMatchInfo));
  };
};

export const useIncrementSeed = () => {
  return () => {
    const localMatchInfo = useLocalMatchInfo();
    if (!localMatchInfo) {
      return;
    }
    const newSeed = String(Number(localMatchInfo.seed || "1") + 1);
    useSetLocalMatchInfo()({ ...localMatchInfo, seed: newSeed });
  };
};
