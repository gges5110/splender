import { SelectableGems } from "./SelectableGems";
import { screen } from "@testing-library/react";
import { GemsPickerMode } from "src/components/GameBoard/PlayingTable/GemsSection/GemsPicker/GemsPicker";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { renderWithWrapper } from "src/TestWrapper";

describe("SelectableGems", function () {
  test("renders nothing selected", () => {
    const selectedGems = [0, 0, 0, 0, 0];
    const gems = [4, 4, 4, 4, 4, 4];
    const onSelectMock = vi.fn();
    renderWithWrapper(
      <SelectableGems
        gems={gems}
        mode={GemsPickerMode.PICK}
        onSelect={onSelectMock}
        selectedGems={selectedGems}
      />
    );

    expect(screen.getAllByRole("button", { name: "4" })).toHaveLength(6);
  });

  test("renders single gem selected", () => {
    const selectedGems = [0, 0, 1, 0, 0];
    const gems = [4, 4, 4, 4, 4, 4];
    const onSelectMock = vi.fn();
    renderWithWrapper(
      <SelectableGems
        gems={gems}
        mode={GemsPickerMode.PICK}
        onSelect={onSelectMock}
        selectedGems={selectedGems}
      />
    );

    expect(screen.getAllByRole("button", { name: "4" })).toHaveLength(5);
    expect(screen.getByRole("button", { name: "3" })).toBeInTheDocument();
  });

  test("able to select gems", async () => {
    const selectedGems = [0, 0, 1, 0, 0];
    const gems = [4, 4, 4, 4, 4, 4];
    const onSelectMock = vi.fn();
    renderWithWrapper(
      <SelectableGems
        gems={gems}
        mode={GemsPickerMode.PICK}
        onSelect={onSelectMock}
        selectedGems={selectedGems}
      />
    );

    expect(screen.getAllByRole("button", { name: "4" })).toHaveLength(5);

    await userEvent.click(screen.getAllByRole("button", { name: "4" })[1]);
    expect(onSelectMock).toHaveBeenCalledTimes(1);
    expect(onSelectMock).toHaveBeenCalledWith(1);
  });

  test("unable to select disabled gems", async () => {
    const selectedGems = [0, 0, 1, 0, 0];
    const gems = [4, 4, 4, 4, 4, 5];
    const onSelectMock = vi.fn();
    renderWithWrapper(
      <SelectableGems
        gems={gems}
        mode={GemsPickerMode.PICK}
        onSelect={onSelectMock}
        selectedGems={selectedGems}
      />
    );

    expect(screen.getByRole("button", { name: "5" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "5" })).toBeDisabled();
  });
});
