describe("create match", () => {
  beforeEach(() => {
    cy.request("DELETE", "http://localhost:8002/matches");
  });

  it("should be able to play with bot", () => {
    cy.visit("/");

    cy.setupUsername("Mike");

    cy.contains("Create Match").click();

    cy.url().should("include", "/createMatch");

    cy.get('button:contains("Create Bot Match")').click();

    cy.url().should("include", "/room");

    cy.get('button:contains("Start Match")').should("be.enabled");
    cy.get('button:contains("Start Match")').click();

    cy.get('button:contains("Room info")').should("exist");
  });
});
