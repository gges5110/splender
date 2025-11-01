import { render, screen } from "@testing-library/react";
import { NobleDisplay } from "./NobleDisplay";
import { Noble } from "src/shared/types";

describe("NobleDisplay", function () {
  test("renders card counts and points", () => {
    const noble: Noble = {
      cardCountByColors: [1, 2, 0, 4, 5],
      acquired: false,
    };

    render(<NobleDisplay noble={noble} />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });
});
