/// <reference types="cypress" />

const DEFAULT_URL = Cypress.env('CYPRESS_BASE_URL');
const INVALID_PRIVATE_KEY = 'GGAJOGAJOPAGJOPGAJOPGAJPAGPJOA08421';
const VALID_PRIVATE_KEY = 'SAZ5WSF7U7KB43CAU4IU7TMYNLH67S3WN4I42GHLGHMOCJBC7CPLDHTV';
const INVALID_KEY_MESSAGE = 'Invalid secret key';

context("Index", () => {

  describe('Index page', () => {
    before(() => {
      cy.visit(DEFAULT_URL);
    });

    it('"Generate Key" button should exist', () => {
      cy.get('[data-cy="keys-button"]').should('exist');
    });

    it('"Connect with secret key" button should exist', () => {
      cy.get('[data-cy="connect-button"]').should('exist');
    })
  });;

  describe('Key Modal', () => {
    it('"Generate Key" button should open modal', () => {
      cy.get('[data-cy="keys-button"]').click();
      cy.get('[data-cy="key-modal"]').should('be.visible');
    });

    it('Should provide a pair of keys', () => {
      cy.get('[data-cy="private-key"]').invoke('text')
        .should('not.be.empty')
        .should('have.length.at.least', 50);

      cy.get('[data-cy="public-key"]').invoke('text')
        .should('not.be.empty')
        .should('have.length.at.least', 50);
    });

    it('Should copy keys when copy button is clicked', () => {
      cy.get('[data-cy="copy-button"]').click();

      cy.window().its('navigator.clipboard').invoke('readText')
        .should('have.length.above',100)
        .should('contain', 'Public Key: G')
        .should('contain', 'Private Key: S');
    });

    it('Should be closed when close is clicked', () => {
      cy.get('[data-cy="close-button"]').click();
      cy.get('[data-cy="key-modal"]').should('not.exist');
    });
  });

  describe('Connect Modal', () => {
    it('"Connect" button should open modal', () => {
      cy.get('[data-cy="connect-button"]').click();
      cy.get('[data-cy="connect-modal"]').should('be.visible');
    });

    it('Should show error with invalid secret key', () => {
      cy.get('[data-cy="key-input"').type(INVALID_PRIVATE_KEY);
      cy.get('[data-cy="connect-modal-button"]').click();
      cy.get('[data-cy="key-error"')
        .should('be.visible')
        .should('contain.text', INVALID_KEY_MESSAGE);
    });

    it('Should be closed when close button is clicked', () => {
      cy.get('[data-cy="close-button"]').click();
      cy.get('[data-cy="connect-modal"]').should('not.exist');
    });

    it('Should be redirected when valid key is entered and connect is clicked', () => {
      cy.get('[data-cy="connect-button"]').click();
      cy.get('[data-cy="key-input"').clear();
      cy.get('[data-cy="key-input"').type(VALID_PRIVATE_KEY);
      cy.get('[data-cy="connect-modal-button"]').click();
      cy.wait(500);
      cy.url().should('not.equal', DEFAULT_URL);
    });
  });
});
