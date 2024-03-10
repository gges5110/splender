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

export interface LocalMatchInfo {
  matchID: string;
  numPlayers: number;
  position: number;
  seed: string;
}

export const resetLocalGame = () => {
  localStorage.removeItem("bgio_metadata");
  localStorage.removeItem("bgio_state");
  localStorage.removeItem("bgio_initial");
  localStorage.removeItem("bgio_log");
};
