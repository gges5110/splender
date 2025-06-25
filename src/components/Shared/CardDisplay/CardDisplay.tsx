import { Card } from "src/interfaces/Interfaces";
import * as React from "react";
import { GemDisplay } from "src/components/Shared/GemDisplay/GemDisplay";
import { Button, Box } from "@mui/material";
import { colorIndexToPalette } from "src/styles/paletteTheme";

interface CardDisplayProps {
  card: Card | undefined;
  enabled: boolean;
  onClick?(): void;
}

export const CardDisplay: React.FC<CardDisplayProps> = ({
  card,
  enabled,
  onClick,
}) => {
  if (card == null) {
    return (
      <Button
        sx={{
          width: "100%",
          maxWidth: { xs: "6rem", sm: "none" },
          height: { sm: 128 },
          aspectRatio: "3/4",
        }}
      />
    );
  }

  return (
    <Button
      color={colorIndexToPalette[card.color]}
      onClick={() => {
        if (enabled) {
          onClick?.();
        }
      }}
      sx={{
        width: "100%",
        maxWidth: { xs: "6rem" },
        height: { sm: 128 },
        aspectRatio: "3/4",
        borderRadius: 2,
        position: "relative",
        boxShadow: 8,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: { xs: 0, sm: 2 },
          right: { xs: 0, sm: 2 },
          height: 32,
          width: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {card.points > 0 && card.points}
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          padding: { xs: 0.5, sm: 1 },
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
          height: { xs: 96, sm: 128 },
          justifyContent: "flex-end",
          flexWrap: "wrap",
        }}
      >
        {card.cost.map((gemCount, index) => {
          if (gemCount === 0) {
            return null;
          }

          return (
            <GemDisplay
              color={index}
              count={gemCount}
              key={index}
              showBorder={card?.color === index}
              size={"small"}
            />
          );
        })}
      </Box>
    </Button>
  );
};
