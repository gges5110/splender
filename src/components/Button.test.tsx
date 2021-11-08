import React from "react";
import { Button } from "./Button";
import { render, screen } from "@testing-library/react";

describe("Button", () => {
  test("should be able to render children", () => {
    render(<Button>Button Children</Button>);
    expect(screen.getByText("Button Children")).toBeInTheDocument();
  });
});
