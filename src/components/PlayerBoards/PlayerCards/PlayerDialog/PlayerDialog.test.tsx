import { render, screen } from "@testing-library/react";
import { PlayerDialog } from "./PlayerDialog";
import { Player } from "../../../../Interfaces";
import { level1Cards, nobles } from "../../../../constants";

describe("PlayerDialog", function () {
  test("renders", () => {
    const closePlayerDialog = jest.fn();
    const mockPlayer: Player = {
      cards: [level1Cards[0]],
      gems: [1, 2, 3, 0, 0],
      nobles: [nobles[0]],
      reservedCards: [level1Cards[1]],
    };

    render(
      <PlayerDialog
        playerDialogOpen={true}
        closePlayerDialog={closePlayerDialog}
        player={mockPlayer}
      />
    );
  });
});
