import { Card } from "src/interfaces/Interfaces";
import * as React from "react";
import { GemDisplay } from "src/components/Shared/GemDisplay/GemDisplay";
import { Button, Box } from "@mui/material";
import { colorIndexToPalette } from "src/styles/paletteTheme";
import { gameStyles } from "src/styles/gameStyles";

interface CardDisplayProps {
  affordable?: boolean;
  card: Card | undefined;
  enabled: boolean;
  onClick?(): void;
}

export const CardDisplay: React.FC<CardDisplayProps> = ({
  card,
  enabled,
  onClick,
  affordable = false,
}) => {
  if (card == null) {
    return <Button sx={gameStyles.cardSize} />;
  }

  return (
    <Button
      sx={{
        ...gameStyles.cardSize,
        borderRadius: 2,
        position: 'relative',
        boxShadow: 24,
        ...(affordable && gameStyles.cardAffordable),
      }}
      color={colorIndexToPalette[card.color]}
      onClick={() => {
        if (enabled) {
          onClick?.();
        }
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: { xs: 0, sm: '8px' },
          right: { xs: 0, sm: '8px' },
          height: '32px',
          width: '32px',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {card.points > 0 && card.points}
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          p: { xs: 1.5, sm: 2 },
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          height: { xs: '96px', sm: '128px' },
          justifyContent: 'flex-end',
          flexWrap: 'wrap',
        }}
      >
        {card.cost.map((gemCount, index) => {
          if (gemCount === 0) {
            return null;
          }

          return (
            <GemDisplay
              sx={{
                ...gameStyles.gemSizeSmall,
                boxShadow: 1,
                ...(card?.color === index && {
                  border: '1px solid',
                  borderColor: 'grey.300',
                }),
              }}
              color={index}
              count={gemCount}
              key={index}
            />
          );
        })}
      </Box>
    </Button>
  );
};
