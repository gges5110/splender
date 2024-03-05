import { FC } from "react";
import { useAtomValue } from "jotai";
import { historyAtom } from "src/Atoms";
import { Paper } from "@mui/material";

export interface GameHistory {
  date: string;
  id: string;
  numberOfPlayers: number;
  seed: string;
  turns: number;
  winner: string;
}

interface HistoryProps {}
export const HistoryPage: FC<HistoryProps> = () => {
  const history = useAtomValue(historyAtom);
  return (
    <Paper>
      HistoryPage
      {JSON.stringify(history)}
    </Paper>
  );
};
