import { FC } from "react";
import { historyAtom, userAtom } from "src/Atoms";
import { Box, Button, Paper } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useAtom } from "jotai/index";
import {
  loadGameHistoryFromCloud,
  sendGameHistoryWithCloud,
} from "src/repository/GameHistory";
import { useSnackbar } from "notistack";

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
    width: 180,
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
  {
    field: "id",
    headerName: "ID",
    type: "string",
    width: 200,
  },
];

const HistoryTable = () => {
  const [history, setHistory] = useAtom(historyAtom);
  const [user] = useAtom(userAtom);
  const { enqueueSnackbar } = useSnackbar();
  return (
    <Box display={"flex"} flexDirection={"column"} gap={4}>
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
      {user !== undefined && (
        <Box display={"flex"} gap={1} p={1}>
          <Button
            onClick={() => {
              sendGameHistoryWithCloud(user).then(() => {
                enqueueSnackbar("Synced to Cloud", { variant: "success" });
              });
            }}
          >
            Sync to Cloud
          </Button>
          <Button
            onClick={() => {
              loadGameHistoryFromCloud(user).then((history) => {
                if (!history) {
                  return;
                }
                setHistory((prev) => {
                  const mergedHistory = [...prev];
                  history.forEach((h) => {
                    if (prev.find((p) => p.id === h.id) === undefined) {
                      mergedHistory.push(h);
                    }
                  });
                  return mergedHistory;
                });
                enqueueSnackbar("Loaded from Cloud", {
                  variant: "success",
                });
              });
            }}
          >
            Load from Cloud
          </Button>
        </Box>
      )}
    </Box>
  );
};
