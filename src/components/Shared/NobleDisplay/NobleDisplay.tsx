import * as React from "react";
import { Noble } from "src/interfaces/Interfaces";
import { GemDisplay } from "src/components/Shared/GemDisplay/GemDisplay";
import clsx from "clsx";
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
      className={clsx("noble-size", "shadow-xl rounded-xl", {
        "cursor-pointer": onClick !== undefined,
      })}
      onClick={onClick}
      position={"relative"}
    >
      <Box
        className={
          "h-6 leading-6 sm:h-8 sm:leading-8 w-6 sm:w-8 text-center align-middle select-none"
        }
        position={"absolute"}
        right={0}
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
                  className={"gem-size-small"}
                  color={index}
                  count={gemCount}
                  key={index}
                />
              )
          )}
        </Box>
      </Box>
    </Box>
  );
};
