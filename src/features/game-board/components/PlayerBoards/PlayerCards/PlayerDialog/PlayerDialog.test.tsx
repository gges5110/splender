import { PlayerDialog } from "./PlayerDialog";
import { Player } from "src/shared/types";
import { level1Cards, nobles } from "src/data";
import { vi } from "vitest";
import { renderWithWrapper } from "src/shared/utils/testWrapper";

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
