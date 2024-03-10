import { Box, Card, CardContent, CardHeader } from "@mui/material";
import { LocalAIMatchCard } from "./LocalAIMatchCard";

export const Matches = () => {
  const localAIMatchExists = localStorage.getItem("bgio_state") !== null;
  return (
    <Card>
      <CardHeader title={"Matches"} />

      <CardContent>
        <Box display={"flex"} flexDirection={"column"} gap={2}>
          {localAIMatchExists && <LocalAIMatchCard />}
        </Box>
      </CardContent>
    </Card>
  );
};
