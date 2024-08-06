import { useAtom } from "jotai/index";
import { historyAtom } from "src/Atoms";
import { Box, Button, Card, CardContent, CardHeader } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import HistoryIcon from "@mui/icons-material/History";

export const GameResultCard = () => {
  const [history] = useAtom(historyAtom);
  return (
    <Card>
      <CardHeader title={"Match Result"} />
      <CardContent>
        <Box>You have played {history.length} games.</Box>
        <Box>
          You have won {history.filter((h) => h.winner !== "You").length} games.
        </Box>
        <Button
          component={RouterLink}
          startIcon={<HistoryIcon />}
          to={"/history"}
        >
          History
        </Button>
      </CardContent>
    </Card>
  );
};
