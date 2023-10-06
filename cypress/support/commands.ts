/// <reference path="./index.d.ts" />

import 'cypress-file-upload';

Cypress.Commands.add('getByDataTestAttribute', (dataTestAttribute, ...args) => {
  return cy.get(`[data-cy=${dataTestAttribute}]`, ...args);
});
