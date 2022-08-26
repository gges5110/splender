import { Modal } from "../Modal";
import { Button } from "../Button";
import { FC, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { XMarkIcon } from "@heroicons/react/24/solid";
import * as React from "react";
import { Tab } from "@headlessui/react";
import clsx from "clsx";

interface WelcomeDialogProps {
  open: boolean;
  onClose(): void;
}

export const WelcomeDialog: FC<WelcomeDialogProps> = ({ open, onClose }) => {
  const [showWelcomeDialog, setShowWelcomeDialog] = useLocalStorage(
    "showWelcomeDialog",
    true
  );

  let [categories] = useState({
    Actions: (
      <div>
        A player must choose to perform only one of the following four actions.
        <ul className={"list-disc list-inside"}>
          <li>Take 3 gem tokens of different colors.</li>
          <li>
            Take 2 gem tokens of the same color. This action is only possible if
            there are at least 4 tokens of the chosen color left when the player
            takes them.
          </li>
          <li>Reserve 1 development card and take 1 gold token (joker).</li>
          <li>
            Purchase 1 face-up development card from the middle of the table or
            a previously reserved one.
          </li>
        </ul>
      </div>
    ),
    Gems: (
      <div>
        A player can never have more than 10 tokens at the end of their turn
        (including jokers). If this happens, they must return tokens until they
        only have 10 left. A player can return all or some of those they’ve just
        drawn.
        <br /> Reminder: players may not take 2 tokens of the same color if
        there are less than 4 tokens available of that color.
      </div>
    ),
    Cards: (
      <div>
        To purchase a card, a player must spend the number of tokens indicated
        on the card. A joker token can replace any color. The spent tokens
        (including any jokers) are returned to the middle of the table. A player
        may purchase one of the face-up development cards in the middle of the
        table or a card in his hand that was reserved on a previous turn.
        <br />
        To reserve a card, a player simply needs to take a face-up development
        from the middle of the table or draw the first card from one of the
        three decks. Players may not have more than three reserved cards in
        hand, and the only way to get rid of a card is to buy it (see below).
        Reserving a card is also the only way to get a gold token (joker). If
        there is no gold left, you can still reserve a card, but you won’t get
        any gold.
      </div>
    ),
    Nobles: (
      <div>
        At the end of their turn, each player checks the noble tiles in order to
        determine if they’re receiving a visit from one of them. A player can be
        visited if they have (at least) the quantity and type of bonuses
        indicated on the noble tile. If a player has enough bonuses to be
        visited by more than one noble at the end of their turn, that player
        chooses the noble to be received.
      </div>
    ),
    "End of Game": (
      <div>
        When a player reaches 15 prestige points, complete the current round so
        that each player has played the same number of turns. The player who
        then has the highest number of prestige points is declared the winner
        (don’t forget to count your nobles). In case of a tie, the player who
        has purchased the fewest development cards wins.
      </div>
    ),
  });

  return (
    <Modal open={open} onClose={onClose}>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 min-w-full">
        <div className={"mb-2"}>
          Welcome! This is an online single player version of Splendor, which
          you will be playing as player 1, against 2 other bots.
        </div>
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 ">
            {Object.keys(categories).map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  clsx(
                    "w-full rounded-lg py-2.5 leading-5 text-blue-700",
                    "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400",
                    selected
                      ? "bg-white shadow"
                      : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            {Object.values(categories).map((posts, idx) => (
              <Tab.Panel
                key={idx}
                className={clsx(
                  "rounded-xl bg-white p-3",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400"
                )}
              >
                {posts}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6">
        <div className={"flex my-2 gap-2"}>
          {showWelcomeDialog && (
            <Button
              onClick={() => {
                setShowWelcomeDialog(false);
                onClose();
              }}
            >
              <span>Don't show again</span>
            </Button>
          )}

          <Button svgPath={<XMarkIcon />} onClick={onClose}>
            <span>Close</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};
