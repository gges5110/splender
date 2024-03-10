import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useCreateMatch } from "src/hooks/UseCreateMatch";
import { useLocalAiInfo } from "src/hooks/UseLocalAiInfo";

type NumberOfPlayers = 2 | 3 | 4;
export const CreateMatchCard = () => {
  const createMatch = useCreateMatch();
  const [numberOfPlayers, setNumberOfPlayers] = useState<NumberOfPlayers>(3);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOfPlayers(
      Number((event.target as HTMLInputElement).value) as NumberOfPlayers
    );
  };

  const { seed: initialSeed, position: initialPosition } = useLocalAiInfo();

  const [seed, setGameSeed] = useState<string>(initialSeed ? initialSeed : "1");
  const handleGameSeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGameSeed((event.target as HTMLInputElement).value);
  };

  const [position, setPosition] = useState<string>(
    initialPosition && initialPosition <= numberOfPlayers
      ? String(initialPosition)
      : ""
  );
  const handlePositionChange = (event: SelectChangeEvent) => {
    setPosition(event.target.value);
  };

  return (
    <Card>
      <CardHeader title={"Match Configuration"} />
      <CardContent>
        <Box display={"flex"} flexDirection={"column"} gap={2}>
          <FormControl>
            <FormLabel id={"set-number-of-players-radio-buttons-group"}>
              Number of players
            </FormLabel>
            <RadioGroup
              aria-labelledby={"set-number-of-players-radio-buttons-group"}
              name={"set-number-of-players-radio-buttons-group"}
              onChange={handleChange}
              row={true}
              value={numberOfPlayers}
            >
              <FormControlLabel control={<Radio />} label={"2"} value={"2"} />
              <FormControlLabel control={<Radio />} label={"3"} value={"3"} />
              <FormControlLabel control={<Radio />} label={"4"} value={"4"} />
            </RadioGroup>
          </FormControl>
          <TextField
            id={"game-seed"}
            label={"Game Seed"}
            onChange={handleGameSeedChange}
            value={seed}
            variant={"outlined"}
          />
          <FormControl>
            <InputLabel id={"select-label"}>Position</InputLabel>
            <Select
              label={"Position"}
              labelId={"select-label"}
              onChange={handlePositionChange}
              value={position}
            >
              {Array.from({ length: numberOfPlayers }).map((_, index) => (
                <MenuItem key={index} value={index + 1}>
                  {index + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </CardContent>
      <CardActions>
        <Button
          color={"secondary"}
          onClick={() => {
            createMatch({
              numPlayers: numberOfPlayers,
              localAiInfo: {
                position:
                  position !== ""
                    ? Number(position)
                    : Math.floor(Math.random() * numberOfPlayers) + 1,
                seed,
              },
            });
          }}
          variant={"contained"}
        >
          Create Match
        </Button>
      </CardActions>
    </Card>
  );
};
