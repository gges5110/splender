import React, { useEffect, useState } from "react";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { useAtom } from "jotai";
import { colorModeAtom } from "../../../Atoms";
import { ColorTheme } from "../../../styles/paletteTheme";

const options = [
  { theme: ColorTheme.Light, icon: <LightModeOutlinedIcon /> },
  { theme: ColorTheme.Dark, icon: <DarkModeOutlinedIcon /> },
  { theme: ColorTheme.System, icon: <ComputerOutlinedIcon /> },
];

export const ColorThemeSelector = () => {
  const [colorMode, setColorMode] = useAtom(colorModeAtom);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(
    options.findIndex((option) => option.theme === colorMode)
  );

  useEffect(() => {
    if (colorMode !== undefined) {
      setSelectedIndex(
        options.findIndex((option) => option.theme === colorMode)
      );
    }
  }, [colorMode]);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setSelectedIndex(index);
    setAnchorEl(null);

    const colorTheme = options[index].theme;
    setColorMode(colorTheme);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton color={"inherit"} onClick={handleClick}>
        {options[selectedIndex].icon}
      </IconButton>

      <Menu anchorEl={anchorEl} onClose={handleClose} open={open}>
        {options.map((option, index) => (
          <MenuItem
            key={index}
            onClick={(event) => handleMenuItemClick(event, index)}
            selected={index === selectedIndex}
          >
            <Box display={"flex"} gap={1}>
              {option.icon} {option.theme}
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
