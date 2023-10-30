/// <reference types="cypress" />
const DEFAULT_URL = Cypress.env('BASE_URL');
const TRANSACTIONS_PATH = Cypress.env('NEXT_PUBLIC_TESTNET_URL') + Cypress.env('TRANSACTIONS_PATH');
const FUNDED_ACCOUNT_SECRET_KEY = Cypress.env('FUNDED_ACCOUNT_SECRET_KEY');
const NEW_ACCOUNT_SECRET_KEY = Cypress.env('NEW_ACCOUNT_SECRET_KEY');
const RECEIVER_PUBLIC_KEY = Cypress.env('RECEIVER_PUBLIC_KEY');

const WRONG_PUBLIC_KEY_MESSAGE = 'Invalid public key';
const SUCCESSFULL_PAYMENT_MESSAGE = 'Success!';
const BALANCE_TO_SEND = '12';
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

    beforeEach(() => {
      cy.get('.sender-private-key').as('sender-private-key-input');
    });

    it('Should not send Payment with wrong data', () => {
      cy.get('@sender-private-key-input').type(FUNDED_ACCOUNT_SECRET_KEY);
      cy.contains('Send').click();
      cy.get('.notification').should('have.text', WRONG_PUBLIC_KEY_MESSAGE);
    });

    it('Should send Payment', () => {
      cy.get('@sender-private-key-input').clear().type(FUNDED_ACCOUNT_SECRET_KEY);
      cy.get('.receiver-public-key').type(RECEIVER_PUBLIC_KEY);
      cy.get('.amount').type(BALANCE_TO_SEND);
      cy.contains('Send').click();
      cy.intercept('POST', TRANSACTIONS_PATH).as('payment');
      cy.wait('@payment').its('response.statusCode').should('eq', 200);
      cy.get('.notification').should('have.text', SUCCESSFULL_PAYMENT_MESSAGE);
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

export {};
