/// <reference types="cypress" />

const DEFAULT_URL = Cypress.env('BASE_URL');

const stubAlbedoWindow = () => {
  cy.window().then(win => {
        cy.stub(win, 'open').as('open');
      });
}

context('Albedo', () => {
  describe('Log In', () => {
    before(() => {
      cy.visit(DEFAULT_URL);
    });

    beforeEach(() => {
      cy.contains('Connect with Albedo').as('albedoButton');
    });

    it('Should exist Albedo Button', () => {
      cy.get('@albedoButton').should('exist');
    });

    it('Should open Albedo window', () => {
      stubAlbedoWindow();
      cy.get('@albedoButton').click();
      cy.get('@open').should('have.been.calledOnce');
    });
  });

});
