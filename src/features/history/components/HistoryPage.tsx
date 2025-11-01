import { FC } from "react";
import { Paper } from "@mui/material";
import { HistoryTable } from "./HistoryTable";

interface HistoryProps {}
export const HistoryPage: FC<HistoryProps> = () => {
  return (
    <Paper sx={{ maxWidth: 1000, margin: "auto", px: 8, py: 2 }}>
      <HistoryTable />
    </Paper>
  );
};
