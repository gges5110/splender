import { render, screen } from "@testing-library/react";
import { SelectedGems } from "./SelectedGems";

describe("SelectedGems", function () {
  test("renders", () => {
    const gems = [1, 2, 3, 4, 5, 0];
    render(<SelectedGems selectedGemOnClick={jest.fn()} selectedGems={gems} />);

    expect(screen.getByText("1")).toBeInTheDocument();
  });
});
