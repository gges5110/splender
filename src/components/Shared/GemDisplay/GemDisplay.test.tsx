import React from "react";
import { render, screen } from "@testing-library/react";
import { GemDisplay } from "./GemDisplay";
import { Color } from "../../../Interfaces";

describe("GemDisplay", function () {
  test("renders", () => {
    render(<GemDisplay color={Color.Blue} count={3} />);
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("3")).toHaveClass("bg-sky-500");
  });
});
