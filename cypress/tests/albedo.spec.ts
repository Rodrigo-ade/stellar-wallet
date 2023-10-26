/// <reference types="cypress" />

const DEFAULT_URL = Cypress.env('CYPRESS_BASE_URL');

context('Index', () => {
  beforeEach(() => {
    cy.visit(DEFAULT_URL);
    cy.contains(/^Connect with Albedo$/).as('albedoButton');
  });

  describe('Albedo', () => {
    it('Should exist "Connect with albedo" button', () => {
      cy.get('@albedoButton').should('exist');
    });

  });
});
