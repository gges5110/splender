import * as React from "react";
import { TitleBar } from "src/components/TitleBar/TitleBar";
import { Outlet } from "react-router-dom";
import { UsernameDialog } from "src/components/Shared/Dialogs/UsernameDialog/UsernameDialog";
import { Box, Paper } from "@mui/material";
import { blueGrey } from "@mui/material/colors";

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = () => {
  // if the user is not in a room, then automatically leave the match for them

  return (
    <Paper
      sx={{
        mx: "auto",
        my: { xs: 0, sm: "auto" },
        py: 2,
        p: { xs: 0, sm: 4 },
        minHeight: "100vh",
        backgroundColor: (theme) =>
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
