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
  Radio,
  RadioGroup,
} from "@mui/material";
import { MatchType } from "../../../Atoms";
import { useCreateMatch } from "../../../hooks/UseCreateMatch";

export const CreateMatchCard = () => {
  const createMatch = useCreateMatch();
  const [numberOfPlayers, setNumberOfPlayers] = useState(2);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOfPlayers(Number((event.target as HTMLInputElement).value));
  };

  const [matchType, setMatchType] = useState<MatchType>("localAI");
  const handleMatchTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMatchType((event.target as HTMLInputElement).value as MatchType);
  };

  return (
    <Card>
      <CardHeader title={"Match Configuration"} />
      <CardContent>
        <Box display={"flex"} flexDirection={"column"}>
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

          <FormControl>
            <FormLabel id={"set-number-of-players-radio-buttons-group"}>
              Match Type
            </FormLabel>
            <RadioGroup
              aria-labelledby={"set-number-of-players-radio-buttons-group"}
              name={"set-number-of-players-radio-buttons-group"}
              onChange={handleMatchTypeChange}
              row={true}
              value={matchType}
            >
              <FormControlLabel
                control={<Radio />}
                disabled={true}
                label={"Online"}
                value={"online"}
              />
              <FormControlLabel
                control={<Radio />}
                disabled={true}
                label={"Local"}
                value={"local"}
              />
              <FormControlLabel
                control={<Radio />}
                label={"Local AI"}
                value={"localAI"}
              />
            </RadioGroup>
          </FormControl>
        </Box>
      </CardContent>
      <CardActions>
        <Button
          color={"secondary"}
          onClick={() => {
            createMatch({
              numPlayers: numberOfPlayers,
              matchType,
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
