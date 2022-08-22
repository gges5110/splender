import React from "react";
import { render, screen } from "@testing-library/react";
import { NobleDisplay } from "./NobleDisplay";

describe("NobleDisplay", function () {
  test("renders card counts and points", () => {
    const noble = {
      cardCountByColors: [1, 2, 3, 4, 5],
      points: 6,
      acquired: false,
    };

    render(<NobleDisplay noble={noble} />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("6")).toBeInTheDocument();
  });
});
