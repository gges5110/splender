import { FC, useEffect, useState } from "react";
import { ColorThemeSelector } from "./ColorThemeSelector/ColorThemeSelector";
import { Link as RouterLink } from "react-router-dom";
import { useAtom } from "jotai/index";
import { playerNameAtom, usernameDialogOpenAtom } from "../../Atoms";
import {
  AppBar,
  Button,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import animals from "../../utils/animals.json";
import { useSetAtom } from "jotai";
import MenuIcon from "@mui/icons-material/Menu";
import { AppDrawer } from "./AppDrawer";

export function generateName() {
  return "Anonymous " + animals[Math.floor(Math.random() * animals.length)];
}
interface TitleBarProps {}

export const TitleBar: FC<TitleBarProps> = () => {
  const setOpen = useSetAtom(usernameDialogOpenAtom);
  const [playerName, setPlayerName] = useAtom(playerNameAtom);
  useEffect(() => {
    if (localStorage.getItem("playerName") == null) {
      setPlayerName(generateName());
    }
  }, [playerName]);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <AppBar color={"inherit"}>
      <Toolbar>
        <AppDrawer
          onClose={() => {
            setIsDrawerOpen(false);
          }}
          open={isDrawerOpen}
        />
        <IconButton
          aria-label={"menu"}
          color={"inherit"}
          edge={"start"}
          onClick={() => {
            setIsDrawerOpen(true);
          }}
          size={"large"}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Link
          color={"inherit"}
          component={RouterLink}
          sx={{ display: "flex", gap: 1, alignItems: "center", flexGrow: 1 }}
          to={"/"}
          underline={"hover"}
        >
          <DiamondOutlinedIcon />
          <Typography variant={"h5"}>Splendor</Typography>
        </Link>

        <Button
          color={"inherit"}
          onClick={() => {
            setOpen(true);
          }}
          variant={"text"}
        >
          <PersonIcon />
          <Typography variant={"body2"} whiteSpace={"nowrap"}>
            {playerName}
          </Typography>
        </Button>

        <ColorThemeSelector />
      </Toolbar>
    </AppBar>
  );
};
