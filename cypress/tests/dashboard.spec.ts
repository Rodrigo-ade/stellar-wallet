/// <reference types="cypress" />

const DEFAULT_URL = Cypress.env('CYPRESS_BASE_URL');
const WEALTHY_ACCOUNT_SECRET_KEY = 'SDCS77W6T4R3DIYBT6QA67LCKKM4HQ5TLEM3CCUO6UV5XBNWI7LEWWSF';

const connect = (key: string) => {
  cy.visit(DEFAULT_URL);
    cy.get('.action-button').eq(1).click();
    cy.get('.key-input').type(key);
    cy.get('.action-button').eq(2).click();
}

context('Dashboard', () => {
  describe('Wealthy Account', () => {
    before(() => {
      connect(WEALTHY_ACCOUNT_SECRET_KEY);
      cy.wait(750);
    });
    
    it('Should have 10000.00 as balance', () => {
      cy.get('.balance-0').should('have.text', '10000.00 Lumens (XLM)');
    });

    it('Should not exist "Fund Account" button', () =>  {
      cy.contains('Fund Account').should('not.exist');
    });

    it('Should not exist "Inactive Account" panel', () => {
      cy.get('.inactive-account').should('not.exist');
    })

  });
});
