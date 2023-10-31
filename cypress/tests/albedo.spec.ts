/// <reference types="cypress" />

const BASE_URL = Cypress.env('BASE_URL');
const FUNDED_ACCOUNT_SECRET_KEY = Cypress.env('FUNDED_ACCOUNT_SECRET_KEY');
const RECEIVER_PUBLIC_KEY = Cypress.env('RECEIVER_PUBLIC_KEY');
const BALANCE_TO_SEND = '3';
const WRONG_RECEIVER_PUBLIC_KEY = 'AFAFFAFAFA';
const TIMEOUT_MS = 3000;

const connect = (key: string) => {
  cy.visit(BASE_URL);
  cy.get('.action-button').eq(1).click();
  cy.get('.key-input').type(key);
  cy.contains(/^Connect$/).click();
};

const stubAlbedoWindow = () => {
  cy.window().then((win) => {
    cy.stub(win, 'open').as('open');
  });
};

context('Albedo', () => {
  describe('Log In', () => {
    before(() => {
      cy.visit(BASE_URL);
    });

    beforeEach(() => {
      cy.contains('Connect with Albedo').as('albedoButton');
    });

    it('Should Albedo Button exist', () => {
      cy.get('@albedoButton').should('exist');
    });

    it('Should open Albedo window', () => {
      stubAlbedoWindow();
      cy.get('@albedoButton').click();
      cy.get('@open').should('have.been.calledOnce');
    });
  });

  describe('Send Payment', () => {
    before(() => {
      connect(FUNDED_ACCOUNT_SECRET_KEY);
      cy.wait(TIMEOUT_MS);
    });

    beforeEach(() => {
      cy.contains('Send with Albedo').as('albedoSendButton');
      cy.get('.receiver-public-key').as('receiverPublicKey');
    });

    it('Should exist "Send with Albedo" Button', () => {
      cy.get('@albedoSendButton').should('exist');
    });

    it('Should show Albedo error using wrong values', () => {
      cy.get('@receiverPublicKey').type(WRONG_RECEIVER_PUBLIC_KEY);
      cy.get('@albedoSendButton').click();
      cy.get('.notification').should('have.text', 'Intent request is invalid.');
    });

    it('Should open Albedo window and show Loading with valid values', () => {
      cy.get('@receiverPublicKey').clear().type(RECEIVER_PUBLIC_KEY);
      cy.get('.amount').type(BALANCE_TO_SEND);
      stubAlbedoWindow();
      cy.get('@albedoSendButton').click();
      cy.get('@open').should('have.been.calledOnce');
      cy.get('.notification').should('have.text', 'Loading...');
    });
  });
});
