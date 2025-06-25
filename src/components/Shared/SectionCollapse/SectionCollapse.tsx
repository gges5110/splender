import React, { FC, useState } from "react";
import { Collapse, ListItemButton, ListItemText } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";

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
        onClick={() => {
          setOpen((prevState) => !prevState);
        }}
        sx={{
          py: { xs: 0, sm: 1 },
          borderRadius: 2,
          bgcolor: "rgba(59, 130, 246, 0.2)",
          "&:hover": {
            bgcolor: "rgba(59, 130, 246, 0.3)",
          },
          "&:focus": {
            outline: "none",
          },
          "&:focus-visible": {
            outline: "3px solid rgba(100, 116, 139, 0.75)",
          },
        }}
      >
        <ListItemText primary={title} />
        <ExpandLess
          sx={{
            transform: open ? "rotate(0)" : "rotate(-180deg)",
            transition: (theme) =>
              theme.transitions.create(["transform"], {
                duration: theme.transitions.duration.short,
              }),
          }}
        />
      </ListItemButton>

      <Collapse in={open}>{children}</Collapse>
    </>
  );
};
