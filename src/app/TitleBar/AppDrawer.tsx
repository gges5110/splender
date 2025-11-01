import { FC } from "react";
import { useAtom } from "jotai";
import { gameBoardDebugAtom, jotaiDebugAtom, userAtom } from "src/state/atoms";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { Link as RouterLink } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import HistoryIcon from "@mui/icons-material/History";
import GoogleIcon from "@mui/icons-material/Google";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { useSnackbar } from "notistack";

interface AppDrawerProps {
  onClose(): void;

  open: boolean;
}

export const AppDrawer: FC<AppDrawerProps> = ({ open, onClose }) => {
  const [gameBoardDebug, setGameBoardDebug] = useAtom(gameBoardDebugAtom);
  const provider = new GoogleAuthProvider();
  provider.addScope("profile");
  provider.addScope("email");
  const { enqueueSnackbar } = useSnackbar();
  const auth = getAuth();
  const [user] = useAtom(userAtom);
  // const { enabled: jotaiDevtoolsEnabled, setEnabled } = useJotaiDevtools();
  const [enabled, setEnabled] = useAtom(jotaiDebugAtom);

  return (
    <Drawer
      PaperProps={{ sx: { borderRadius: "0 15px 15px 0" } }}
      onClose={onClose}
      open={open}
    >
      <Toolbar sx={{ minWidth: 300 }}>
        <Box flexGrow={1}>
          <DiamondOutlinedIcon />
        </Box>

        <IconButton
          aria-label={"close"}
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </Toolbar>

      <List>
        <ListItem sx={{ py: 0 }}>
          <ListItemButton
            component={RouterLink}
            onClick={onClose}
            sx={{ borderRadius: 1, py: "6px" }}
            to={"/"}
          >
            <ListItemIcon sx={{ minWidth: 32 }}>
              <HomeOutlinedIcon />
            </ListItemIcon>
            <Typography>Home</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ py: 0 }}>
          <ListItemButton
            component={RouterLink}
            onClick={onClose}
            sx={{ borderRadius: 1, py: "6px" }}
            to={"/help"}
          >
            <ListItemIcon sx={{ minWidth: 32 }}>
              <InfoOutlinedIcon />
            </ListItemIcon>
            <Typography>Help</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ py: 0 }}>
          <ListItemButton
            component={RouterLink}
            onClick={onClose}
            sx={{ borderRadius: 1, py: "6px" }}
            to={"/history"}
          >
            <ListItemIcon sx={{ minWidth: 32 }}>
              <HistoryIcon />
            </ListItemIcon>
            <Typography>History</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ py: 0 }}>
          <ListItemButton
            component={RouterLink}
            onClick={onClose}
            sx={{ borderRadius: 1, py: "6px" }}
            to={"https://github.com/gges5110/splender"}
          >
            <ListItemIcon sx={{ minWidth: 32 }}>
              <GitHubIcon />
            </ListItemIcon>
            <Typography>GitHub</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ py: 0, px: 4 }}>
          <ListItemIcon sx={{ minWidth: 32 }}>
            <BuildOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={"Debug Panel"} />
          <Switch
            checked={gameBoardDebug}
            edge={"end"}
            onChange={(event, checked) => {
              setGameBoardDebug(checked);
            }}
          />
        </ListItem>
        <ListItem sx={{ py: 0, px: 4 }}>
          <ListItemIcon sx={{ minWidth: 32 }}>
            <BuildOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={"Jotai Devtools"} />
          <Switch
            checked={enabled}
            edge={"end"}
            onChange={(event, checked) => {
              setEnabled(checked);
            }}
          />
        </ListItem>
        <ListItem sx={{ py: 0 }}>
          <ListItemButton
            onClick={() => {
              if (user) {
                signOut(auth)
                  .then(() => {
                    enqueueSnackbar("Sign-out successful");
                  })
                  .catch((error) => {
                    enqueueSnackbar(`Sign in with Google failed. ${error}`, {
                      variant: "error",
                    });
                  });
                return;
              }
              signInWithPopup(auth, provider)
                .then(() => {
                  enqueueSnackbar("Sign in with Google success");
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  enqueueSnackbar(
                    `Sign in with Google failed. ${errorCode} ${errorMessage}`,
                    {
                      variant: "error",
                    }
                  );
                });
            }}
            sx={{ borderRadius: 1, py: "6px" }}
          >
            <ListItemIcon sx={{ minWidth: 32 }}>
              <GoogleIcon />
            </ListItemIcon>
            <Typography>{user ? "Sign Out" : "Sign In"}</Typography>
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};
