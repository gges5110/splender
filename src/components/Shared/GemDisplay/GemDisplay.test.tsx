import { render, screen } from "@testing-library/react";
import { GemDisplay } from "./GemDisplay";
import { Color } from "src/interfaces/Interfaces";

describe("GemDisplay", function () {
  test("renders", () => {
    render(<GemDisplay color={Color.Blue} count={3} />);
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("3")).toHaveClass("gem-size");
  });
});
