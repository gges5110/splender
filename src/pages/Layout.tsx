import * as React from "react";
import { TitleBar } from "src/components/TitleBar/TitleBar";
import { Outlet } from "react-router-dom";
import { UsernameDialog } from "src/components/Shared/Dialogs/UsernameDialog/UsernameDialog";
import { Box, Paper, useTheme } from "@mui/material";
import { blueGrey } from "@mui/material/colors";

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = () => {
  // if the user is not in a room, then automatically leave the match for them

  const theme = useTheme();
  return (
    <Paper
      className={"mx-auto sm:my-auto py-4 sm:p-8"}
      sx={{
        minHeight: "100vh",
        backgroundColor:
          theme.palette.mode === "light"
            ? blueGrey[50]
            : "palette.background.paper",
      }}
    >
      <TitleBar />
      <Box mt={8}>
        <Outlet />
      </Box>
      <UsernameDialog />
    </Paper>
  );
};
