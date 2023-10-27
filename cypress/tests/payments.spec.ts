/// <reference types="cypress" />
const DEFAULT_URL = Cypress.env('BASE_URL');
const FUNDED_ACCOUNT_SECRET_KEY = Cypress.env('FUNDED_ACCOUNT_SECRET_KEY');
const NEW_ACCOUNT_SECRET_KEY = Cypress.env('NEW_ACCOUNT_SECRET_KEY');
const WRONG_PUBLIC_KEY_MESSAGE = 'Invalid public key';
const TIMEOUT_MS = 1500;

const connect = (key: string) => {
  cy.visit(DEFAULT_URL);
  cy.get('.action-button').eq(1).click();
  cy.get('.key-input').type(key);
  cy.get('.action-button').eq(2).click();
};

context('Payments', () => {
  describe('Funded Account', () => {
    before(() => {
      connect(FUNDED_ACCOUNT_SECRET_KEY);
      cy.wait(TIMEOUT_MS);
    });

    it('Should not send Payment with wrong data', () => {
      cy.get('.sender-private-key').type(FUNDED_ACCOUNT_SECRET_KEY);
      cy.contains('Send').click();
      cy.get('.notification').should('have.text', WRONG_PUBLIC_KEY_MESSAGE);
    });
  });

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
