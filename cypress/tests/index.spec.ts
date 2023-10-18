/// <reference types="cypress" />

const DEFAULT_URL = Cypress.env('CYPRESS_BASE_URL');
const INVALID_PRIVATE_KEY = 'GGAJOGAJOPAGJOPGAJOPGAJPAGPJOA08421';
const VALID_PRIVATE_KEY = 'SAZ5WSF7U7KB43CAU4IU7TMYNLH67S3WN4I42GHLGHMOCJBC7CPLDHTV';
const INVALID_KEY_MESSAGE = 'Invalid secret key';

context('Index', () => {
  beforeEach(() => {
    cy.visit(DEFAULT_URL);
    cy.get('.action-button').eq(0).as('getKeysButton');
    cy.get('.action-button').eq(1).as('connectButton');
  });

  describe('Index page', () => {
    it('Should exist "Generate Key" button', () => {
      cy.get('@getKeysButton').should('exist');
    });

    it('Should exist "Connect with secret key" button', () => {
      cy.get('@connectButton').should('exist');
    });
  });

  describe('Key Modal', () => {
    it('Should open modal when "Generate Key" button is clicked', () => {
      cy.get('@getKeysButton').click();
      cy.get('[data-cy="key-modal"]').should('be.visible');
    });

    it('Should provide a pair of keys', () => {
      cy.get('@getKeysButton').click();
      cy.get('[data-cy="private-key"]').invoke('text').should('not.be.empty').should('have.length.at.least', 50);

      cy.get('[data-cy="public-key"]').invoke('text').should('not.be.empty').should('have.length.at.least', 50);
    });

    it('Should copy keys when copy button is clicked', () => {
      cy.get('@getKeysButton').click();
      cy.get('.copy-button').click();

      cy.window()
        .its('navigator.clipboard')
        .invoke('readText')
        .should('have.length.above', 100)
        .should('contain', 'Public Key: G')
        .should('contain', 'Private Key: S');
    });

    it('Should be closed when close is clicked', () => {
      cy.get('@getKeysButton').click();
      cy.get('.close-button').click();
      cy.get('[data-cy="key-modal"]').should('not.exist');
    });
  });

  describe('Connect Modal', () => {
    beforeEach(() => {
      cy.get('@connectButton').click();
      cy.get('[data-cy="connect-modal"]').as('connectModal');
      cy.get('[data-cy="key-input"]').as('keyInput');
      cy.get('.connect-modal-button').as('connectModalButton');
    });

    it('Should open modal when "Connect" button is clicked', () => {
      cy.get('@connectModal').should('be.visible');
    });

    it('Should show error with invalid secret key', () => {
      cy.get('@keyInput').type(INVALID_PRIVATE_KEY);
      cy.get('@connectModalButton').click();
      cy.get('[data-cy="key-error"]').should('be.visible').should('contain.text', INVALID_KEY_MESSAGE);
    });

    it('Should be closed when close button is clicked', () => {
      cy.get('.close-button').click();
      cy.get('@connectModal').should('not.exist');
    });

    it('Should be redirected when valid key is entered and connect is clicked', () => {
      cy.get('@keyInput').clear();
      cy.get('@keyInput').type(VALID_PRIVATE_KEY);
      cy.get('@connectModalButton').click();
      cy.wait(500);
      cy.url().should('not.equal', DEFAULT_URL);
    });
  });
});
