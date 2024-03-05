import { PlayerDialog } from "./PlayerDialog";
import { Player } from "src/interfaces/Interfaces";
import { level1Cards, nobles } from "src/constants";
import { vi } from "vitest";
import { renderWithWrapper } from "src/TestWrapper";

describe("PlayerDialog", function () {
  test("renders", () => {
    const closePlayerDialog = vi.fn();
    const mockPlayer: Player = {
      cards: [level1Cards[0]],
      gems: [1, 2, 3, 0, 0, 0],
      nobles: [nobles[0]],
      reservedCards: [level1Cards[1]],
    };

    renderWithWrapper(
      <PlayerDialog
        closePlayerDialog={closePlayerDialog}
        player={mockPlayer}
        playerDialogOpen={true}
        playerName={""}
      />
    );
  });
});
