import * as React from "react";
import { Noble } from "src/interfaces/Interfaces";
import { GemDisplay } from "src/components/Shared/GemDisplay/GemDisplay";
import { Box } from "@mui/material";
import { yellow } from "@mui/material/colors";

interface NobleDisplayProps {
  noble: Noble;

  onClick?(): void;
}

export const NobleDisplay: React.FC<NobleDisplayProps> = ({
  noble,
  onClick,
}) => {
  return (
    <Box
      bgcolor={(theme) =>
        theme.palette.mode === "dark" ? yellow[700] : yellow[400]
      }
      className={"noble-size"}
      onClick={onClick}
      position={"relative"}
      sx={{
        boxShadow: (theme) => theme.shadows[24],
        borderRadius: 3,
        cursor: onClick !== undefined ? "pointer" : "default",
      }}
    >
      <Box
        position={"absolute"}
        right={0}
        sx={{
          height: { xs: "1.5rem", sm: "2rem" },
          width: { xs: "1.5rem", sm: "2rem" },
          lineHeight: { xs: "1.5rem", sm: "2rem" },
          textAlign: "center",
          verticalAlign: "middle",
          userSelect: "none",
        }}
        top={0}
      >
        3
      </Box>
      <Box bottom={0} left={0} p={{ xs: 0.5, sm: 1 }} position={"absolute"}>
        <Box
          display={"flex"}
          flexWrap={"wrap-reverse"}
          gap={0.5}
          height={"100%"}
          width={"100%"}
        >
          {noble.cardCountByColors.map(
            (gemCount, index) =>
              gemCount > 0 && (
                <GemDisplay
                  color={index}
                  count={gemCount}
                  key={index}
                  size={"small"}
                />
              )
          )}
        </Box>
      </Box>
    </Box>
  );
};
