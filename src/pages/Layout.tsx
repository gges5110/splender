import * as React from "react";
import { TitleBar } from "src/components/TitleBar/TitleBar";
import { Outlet } from "react-router-dom";
import { UserDialog } from "src/components/Shared/Dialogs/UserDialog/UserDialog";
import { Box } from "@mui/material";
import { getAuth } from "firebase/auth";
import { useSetAtom } from "jotai";
import { userAtom } from "src/Atoms";

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = () => {
  // if the user is not in a room, then automatically leave the match for them
  const setUser = useSetAtom(userAtom);
  const auth = getAuth();
  auth.onAuthStateChanged((user) => {
    if (user) {
      setUser({
        uid: user.uid,
        displayName: user.displayName || "",
      });
    } else {
      setUser(undefined);
    }
  });
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
      <UserDialog />
    </Box>
  );
};
