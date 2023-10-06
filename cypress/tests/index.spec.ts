/// <reference types="cypress" />
describe("example to-do app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Should render the body", () => {
    cy.get("#__next").should("be.visible")
  });
});
