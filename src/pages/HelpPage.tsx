/* eslint-disable react/jsx-key */
import { SyntheticEvent, useState } from "react";
import { GemDisplay } from "src/components/Shared/GemDisplay/GemDisplay";
import { Color } from "src/interfaces/Interfaces";
import { CardDisplay } from "src/components/Shared/CardDisplay/CardDisplay";
import { level2Cards, nobles } from "src/constants";
import { NobleDisplay } from "src/components/Shared/NobleDisplay/NobleDisplay";
import { Paper, Tab, Box } from "@mui/material";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import { blue } from "@mui/material/colors";

enum MyTabs {
  "Legend" = "Legend",
  "Gems" = "Gems",
  "Cards" = "Cards",
  "Nobles" = "Nobles",
  "End of Game" = "End of Game",
}
const tabsMap = new Map([
  [
    "Legend",
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box
        sx={{
          backgroundColor: "#e2e8f0",
          padding: 2,
          borderRadius: 2,
          margin: "0 auto",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
        }}
      >
        <Box>
          <Box>Gem</Box>
          <Box sx={{ color: "text.secondary", fontSize: "0.875rem" }}>
            3 green gems
          </Box>
        </Box>
        <Box sx={{ justifySelf: "center" }}>
          <GemDisplay color={Color.Green} count={3} />
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "#e2e8f0",
          padding: 2,
          borderRadius: 2,
          margin: "0 auto",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
        }}
      >
        <Box>
          <Box>Card</Box>
          <Box sx={{ color: "text.secondary", fontSize: "0.875rem" }}>
            It costs 3 green gems, 2 red gems and 2 black gems.
            <br />
            This card is worth 1 point.
          </Box>
        </Box>
        <Box sx={{ justifySelf: "center" }}>
          <CardDisplay card={level2Cards[0]} enabled={false} />
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "#e2e8f0",
          padding: 2,
          borderRadius: 2,
          margin: "0 auto",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
        }}
      >
        <Box>
          <Box>Noble</Box>
          <Box sx={{ color: "text.secondary", fontSize: "0.875rem" }}>
            This noble requires 3 green cards, 3 white cards and 3 blue cards.
            <br />
            This noble is worth 3 points.
          </Box>
        </Box>
        <Box sx={{ justifySelf: "center" }}>
          <NobleDisplay noble={nobles[0]} />
        </Box>
      </Box>
    </Box>,
  ],
  [
    "Gems",
    <div>
      A player can never have more than 10 tokens at the end of their turn
      (including jokers). If this happens, they must return tokens until they
      only have 10 left. A player can return all or some of those they’ve just
      drawn.
      <br /> Reminder: players may not take 2 tokens of the same color if there
      are less than 4 tokens available of that color.
    </div>,
  ],
  [
    "Cards",
    <div>
      To purchase a card, a player must spend the number of tokens indicated on
      the card. A joker token can replace any color. The spent tokens (including
      any jokers) are returned to the middle of the table. A player may purchase
      one of the face-up development cards in the middle of the table or a card
      in his hand that was reserved on a previous turn.
      <br />
      To reserve a card, a player simply needs to take a face-up development
      from the middle of the table or draw the first card from one of the three
      decks. Players may not have more than three reserved cards in hand, and
      the only way to get rid of a card is to buy it (see below). Reserving a
      card is also the only way to get a gold token (joker). If there is no gold
      left, you can still reserve a card, but you won’t get any gold.
    </div>,
  ],
  [
    "Nobles",
    <div>
      At the end of their turn, each player checks the noble tiles in order to
      determine if they’re receiving a visit from one of them. A player can be
      visited if they have (at least) the quantity and type of bonuses indicated
      on the noble tile. If a player has enough bonuses to be visited by more
      than one noble at the end of their turn, that player chooses the noble to
      be received.
    </div>,
  ],
  [
    "End of Game",
    <div>
      When a player reaches 15 prestige points, complete the current round so
      that each player has played the same number of turns. The player who then
      has the highest number of prestige points is declared the winner (don’t
      forget to count your nobles). In case of a tie, the player who has
      purchased the fewest development cards wins.
    </div>,
  ],
]);
export const HelpPage = () => {
  const [myTab, setMyTab] = useState<string>(MyTabs.Legend);
  const handleChange = (event: SyntheticEvent, newValue: MyTabs) => {
    setMyTab(newValue);
  };
  return (
    <Box
      sx={{
        width: "100%",
        px: { xs: 2, sm: 3 },
        pt: { xs: 2.5, sm: 3 },
        pb: { xs: 2, sm: 2 },
      }}
    >
      <Box sx={{ mb: 2 }}>
        Welcome! This is an online single player version of Splendor, which you
        will be playing as player 1, against 2 other bots.
        <br />A player must choose to perform only one of the following four
        actions.
        <Box component={"ul"} sx={{ listStyleType: "disc", pl: 2, mt: 1 }}>
          <Box component={"li"} sx={{ mb: 1 }}>
            Take 3 gem tokens of different colors. Example:
            <Box
              sx={{ display: "flex", flexDirection: "row", gap: 1, mt: 0.5 }}
            >
              <GemDisplay color={Color.Blue} count={1} />
              <GemDisplay color={Color.Green} count={1} />
              <GemDisplay color={Color.Red} count={1} />
            </Box>
          </Box>
          <Box component={"li"} sx={{ mb: 1 }}>
            Take 2 gem tokens of the same color. This action is only possible if
            there are at least 4 tokens of the chosen color left when the player
            takes them.
          </Box>
          <Box component={"li"} sx={{ mb: 1 }}>
            Reserve 1 development card and take 1 gold token (joker).
          </Box>
          <Box component={"li"} sx={{ mb: 1 }}>
            Purchase 1 face-up development card from the middle of the table or
            a previously reserved one.
          </Box>
        </Box>
      </Box>

      <TabContext value={myTab}>
        <TabList
          onChange={handleChange}
          sx={{ borderRadius: 2, mb: 1, backgroundColor: blue["100"] }}
        >
          {Array.from(tabsMap.keys()).map((title) => (
            <Tab
              key={title}
              label={title}
              sx={{
                textTransform: "none",
                backgroundColor: title === myTab ? "white" : "unset",
                borderRadius: 2,
              }}
              value={title}
            />
          ))}
        </TabList>

        <Paper>
          {Array.from(tabsMap.entries()).map(([title, node], idx) => (
            <TabPanel key={idx} value={title}>
              {node}
            </TabPanel>
          ))}
        </Paper>
      </TabContext>
    </Box>
  );
};
