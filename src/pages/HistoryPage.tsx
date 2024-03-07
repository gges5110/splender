import { FC } from "react";
import { useAtomValue } from "jotai";
import { historyAtom } from "src/Atoms";
import { Paper } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

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

const columns: GridColDef[] = [
  {
    field: "seed",
    headerName: "Seed",
    type: "number",
  },
  {
    field: "date",
    headerName: "Date",
    type: "dateTime",
    width: 200,
    valueGetter: (params: GridValueGetterParams) => new Date(params.row.date),
  },
  {
    field: "numberOfPlayers",
    headerName: "Players",
    type: "number",
  },

  {
    field: "turns",
    headerName: "Turns",
    type: "number",
  },
  {
    field: "winner",
    headerName: "Winner",
    type: "number",
  },
];

const HistoryTable = () => {
  const history = useAtomValue(historyAtom);

  return (
    <DataGrid
      columns={columns}
      disableRowSelectionOnClick={true}
      getRowId={(row) => `${row.seed}-${row.date}`}
      initialState={{
        sorting: {
          sortModel: [
            {
              field: "date",
              sort: "desc",
            },
          ],
        },
      }}
      pageSizeOptions={[20, 30, 50]}
      rows={history}
    />
  );
};
