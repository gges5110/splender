import { render } from "@testing-library/react";
import { PlayerDialog } from "./PlayerDialog";
import { Player } from "../../../../../Interfaces";
import { level1Cards, nobles } from "../../../../../constants";
import { vi } from "vitest";

describe("PlayerDialog", function () {
  test("renders", () => {
    const closePlayerDialog = vi.fn();
    const mockPlayer: Player = {
      cards: [level1Cards[0]],
      gems: [1, 2, 3, 0, 0],
      nobles: [nobles[0]],
      reservedCards: [level1Cards[1]],
    };

    render(
      <PlayerDialog
        closePlayerDialog={closePlayerDialog}
        player={mockPlayer}
        playerDialogOpen={true}
      />
    );
  });
});
