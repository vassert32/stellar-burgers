/// <reference types="cypress" />

Cypress.Commands.add('addNewIngredient', (type) => {
  cy.get(`[data-cy="${type}"]`)
    .within(() => {
      cy.get('button').eq(0).click();
    });
});

export {};