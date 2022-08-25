import { render, screen } from "@testing-library/react";
import { CardDisplay } from "./CardDisplay";
import { Card, Color } from "../../../Interfaces";

describe("CardDisplay", function () {
  it("renders empty card", () => {
    render(<CardDisplay card={undefined} enabled={false} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("button").innerHTML).toEqual("");
  });

  it("renders card", () => {
    const card: Card = {
      color: Color.White,
      cost: [1, 2, 1, 4, 0],
      points: 3,
    };

    render(<CardDisplay card={card} enabled={true} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });
});
