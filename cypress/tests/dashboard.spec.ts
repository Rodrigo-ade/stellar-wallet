/// <reference types="cypress" />

const DEFAULT_URL = Cypress.env('CYPRESS_BASE_URL');
const WEALTHY_ACCOUNT_SECRET_KEY = 'SDCS77W6T4R3DIYBT6QA67LCKKM4HQ5TLEM3CCUO6UV5XBNWI7LEWWSF';

const connect = (key: string) => {
  cy.visit(DEFAULT_URL);
    cy.get('.action-button').eq(1).click();
    cy.get('.key-input').type(key);
    cy.get('.action-button').eq(2).click();
}
