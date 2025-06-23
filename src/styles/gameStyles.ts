import { SxProps, Theme } from '@mui/material/styles';

// Game-specific style utilities to replace Tailwind custom utilities
export const gameStyles = {
  cardSize: {
    width: '100%',
    maxWidth: { xs: '6rem', sm: 'none' },
    aspectRatio: '3/4',
    sm: {
      width: '96px',
      height: '128px',
    },
  } as SxProps<Theme>,

  playerCardSize: {
    width: { xs: '32px', sm: '48px' },
    height: { xs: '48px', sm: '80px' },
  } as SxProps<Theme>,

  gemSize: {
    width: '48px',
    height: '48px',
    aspectRatio: '1/1',
  } as SxProps<Theme>,

  gemSizeMedium: {
    minWidth: { xs: '32px', sm: '48px' },
    width: { xs: '32px', sm: '48px' },
    height: { xs: '32px', sm: '48px' },
  } as SxProps<Theme>,

  gemSizeSmall: {
    width: { xs: '24px', sm: '32px' },
    height: { xs: '24px', sm: '32px' },
  } as SxProps<Theme>,

  nobleSize: {
    width: '100%',
    maxWidth: { xs: '6rem', sm: 'none' },
    aspectRatio: '1/1',
    sm: {
      height: '112px',
      width: '112px',
    },
  } as SxProps<Theme>,

  sectionsContainer: {
    borderRadius: '12px',
    p: { xs: 2, sm: 8 },
    mx: 'auto',
    boxShadow: { sm: 24 },
    height: '100%',
  } as SxProps<Theme>,

  playingTableSubsectionsContainer: {
    p: { xs: 1, sm: 4 },
  } as SxProps<Theme>,

  cardAffordable: {
    outline: '4px solid',
    outlineColor: 'grey.400',
    outlineOffset: '2px',
  } as SxProps<Theme>,
};