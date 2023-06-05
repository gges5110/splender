import { LobbyAPI } from "boardgame.io";

describe("lobby", () => {
  beforeEach(() => {
    cy.request("DELETE", "http://localhost:8002/matches");
  });
  it.skip("should show username dialog for first time users", () => {
    cy.visit("/");

    cy.setupUsername("Mike");

    cy.contains("Create Match").click();

    cy.url().should("include", "/createMatch");

    cy.contains("Create Match").click();

    cy.url().should("include", "/room");

    cy.visit("/");

    cy.wait(100);
    cy.get("input[name='username']").should("not.exist");
    cy.contains("Welcome to the lobby Mike!");
  });

  it.skip("should leave match on URL change", () => {
    cy.visit("/");

    cy.setupUsername("Mike");

    cy.contains("Create Match").click();

    cy.url().should("include", "/createMatch");

    cy.contains("Create Match").click();

    cy.url().should("include", "/room");

    cy.visit("/");
    cy.wait(100);
    cy.contains("Match ID").should("not.exist");
  });

  it("should show existing matches, and able to join", () => {
    let matchID: string | undefined;
    cy.request<LobbyAPI.CreatedMatch>(
      "POST",
      "http://localhost:8002/games/splendor/create",
      {
        numPlayers: 2,
      }
    ).then((response) => {
      matchID = response.body.matchID;

      cy.visit("/");

      cy.setupUsername("Mike");
      cy.get('button:contains("Join")').should("exist");
      cy.get('button:contains("Join")').click();

      cy.url().should("include", `/room/${matchID}`);

      cy.request<LobbyAPI.JoinedMatch>(
        "POST",
        `http://localhost:8002/games/splendor/${matchID}/join`,
        {
          playerID: "1",
          playerName: "Alice",
        }
      ).then((response) => {
        expect(response.body.playerID).to.equal("1");
        cy.contains("Start Match");
        cy.get('button:contains("Start Match")').should("be.enabled");
        cy.get('button:contains("Start Match")').click();

        cy.get('button:contains("Room info")').should("exist");
      });
    });
  });
});
