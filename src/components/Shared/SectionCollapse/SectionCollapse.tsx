import React, { FC, useState } from "react";
import { Collapse, ListItemButton, ListItemText } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

interface SectionCollapseProps {
  children?: React.ReactNode;
  title: string;
}

export const SectionCollapse: FC<SectionCollapseProps> = ({
  children,
  title,
}) => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <ListItemButton
        className={
          "rounded-lg bg-blue-500/20 hover:bg-blue-500/30 focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75"
        }
        onClick={() => {
          setOpen((prevState) => !prevState);
        }}
      >
        <ListItemText primary={title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open}>{children}</Collapse>
    </>
  );
};
