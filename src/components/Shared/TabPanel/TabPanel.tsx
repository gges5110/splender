import { FC, ReactNode } from "react";
import { Box, Paper, Typography } from "@mui/material";

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

export const TabPanel: FC<TabPanelProps> = ({
  children,
  value,
  index,
  ...other
}) => (
  <Paper
    hidden={value !== index}
    role={"tabpanel"}
    sx={{ borderRadius: 3 }}
    {...other}
  >
    {value === index && (
      <Box sx={{ p: 3 }}>
        <Typography>{children}</Typography>
      </Box>
    )}
  </Paper>
);
