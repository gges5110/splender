import { FC } from "react";
import { useAtomValue } from "jotai";
import { historyAtom } from "src/Atoms";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

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
  return (
    <Paper>
      <HistoryTable />
    </Paper>
  );
};

const HistoryTable = () => {
  const history = useAtomValue(historyAtom);

  return (
    <TableContainer component={Paper}>
      <Table aria-label={"simple table"} sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align={"right"}>Number of Players</TableCell>
            <TableCell align={"right"}>Date</TableCell>
            <TableCell align={"right"}>Turns</TableCell>
            <TableCell align={"right"}>Winner</TableCell>
            <TableCell align={"right"}>Seed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component={"th"} scope={"row"}>
                {row.id}
              </TableCell>
              <TableCell align={"right"}>{row.numberOfPlayers}</TableCell>
              <TableCell align={"right"}>
                {new Date(row.date).toLocaleString()}
              </TableCell>
              <TableCell align={"right"}>{row.turns}</TableCell>
              <TableCell align={"right"}>{row.winner}</TableCell>
              <TableCell align={"right"}>{row.seed}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
