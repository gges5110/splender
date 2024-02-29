import { render, screen } from "@testing-library/react";
import { SelectedGems } from "./SelectedGems";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

describe("SelectedGems", function () {
  test("renders", async () => {
    const gems = [1, 2, 3, 4, 5, 0];
    const selectedGemOnClickMock = vi.fn();
    render(
      <SelectedGems
        selectedGemOnClick={selectedGemOnClickMock}
        selectedGems={gems}
      />
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "1" }));

    expect(selectedGemOnClickMock).toHaveBeenCalledTimes(1);
    expect(selectedGemOnClickMock).toHaveBeenCalledWith(0);
  });
});
