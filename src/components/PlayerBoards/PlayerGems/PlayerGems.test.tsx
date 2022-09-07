import { render, screen } from "@testing-library/react";
import { PlayerGems } from "./PlayerGems";

describe("PlayerGems", function () {
  test("renders", () => {
    const gems = [1, 2, 3, 0, 0, 5];
    render(<PlayerGems gems={gems} />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("1")).toHaveClass("bg-gray-50");
  });
});
