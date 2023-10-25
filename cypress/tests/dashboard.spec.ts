/// <reference types="cypress" />

const DEFAULT_URL = Cypress.env('CYPRESS_BASE_URL');
const FUNDED_ACCOUNT_SECRET_KEY = 'SDCS77W6T4R3DIYBT6QA67LCKKM4HQ5TLEM3CCUO6UV5XBNWI7LEWWSF';
const TIMEOUT_MS = 1200;

const connect = (key: string) => {
  cy.visit(DEFAULT_URL);
  cy.get('.action-button').eq(1).click();
  cy.get('.key-input').type(key);
  cy.get('.action-button').eq(2).click();
};

context('Dashboard', () => {
  describe('Wealthy Account', () => {
    before(() => {
      connect(FUNDED_ACCOUNT_SECRET_KEY);
      cy.wait(TIMEOUT_MS);
    });

    it('Should have 10000.00 as balance', () => {
      cy.get('.balance-0').should('have.text', '10000.00 XLM');
    });

    it('Should not exist "Fund Account" button', () => {
      cy.contains('Fund Account').should('not.exist');
    });

    it('Should not exist "Inactive Account" panel', () => {
      cy.get('.inactive-account').should('not.exist');
    });
  });

  describe('New Account', () => {
    before(() => {
      cy.visit(DEFAULT_URL);
      cy.get('.action-button').eq(0).click();
      cy.get('.private-key')
        .invoke('text')
        .then((tempKey) => {
          connect(tempKey);
        });
      cy.wait(TIMEOUT_MS);
    });

    it('Should have 0.00 as balance', () => {
      cy.get('.balance-0').should('have.text', '0.00 XLM');
    });

    it('Should exist "Fund Account" button', () => {
      cy.contains('Fund Account').should('exist');
    });

    it('Should Fund Account with 10000 XLM and show notifications', () => {
      cy.contains('Fund Account').click();
      cy.contains('Funding your account... please wait.').should('exist');
      cy.wait(TIMEOUT_MS);
      cy.contains('Your account was funded succesfully!').should('exist');
      cy.get('.balance-0').should('have.text', '10000.00 XLM');
    });

    it('Should not exist "Fund Account" button after first funding', () => {
      cy.contains('Fund Account').should('not.exist');
    });
  });
});
