import { FC } from "react";
import { useAtom } from "jotai";
import { gameBoardDebugAtom } from "../../Atoms";
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

interface AppDrawerProps {
  onClose(): void;

  open: boolean;
}

export const AppDrawer: FC<AppDrawerProps> = ({ open, onClose }) => {
  const [gameBoardDebug, setGameBoardDebug] = useAtom(gameBoardDebugAtom);

  return (
    <Drawer
      PaperProps={{ sx: { borderRadius: "0 15px 15px 0" } }}
      onClose={onClose}
      open={open}
    >
      <Toolbar sx={{ px: 0, minWidth: 300 }}>
        <Box sx={{ flexGrow: 1 }}>
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
          <ListItemText primary={"Debug"} secondary={"Reload required"} />
          <Switch
            checked={gameBoardDebug}
            edge={"end"}
            onChange={(event, checked) => {
              setGameBoardDebug(checked);
            }}
          />
        </ListItem>
      </List>
    </Drawer>
  );
};
