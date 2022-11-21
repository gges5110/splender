import { CardsOnTable } from "./CardsOnTable";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { Color } from "../../../../Interfaces";
import userEvent from "@testing-library/user-event";

describe("CardsOnTable", () => {
  const card = { cost: [], color: Color.Blue, points: 0 };
  const player = { cards: [], reservedCards: [], gems: [], nobles: [] };

  const getCardButtons = (): HTMLElement[] => {
    const allButtons = screen.getAllByRole("button");
    return allButtons.filter((element) =>
      element.className.includes("card-size")
    );
  };

  const getDeckButtons = (): HTMLElement[] => {
    const allButtons = screen.getAllByRole("button");
    return allButtons.filter((element) => element.className === "deck-button");
  };

  test("renders deck and card buttons", () => {
    render(
      <CardsOnTable
        cards={[[card], [card], [card]]}
        cardsInDeck={[[card], [card], [card]]}
        deckOnClick={vi.fn()}
        cardOnClick={vi.fn()}
        player={player}
      />
    );

    const deckButtons = getDeckButtons();
    const cardButtons = getCardButtons();
    expect(deckButtons).toHaveLength(3);
    expect(cardButtons).toHaveLength(3);
  });

  test("should have button disabled when no more card for the level", () => {
    render(
      <CardsOnTable
        cards={[[card], [card], [card]]}
        cardsInDeck={[[], [], []]}
        deckOnClick={vi.fn()}
        cardOnClick={vi.fn()}
        player={player}
      />
    );

    const deckButtons = getDeckButtons();
    for (const deckButton of deckButtons) {
      expect(deckButton.textContent).toEqual("0");
      expect(deckButton).toBeDisabled();
    }
  });

  test("is able to click deck button", async () => {
    const deckOnClickMock = vi.fn();
    render(
      <CardsOnTable
        cards={[[card], [card], [card]]}
        cardsInDeck={[[card], [card], [card]]}
        deckOnClick={deckOnClickMock}
        cardOnClick={vi.fn()}
        player={player}
      />
    );

    const deckButtons = getDeckButtons();
    for (const deckButton of deckButtons) {
      const index = deckButtons.indexOf(deckButton);
      expect(deckButton.textContent).toEqual("1");
      expect(deckButton).not.toBeDisabled();
      await userEvent.click(deckButton);

      expect(deckOnClickMock).toHaveBeenCalledTimes(index + 1);
    }
  });

  test("is able to click card button", async () => {
    const cardOnClickMock = vi.fn();
    render(
      <CardsOnTable
        cards={[[card], [card], [card]]}
        cardsInDeck={[[card], [card], [card]]}
        deckOnClick={vi.fn()}
        cardOnClick={cardOnClickMock}
        player={player}
      />
    );

    const cardButtons = getCardButtons();
    for (const cardButton of cardButtons) {
      const index = cardButtons.indexOf(cardButton);
      expect(cardButton).not.toBeDisabled();
      await userEvent.click(cardButton);

      expect(cardOnClickMock).toHaveBeenCalledTimes(index + 1);
      expect(cardOnClickMock).toHaveBeenCalledWith({
        level: 2 - index,
        index: 0,
        card,
      });
    }
  });
});
