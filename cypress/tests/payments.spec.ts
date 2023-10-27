/// <reference types="cypress" />
const DEFAULT_URL = Cypress.env('BASE_URL');
const NEW_ACCOUNT_SECRET_KEY = Cypress.env('NEW_ACCOUNT_SECRET_KEY');
const TIMEOUT_MS = 1500;

const connect = (key: string) => {
  cy.visit(DEFAULT_URL);
  cy.get('.action-button').eq(1).click();
  cy.get('.key-input').type(key);
  cy.get('.action-button').eq(2).click();
};

context('Payments', () => {
  describe('New Account', () => {
    before(() => {
      connect(NEW_ACCOUNT_SECRET_KEY);
      cy.wait(TIMEOUT_MS);
    });

    it('Should not show Payments to new accounts', () => {
      cy.get('.payments').should('not.exist');
      cy.get('.hidden-payments-message').should('exist');
    });
  });
});
