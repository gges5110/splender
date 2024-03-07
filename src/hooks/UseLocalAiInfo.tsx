export const useLocalAiInfo = () => {
  const localStorageLocalAiInfo = localStorage.getItem("localAiInfo");

  if (!localStorageLocalAiInfo) {
    return {
      seed: undefined,
      position: undefined,
    };
  }

  const parsedLocalAiInfo = JSON.parse(localStorageLocalAiInfo);

  const seed: string | undefined = parsedLocalAiInfo.seed || undefined;
  const position: number | undefined = parsedLocalAiInfo.position || undefined;

  return {
    seed,
    position,
  };
};

export const useSetLocalAiInfo = () => {
  return (localAiInfo: LocalAiInfo | undefined) => {
    if (!localAiInfo) {
      return;
    }
    localStorage.setItem("localAiInfo", JSON.stringify(localAiInfo));
  };
};

export const useIncrementSeed = () => {
  return () => {
    const localAiInfo = useLocalAiInfo();
    const newSeed = String(Number(localAiInfo.seed || "1") + 1);
    useSetLocalAiInfo()({ ...localAiInfo, seed: newSeed });
  };
};

export interface LocalAiInfo {
  position: number | undefined;
  seed: string | undefined;
}

export const resetLocalGame = () => {
  localStorage.removeItem("bgio_metadata");
  localStorage.removeItem("bgio_state");
  localStorage.removeItem("bgio_initial");
  localStorage.removeItem("bgio_log");
};
