import * as React from "react";
import { TitleBar } from "src/components/TitleBar/TitleBar";
import { Outlet } from "react-router-dom";
import { UsernameDialog } from "src/components/Shared/Dialogs/UsernameDialog/UsernameDialog";
import { Box } from "@mui/material";

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = () => {
  // if the user is not in a room, then automatically leave the match for them

  return (
    <Box
      sx={{
        mx: "auto",
        my: { xs: 0, sm: "auto" },
        py: 2,
        px: { xs: 0, sm: 4 },
        minHeight: "100vh",
      }}
    >
      <TitleBar />
      <Box pb={2} pt={{ xs: 6, sm: 8 }}>
        <Outlet />
      </Box>
      <UsernameDialog />
    </Box>
  );
};
